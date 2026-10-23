import { jwtDecode } from "jwt-decode";
import { cloneDeep } from "lodash";

import { ACCESS_TOKEN } from "../constants/tokens";
import type { EmotionType, ActivityType, ContributorType } from "../constants/entryOptions";
import type { SentimentScore } from "../constants/sentimentMap";

export type EntryType = {
  id: number;
  activities: Array<{ id: number; name: ActivityType }>;
  contributors: Array<{ id: number; name: ContributorType }>;
  emotions: Array<{ id: number; name: EmotionType }>;
  sentiment: SentimentScore;
  text: string;
  date: string;
  user: number;
  edited: boolean;
};

export type NewEntry = {
  activities: Array<{ name: ActivityType }>;
  contributors: Array<{ name: ContributorType }>;
  emotions: Array<{ name: EmotionType }>;
  sentiment: SentimentScore;
  text: string;
  date: string;
  user: number;
};

export type UpdateEntry = Partial<NewEntry> & {
  id: string | number;
};

export type StatisticsSuccessType = {
  averageMoodScore: number;
  activitiesCount: Partial<Record<ActivityType, number>>;
  contributorsCount: Partial<Record<ContributorType, number>>;
  emotionsCount: Partial<Record<EmotionType, number>>;
  mainContributors: {
    top: Array<[ContributorType, number]>;
    bottom: Array<[ContributorType, number]>;
  };
  averageMoodTimeline: Array<{ date: string; average: number }>;
};

export type StatisticsErrorType = {
  error: string;
};

export type StatisticsType = StatisticsSuccessType | StatisticsErrorType;

// Helper for getting the URL routes
const getBackendUrl = (route: string, id: string | number | null = null): string => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  switch (route) {
    case "login":
      return `${backendUrl}api/token/`;
    case "logout":
      return `${backendUrl}api/token/blacklist/`;
    case "register":
      return `${backendUrl}api/register/`;
    case "refresh":
      return `${backendUrl}api/token/refresh/`;
    case "entries":
      return `${backendUrl}api/entries/`;
    case "create":
      return `${backendUrl}api/entries/create/`;
    case "update":
      return `${backendUrl}api/entries/update/${id}/`;
    case "delete":
      return `${backendUrl}api/entries/delete/${id}/`;
    case "statistics":
      return `${backendUrl}api/statistics/`;
    default:
      return backendUrl;
  }
};

// Converts array of string to an array of objects with a name key for each string
const toObjectArray = <T extends string>(array: T[]): Array<{ name: T }> => {
  return array.map((element) => ({ name: element }));
};

// Converts create entry data into a structured object which will be used when sending the post request
const createEntryDataStructured = (
  emotions: EmotionType[],
  activities: ActivityType[],
  contributors: ContributorType[],
  sentiment: SentimentScore,
  text: string,
  date: string,
  id: string | number | null = null,
) => {
  const structuredObject: {
    sentiment: SentimentScore;
    text: string;
    user: number;
    emotions: Array<{ name: EmotionType }>;
    activities: Array<{ name: ActivityType }>;
    contributors: Array<{ name: ContributorType }>;
    date: string;
    id?: string | number;
  } = {
    sentiment,
    user: jwtDecode<{ user_id: number }>(localStorage.getItem(ACCESS_TOKEN)!).user_id,
    emotions: toObjectArray(emotions),
    activities: toObjectArray(activities),
    contributors: toObjectArray(contributors),
    text,
    date,
  };

  if (id) structuredObject.id = id;

  return structuredObject;
};

// Converts camel cased string to snake case
const camelToSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

// Returns an objects with its keys converted to snake case
const snakifyObject = (obj: { [key: string]: unknown }): { [key: string]: unknown } => {
  const snakifiedObject: { [key: string]: unknown } = {};
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const snakifiedKeys = keys.map((key) => camelToSnakeCase(key));

  // Keys and values should have the same length, so loop over either one
  // to assign the snakified keys to its corresponding values
  snakifiedKeys.forEach((key, index) => {
    snakifiedObject[key] = values[index];
  });

  return snakifiedObject;
};

// Sorts dates into descending order
const sortDataByDatesDescending = <T extends { date: string }>(data: T[]) => {
  const copy = cloneDeep(data);

  copy.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return copy;
};

export { getBackendUrl, snakifyObject, createEntryDataStructured, sortDataByDatesDescending };
