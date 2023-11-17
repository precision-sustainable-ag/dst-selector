import {
  IconButton, InputAdornment, ListItem, ListItemText, TextField, Typography,
} from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cropSearch } from '../../../reduxStore/filterSlice';

const CoverCropSearch = () => {
  const dispatchRedux = useDispatch();
  const cropSearchRedux = useSelector((stateRedux) => stateRedux.filterData.cropSearch);
  const clearCoverCropSearch = (value = '') => {
    dispatchRedux(cropSearch(value));
  };

  return (
    <ListItem>
      <ListItemText>
        <TextField
          fullWidth
          color="secondary"
          label={(
            <Typography>
              <Search />
              Cover Crop Name
            </Typography>
          )}
          value={cropSearchRedux}
          onChangeCapture={(e) => dispatchRedux(cropSearch(e.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => clearCoverCropSearch()} size="small">
                  {cropSearchRedux?.length > 0 && <Clear fontSize="inherit" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItemText>
    </ListItem>
  );
};

export default CoverCropSearch;
