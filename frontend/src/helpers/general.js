import { jwtDecode } from 'jwt-decode';
import { cloneDeep } from 'lodash';

import { ACCESS_TOKEN } from '../constants/tokens';

// Helper for getting the URL routes
const getBackendUrl = (route, id = null) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  switch (route) {
    case 'login':
      return `${backendUrl}api/token/`;
    case 'logout':
      return `${backendUrl}api/token/blacklist/`;
    case 'register':
      return `${backendUrl}api/register/`;
    case 'refresh':
      return `${backendUrl}api/token/refresh/`;
    case 'entries':
      return `${backendUrl}api/entries/`;
    case 'create':
      return `${backendUrl}api/entries/create/`;
    case 'update':
      return `${backendUrl}api/entries/update/${id}/`;
    case 'delete':
      return `${backendUrl}api/entries/delete/${id}/`;
    case 'statistics':
      return `${backendUrl}api/statistics/`;
    default:
      return backendUrl;
  }
};

// Converts array of string to an array of objects with a name key for each string
const toObjectArray = (array) => {
  return array.map((element) => ({ name: element }));
};

// Converts create entry data into a structured object which will be used when sending the post request
const createEntryDataStructured = (emotions, activities, contributors, sentiment, text, date, id = null) => {
  const structuredObject = {
    sentiment,
    user: jwtDecode(localStorage.getItem(ACCESS_TOKEN))?.user_id,
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
const camelToSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

// Returns an objects with its keys converted to snake case
const snakifyObject = (obj) => {
  const snakifiedObject = {};
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
const sortDataByDatesDescending = (data) => {
  const copy = cloneDeep(data);

  copy.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return copy;
};

export { getBackendUrl, snakifyObject, createEntryDataStructured, sortDataByDatesDescending };
