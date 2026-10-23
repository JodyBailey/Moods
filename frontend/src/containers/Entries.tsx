import { useState, type SetStateAction } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { getBackendUrl } from "../helpers/general";
import axiosClient from "../helpers/axiosClient";
import type { EntryType } from "../helpers/general";

import AuthWrapper from "../components/shared/AuthWrapper";
import EntryForm from "../components/entries/EnrtyForm";
import Entry from "../components/entries/Entry";
import EntriesPlaceholder from "../components/entries/EntriesPlaceholder";
import CreateEntryButton from "../components/entries/CreateEntryButton";
import NoEntries from "../components/entries/NoEntries";
import Error from "../components/shared/Error";

const Entries = () => {
  const { isError, data, isSuccess } = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      return axiosClient.get<EntryType[]>(getBackendUrl("entries"));
    },
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const entries = data?.data ?? [];
  const isEntriesAvailable = isSuccess;

  const setEntries = (action: SetStateAction<EntryType[]>) => {
    queryClient.setQueryData<AxiosResponse<EntryType[]>>(["entries"], (previous) => {
      if (!previous) return previous;

      const nextEntries = typeof action === "function" ? action(previous.data) : action;

      return { ...previous, data: nextEntries };
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AuthWrapper>
      {!isEntriesAvailable && <EntriesPlaceholder />}
      {isEntriesAvailable &&
        entries.length > 0 &&
        entries.map((entry, i) => <Entry entry={entry} setEntries={setEntries} key={i} />)}
      {isEntriesAvailable && entries.length === 0 && <NoEntries onClick={openModal} />}
      {isError && <Error />}
      <CreateEntryButton onClick={openModal} />
      <EntryForm entries={entries} setEntries={setEntries} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </AuthWrapper>
  );
};

export default Entries;
