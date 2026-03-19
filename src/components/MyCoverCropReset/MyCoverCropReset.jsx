import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMyCoverCropReset } from '../../reduxStore/sharedSlice';
import { reset } from '../../reduxStore/store';
import { BinaryButton } from '../../shared/constants';

const MyCoverCropReset = () => {
  const dispatchRedux = useDispatch();
  const history = useHistory();
  const { open, goBack } = useSelector((stateRedux) => stateRedux.sharedData.openMyCoverCropReset);

  const setOpen = (option) => {
    if (option === true) {
      dispatchRedux(reset());
    } else if (goBack === true) {
      history.goBack();
      if (window.location.pathname !== '/') {
        history.push('/');
      }
    }
    dispatchRedux(setMyCoverCropReset(false));
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
