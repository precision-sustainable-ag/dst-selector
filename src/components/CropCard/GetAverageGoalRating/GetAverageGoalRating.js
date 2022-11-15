import { useContext } from 'react';
import '../../../styles/cropComparisonView.scss';
import '../../../styles/MyCoverCropComparisonComponent.scss';
import { Context } from '../../../store/Store';
import {
  getRating,
} from '../../../shared/constants';

const GetAverageGoalRating = ({ crop }) => {
  const { state } = useContext(Context);
  let goalRating = 0;
  if (state.selectedGoals.length > 0) {
    state.selectedGoals.forEach((goal) => {
      if (crop.data[goal]) {
        goalRating += crop.data[goal];
      }
    });
  }
  return getRating(goalRating / state.selectedGoals.length);
};

export default GetAverageGoalRating;
