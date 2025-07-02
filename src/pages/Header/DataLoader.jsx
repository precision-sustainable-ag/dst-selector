import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callCoverCropApi } from '../../shared/constants';
import { updateAllGoals, updatePlantingSeasons } from '../../reduxStore/goalSlice';

const DataLoader = () => {
  const dispatch = useDispatch();

  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // fetch goals data
  useEffect(() => {
    if (progressRedux === 1 && stateIdRedux && queryStringRedux) {
      callCoverCropApi(
        `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/goals?`
        + `${councilShorthandRedux === 'WCCC' ? 'seasons=true&' : ''}${queryStringRedux}`,
      ).then((data) => {
        const allGoals = data.data.map((goal) => ({ label: goal.label, description: goal.description, tags: goal.tags }));
        // console.log('allgoals', allGoals, data.plantingSeasons);
        dispatch(updateAllGoals(allGoals));
        if (councilShorthandRedux === 'WCCC' && data.plantingSeasons) {
          dispatch(updatePlantingSeasons(data.plantingSeasons));
        }
      });
    }
  }, [progressRedux, stateIdRedux, queryStringRedux]);

  return null;
};

export default DataLoader;
