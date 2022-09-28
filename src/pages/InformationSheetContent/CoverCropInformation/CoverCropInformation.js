import React from 'react';
import { Typography } from '@mui/material';
import PhotoComponent from './PhotoComponent';

const CoverCropInformation = ({ cropImage, cropDescription }) => (
  <>
    <div className="row coverCropDescriptionWrapper avoidPage">
      <div className="col-12 p-0">
        <Typography variant="h6" className="text-uppercase px-3 py-2">
          Cover Crop Description
        </Typography>

        <Typography variant="body1" className="p-3">
          {cropDescription}
        </Typography>
      </div>
    </div>

    <div
      className="d-flex justify-content-center mt-2 mb-2 photosWrapper avoidPage"
      style={{
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <PhotoComponent imageData={cropImage} />
    </div>
  </>
);

export default CoverCropInformation;
