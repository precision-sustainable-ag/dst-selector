import useCropLoader from '../../hooks/useCropLoader';
import useGoalLoader from '../../hooks/useGoalLoader';

const DataLoader = () => {
  useGoalLoader();
  useCropLoader();

  return null;
};

export default DataLoader;
