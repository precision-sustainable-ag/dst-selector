/* eslint-disable no-console */
import { userHistoryApiUrl, userHistorySchema } from './keys';

const historyApiUrl = `${userHistoryApiUrl}/v1`;

const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Fetch Status: ${res.status} ${res.statusText}`);
    }
    // TODO: NOTE: there might be more res structure like res.text()
    return await res.json();
  } catch (error) {
    console.error('Error when fetching: ', error.message);
    throw error;
  }
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
  try {
    const data = await fetchData(url, config);
    return data;
  } catch (err) {
    console.error('Error creating history: ', err);
    throw err;
  }
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
  try {
    const data = await fetchData(url, config);
    return data;
  } catch (err) {
    console.error('Error updating history: ', err);
    throw err;
  }
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
  try {
    const data = await fetchData(url, config);
    return data;
  } catch (err) {
    console.error('Error trying fetch histories: ', err);
    throw err;
  }
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
          console.log('loaded history', name, history);
          // return object since sometime ID property is needed
          return history[0];
        }
        throw new Error('History name not available!');
      } else {
        // name is null, return a list of history name and id
        const historyList = histories.map((history) => ({ label: history.label, id: history.id }));
        console.log('history list', historyList);
        return historyList;
      }
    }
    return [];
  } catch (err) {
    // FIXME: temporary error handling for all api calls, not throwing it
    console.error('Error when loading history: ', err);
    // throw err;
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
// eslint-disable-next-line default-param-last
export const saveHistory = async (token = null, id = null, name = null, data) => {
  try {
    if (!token) throw new Error('Access token not available!');
    if (id !== null) {
      // if id is not null, update history with id
      const res = await updateHistory(token, data, name, id);
      console.log('updated history', res);
    } else {
      // if id is null, create a new history
      const res = await createHistory(token, data, name);
      console.log('created history', res);
    }
  } catch (err) {
    console.error('Error when saving history: ', err);
  }
};
