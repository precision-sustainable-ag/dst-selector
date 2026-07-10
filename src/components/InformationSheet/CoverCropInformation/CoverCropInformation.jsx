import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { callCoverCropApi } from '../../../shared/constants';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

const CoverCropInformation = ({ crop, className }) => {
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
  }, [apiBaseUrlRedux, crop?.id, queryStringRedux]);

  return (
    dataDone && (
      <Grid container spacing={3} className={className}>
        <Grid
          sx={{
            paddingTop: { xs: '30px !important', md: '10px !important' },
            paddingLeft: { xs: '24px !important' },
          }}
          size={{
            md: 6,
            sm: 12,
          }}
        >
          <Grid className="coverCropDescription">
            <Typography variant="h5">{crop['Cover Crop Group']}</Typography>
            <Typography variant="h4">{`${crop.label}`}</Typography>
            <Typography variant="h6" style={{ fontStyle: 'italic' }}>
              {crop.scientificName}
            </Typography>
            <br />
            <Typography variant="h5">Cover Crop Description</Typography>
            <Grid
              size={{
                sm: 12,
              }}
            />
            <Grid>
              <Typography variant="body1">{crop.description ? crop.description : ''}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="imageCarousel"
          size={{
            md: 6,
            sm: 12,
          }}
        >
          <ImageCarousel images={allThumbs} />
        </Grid>
      </Grid>
    )
  );
};

export default CoverCropInformation;
