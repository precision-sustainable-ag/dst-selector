import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { callCoverCropApi } from '../../../shared/constants';

const CoverCropInformation = ({
  crop, className,
}) => {
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);

  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);

  useEffect(() => {
    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${queryStringRedux}`,
    ).then((data) => {
      setAllThumbs(data.data);
      setDataDone(true);
    });
  }, []);

  return dataDone && (
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
};

export default CoverCropInformation;
