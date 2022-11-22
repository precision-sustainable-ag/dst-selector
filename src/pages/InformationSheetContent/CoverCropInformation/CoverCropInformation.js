import React from 'react';
import { Typography } from '@mui/material';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';

const CoverCropInformation = ({
  cropImage, cropDescription, allThumbs, crop,
}) => (
  <div className="row otherRows mb-4 avoidPage">
    <div className="col-6 p-0" style={{ marginRight: '5%' }}>
      <Typography variant="h5" className="font-weight-bold text-muted" id="cover-crop-modal-title">
        <div style={{ marginLeft: '3%' }}>
          {`${crop['Cover Crop Group']}`}
        </div>
      </Typography>
      <Typography variant="h4" className="font-weight-bold" id="cover-crop-modal-title">
        <div style={{ marginLeft: '3%' }}>
          {` ${crop['Cover Crop Name']}`}
        </div>
      </Typography>
      <Typography variant="h6" style={{ fontStyle: 'italic' }} className="text-muted px-3 py-2">
        <div style={{ marginLeft: '1%' }}>{ crop['Scientific Name']}</div>
      </Typography>
      <br />
      <Typography variant="h5" className="text-uppercase px-3 py-2">
        Cover Crop Description
      </Typography>
    </div>
    <div style={{ display: 'flex' }}>
      <Typography variant="body1" className="p-3" style={{ maxWidth: '800px', top: '500px' }}>
        {cropDescription}
      </Typography>
      <ImageCarousel images={allThumbs} cropName={cropImage['Cover Crop']} />
    </div>
  </div>
);

export default CoverCropInformation;
