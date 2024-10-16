import {
  IconButton, InputAdornment, ListItem, ListItemText, Typography,
} from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cropSearch } from '../../../reduxStore/filterSlice';
import PSATextField from '../../../components/PSAComponents/PSATextField';
// import PSATextField from '../../../components/PSAComponents/PSATextField';

const CoverCropSearch = () => {
  const dispatchRedux = useDispatch();
  const cropSearchRedux = useSelector((stateRedux) => stateRedux.filterData.cropSearch);
  const clearCoverCropSearch = (value = '') => {
    dispatchRedux(cropSearch(value));
  };

  return (
    <ListItem style={{ padding: '0px' }}>
      <ListItemText>
        <PSATextField
          style={{ width: '100%' }}
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
          data-cy="crop-search-input"
        />
      </ListItemText>
    </ListItem>
  );
};

export default CoverCropSearch;
