import { IconButton, InputAdornment, ListItem, ListItemText, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';
import React from 'react';

const CoverCropSearch = (props) => {
  let { sfilters, change } = props;

  const clearCoverCropSearch = () => {
    change('CROP_SEARCH', '');
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
          onChange={(e) => change('CROP_SEARCH', e)}
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
