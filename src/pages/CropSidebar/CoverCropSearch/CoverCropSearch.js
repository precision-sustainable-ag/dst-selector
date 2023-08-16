import {
  IconButton, InputAdornment, ListItem, ListItemText, TextField,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cropSearch } from '../../../reduxStore/filterSlice';

const CoverCropSearch = ({ sfilters }) => {
  const dispatchRedux = useDispatch();
  const clearCoverCropSearch = (value = '') => {
    dispatchRedux(cropSearch(value));
  };

  return (
    <ListItem>
      <ListItemText>
        <TextField
          fullWidth
          color="secondary"
          label="Cover Crop Name"
          helperText="Search by cover crop name"
          value={sfilters.cropSearch}
          onChangeCapture={(e) => dispatchRedux(cropSearch(e.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => clearCoverCropSearch()} size="small">
                  {sfilters.cropSearch.length > 0 && <Clear fontSize="inherit" />}
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
