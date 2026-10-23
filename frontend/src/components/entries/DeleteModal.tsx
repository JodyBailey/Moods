import { Modal, Typography, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";

import axiosClient from "../../helpers/axiosClient";
import { getBackendUrl, type EntryType } from "../../helpers/general";
import { toast } from "react-toastify";

type DeleteModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  entry: EntryType;
  setEntries: Dispatch<SetStateAction<EntryType[]>>;
};

const DeleteModal = ({ isModalOpen, setIsModalOpen, entry, setEntries }: DeleteModalProps) => {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return axiosClient.delete(getBackendUrl("delete", entry.id));
    },
  });

  const queryClient = useQueryClient();

  const formattedDate = dayjs(entry.date).format("D MMMM YYYY");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnClickDelete = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        setEntries((prev) => {
          const entryIndex = prev.findIndex((item) => item.id === entry.id);
          const entriesCopy = [...prev];
          entriesCopy.splice(entryIndex, 1);

          return entriesCopy;
        });
        queryClient.removeQueries({ queryKey: ["statistics"] });

        toast("Enrtry Deleted!", {
          type: "success",
        });
      },
      onError: (err) => {
        console.log("Could not delete item: ", err);

        toast("Could not delete entry", { type: "error" });
      },
      onSettled: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleOnClickCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="delete-entry-modal">
        <Typography variant="body1" className="delete-entry-text">
          Are you sure you want to delete this entry created on {formattedDate}?
        </Typography>
        <div className={"d-flex"}>
          <Button className="cancel-delete-btn p-1 me-2" variant="outlined" onClick={handleOnClickCancel}>
            Cancel
          </Button>
          <Button className="delete-entry-btn p-1" variant="outlined" color="error" onClick={handleOnClickDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
