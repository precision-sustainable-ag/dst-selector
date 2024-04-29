/* eslint-disable no-console */
import { getHistories, createHistory, updateHistory } from '../api';

const useUserHistory = (token) => {
  /**
 * This function loads history from user history api.
 * If no param, return a list of name of current history records.
 * If `name` is specified, return relevant history object.
 * @param {string} name - The name of history record, default to `null`.
 */
  const loadHistory = async (name = null) => {
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
      throw new Error('No available history record!');
    } catch (err) {
      // FIXME: temporary error handling for all api calls, not throwing it
      console.error('Error when loading history: ', err);
      // throw err;
    }
    return [];
  };

  /**
 * This function saves history by user history api.
 * If no param, create a new history record.
 * If `id` is specified, update relevant history object.
 * @param {number} id - The id of history to update, default to `null`.
 * @param {string} name - The name of history to update, default to `null`.
 * @param {object} data - The data of history to save, default to `null`.
 */
  // eslint-disable-next-line default-param-last
  const saveHistory = async (id = null, name = null, data) => {
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

  return { loadHistory, saveHistory };
};

export default useUserHistory;
