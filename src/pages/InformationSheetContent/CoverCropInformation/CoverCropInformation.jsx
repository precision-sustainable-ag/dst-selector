import React from 'react';
import { Typography, Grid } from '@mui/material';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';

const CoverCropInformation = ({
  crop, allThumbs, className,
}) => (
  <Grid container spacing={3} className={className}>
    <Grid item md={6} sm={12} sx={{ paddingTop: { xs: '30px !important', md: '10px !important' }, paddingLeft: { xs: '24px !important' } }}>
      <Grid className="coverCropDescription" item>
        <Typography variant="h5">
          {crop['Cover Crop Group']}
        </Typography>
        <Typography variant="h4">
          {`${crop.label}`}
        </Typography>
        <Typography variant="h6" style={{ fontStyle: 'italic' }}>
          {crop.scientificName}
        </Typography>
        <br />
        <Typography variant="h5">
          Cover Crop Description
        </Typography>
        <Grid item sm={12} />
        <Grid item>
          <Typography variant="body1">
            {crop.description ? crop.description : ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid className="imageCarousel" item md={6} sm={12}>
      <ImageCarousel images={allThumbs} />
    </Grid>
  </Grid>

);

export default CoverCropInformation;
