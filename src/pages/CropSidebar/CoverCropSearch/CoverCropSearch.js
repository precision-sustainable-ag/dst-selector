import {
  IconButton, InputAdornment, ListItem, ListItemText, TextField,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import React from 'react';
import { cropSearch } from '../../../reduxStore/filterSlice';
import { useDispatch } from 'react-redux';

const CoverCropSearch = ({ sfilters, dispatch }) => {
  const dispatchRedux = useDispatch();
  const clearCoverCropSearch = (type = 'CROP_SEARCH', value = '') => {
    dispatchRedux(cropSearch(value));
    // dispatch({
    //   type,
    //   data: { value },
    // });
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
          // onChange={(e) => dispatch({ type: 'CROP_SEARCH', data: { value: e.target.value } })}
          onChange={(e) => dispatchRedux(cropSearch(e.target.value))}
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
