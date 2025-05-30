/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
import { userHistoryApiUrl, userHistorySchema } from './keys';

const historyApiUrl = `${userHistoryApiUrl}/v1`;

const fetchData = async (url, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Fetch Status: ${res.status} ${res.statusText}`);
  }
  // TODO: NOTE: there might be more res structure like res.text()
  const data = await res.json();
  return data;
};

export const createHistory = async (accessToken, historyData, name) => {
  const schemaId = parseInt(userHistorySchema, 10);
  const url = `${historyApiUrl}/history`;
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      label: name,
      json: { ...historyData },
      schemaId,
    }),
  };
  const data = await fetchData(url, config);
  return data;
};

export const updateHistory = async (accessToken, historyData, name, id) => {
  const schemaId = parseInt(userHistorySchema, 10);
  const url = `${historyApiUrl}/history/${id}`;
  const config = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      label: name,
      json: { ...historyData },
      schemaId,
    }),
  };
  const data = await fetchData(url, config);
  return data;
};

export const getHistories = async (accessToken) => {
  const url = `${historyApiUrl}/histories?schema=${userHistorySchema}`;
  const config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = await fetchData(url, config);
  return data;
};

export const deleteHistory = async (accessToken, historyId) => {
  const url = `${historyApiUrl}/history/${historyId}`;
  const config = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = await fetchData(url, config);
  return data;
};

/**
 * This function loads history from user history api.
 * If no param, return a list of name of current history records.
 * If `name` is specified, return relevant history object.
 * @param {string} token - The auth token, default to `null`.
 * @param {string} name - The name of history record, default to `null`.
 */
// eslint-disable-next-line consistent-return
export const loadHistory = async (token = null, name = null) => {
  try {
    if (!token) throw new Error('Access token not available!');
    const res = await getHistories(token);
    if (res.data.length > 0) {
      const histories = res.data;
      if (name !== null) {
        // name is not null, find match history record and return it
        const history = histories.find((h) => h.label === name);
        if (history !== undefined) {
          // return object since sometime ID property is needed
          return history;
        }
        throw new Error('History name not available!');
      } else {
        // name is null, return a list of history name and id
        const historyList = histories.map((history) => ({ label: history.label, id: history.id }));
        return historyList;
      }
    }
    return [];
  } catch (err) {
    // FIXME: temporary error handling for all api calls, not throwing it
    console.error('Error when loading history: ', err);
    throw err;
  }
};

/**
 * Deletes a history record from the API using its ID.
 * @param {string} token - Authentication token.
 * @param {string} historyId - The ID of the history record to delete.
 */
export const removeHistory = async (token, historyId) => {
  try {
    if (!token) throw new Error('Access token not available!');
    if (!historyId) throw new Error('History ID is required!');

    const res = await deleteHistory(token, historyId);

    if (res) {
      return res;
    }
  } catch (err) {
    console.error('Error when deleting history:', err);
    throw err;
  }
};

/**
* This function saves history by user history api.
* If no param, create a new history record.
* If `id` is specified, update relevant history object.
* @param {string} token - The auth token, default to `null`.
* @param {number} id - The id of history to update, default to `null`.
* @param {string} name - The name of history to update, default to `null`.
* @param {object} data - The data of history to save, default to `null`.
*/
export const saveHistory = async (name, data, token = null, id = null) => {
  try {
    if (!token) throw new Error('Access token not available!');
    if (id !== null) {
      // if id is not null, update history with id
      const res = await updateHistory(token, data, name, id);
      return res;
    } else {
      // if id is null, create a new history
      const res = await createHistory(token, data, name);
      return res;
    }
  } catch (err) {
    console.error('Error when saving history: ', err);
    throw err;
  }
};
