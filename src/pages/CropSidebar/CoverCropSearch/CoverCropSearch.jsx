import {
  IconButton, InputAdornment, ListItem, ListItemText, Typography,
} from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSATextField } from 'shared-react-components/src';
import { cropSearch } from '../../../reduxStore/filterSlice';

const CoverCropSearch = () => {
  const dispatchRedux = useDispatch();
  const cropSearchRedux = useSelector((stateRedux) => stateRedux.filterData.filters.cropSearch);
  const clearCoverCropSearch = (value = '') => {
    dispatchRedux(cropSearch(value));
  };

  return (
    <ListItem style={{ padding: '0px' }}>
      <ListItemText>
        <PSATextField
          style={{ width: '100%' }}
          label={(
            <Typography sx={{ display: 'flex' }}>
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
          data-test="crop-search-input"
        />
      </ListItemText>
    </ListItem>
  );
};

export default CoverCropSearch;
