import React from 'react';
import { Typography } from '@mui/material';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';

const CoverCropInformation = ({
  crop, allThumbs,
}) => (
  <div className="row otherRows mb-4 avoidPage">
    <div className="col-6 p-0" style={{ marginRight: '5%' }}>
      <Typography variant="h5" className="font-weight-bold text-muted" id="cover-crop-modal-title">
        <div style={{ marginLeft: '3%' }}>
          {`${crop.fields.group}`}
        </div>
      </Typography>
      <Typography variant="h4" className="font-weight-bold" id="cover-crop-modal-title">
        <div style={{ marginLeft: '3%' }}>
          {` ${crop.fields.label}`}
        </div>
      </Typography>
      <Typography variant="h6" style={{ fontStyle: 'italic' }} className="text-muted px-3 py-2">
        <div style={{ marginLeft: '1%' }}>{ crop.fields.family.scientific}</div>
      </Typography>
      <br />
      <Typography variant="h5" className="text-uppercase px-3 py-2">
        Cover Crop Description
      </Typography>
    </div>
    <div style={{ display: 'flex' }}>
      <Typography variant="body1" className="p-3" style={{ maxWidth: '700px', minWidth: '700px', top: '500px' }}>
        {crop.fields.description ? crop.fields.description : ''}
      </Typography>
      <ImageCarousel images={allThumbs} />
    </div>
  </div>
);

export default CoverCropInformation;
