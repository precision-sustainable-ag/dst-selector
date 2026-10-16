import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCropIds } from '../../reduxStore/cropSlice';
import { clearFilters } from '../../reduxStore/filterSlice';
import { updateSelectedGoal } from '../../reduxStore/goalSlice';
import { setMyCoverCropReset } from '../../reduxStore/sharedSlice';
import { reset } from '../../reduxStore/store';
import { BinaryButton } from '../../shared/constants';

const MyCoverCropReset = () => {
  const dispatchRedux = useDispatch();
  const { open, resetCrops } = useSelector(
    (stateRedux) => stateRedux.sharedData.openMyCoverCropReset,
  );

  const setOpen = (option) => {
    if (option === true) {
      if (resetCrops) {
        // if resetCrops is true, only reset the selected crops, goals and filters
        dispatchRedux(updateSelectedCropIds([]));
        dispatchRedux(updateSelectedGoal([]));
        dispatchRedux(clearFilters());
      } else {
        dispatchRedux(reset());
      }
    }
    dispatchRedux(setMyCoverCropReset(false, false, option));
  };

  return (
    <Dialog disableEscapeKeyDown open={open}>
      <DialogContent dividers>
        <Typography variant="body1">
          In order to continue you will need to reset the My Cover Crop List. Would you like to
          continue?
        </Typography>
      </DialogContent>
      <DialogActions className="resetBox">
        <BinaryButton action={setOpen} />
      </DialogActions>
    </Dialog>
  );
};

export default MyCoverCropReset;
