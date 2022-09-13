/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  Contains the individual crops in a component
  removeCrop handles removing a crop from the list
  styled using makeStyles
*/

import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { flipCoverCropName, trimString } from '../../shared/constants';
import { Context } from '../../store/Store';
import CropDetailsModalComponent from '../CropSelector/CropDetailsModal';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 230,
  },
  media: {
    height: 140,
  },
});

function MyCoverCropCardsComponent({ data, btnId, cardNo }) {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const handleModalOpen = () => {
    // put data inside modal

    setModalData({ fields: data });

    setModalOpen(true);
  };

  const removeCrop = (cropName) => {
    const removeIndex = state.selectedCrops
      .map((item) => item.id)
      .indexOf(`${btnId}`);

    if (removeIndex === -1) {
      // element not in array
      // not possible ?
    } else {
      const selectedCropsCopy = state.selectedCrops;

      selectedCropsCopy.splice(removeIndex, 1);
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: selectedCropsCopy,
          snackOpen: false,
          snackMessage: 'Removed',
        },
      });
      enqueueSnackbar(`${cropName} Removed`);
    }
  };
  return (
    <div className={`${cardNo === 1 ? 'pl-0 pr-2 pt-2 pb-2' : 'p-2'}`}>
      <Card className={classes.card}>
        <CardMedia
          image={
            data['Image Data']['Key Thumbnail']
              ? `/images/Cover Crop Photos/250/${data['Image Data']['Key Thumbnail']}`
              : 'https://placehold.it/100x100?text=Placeholder'
          }
          className={classes.media}
          title={data['Cover Crop Name']}
        />
        <CardContent>
          <div className="font-weight-bold text-muted text-uppercase" style={{ fontSize: '10pt' }}>
            {`Zone ${data.Zone}`}
          </div>
          <div className="font-weight-bold text-muted text-uppercase" style={{ fontSize: '10pt' }}>
            {data['Family Common Name']}
          </div>
          <Typography variant="h6" className="font-weight-bold text-capitalize text-truncate">
            {flipCoverCropName(data['Cover Crop Name'])}
          </Typography>
          <small className="font-italic text-muted">
            {trimString(data['Scientific Name'], 25)}
          </small>
          <div>
            <small className="text-muted">
              <div
                style={{
                  textDecoration: 'underline',
                  color: 'rgb(53, 153, 155)',
                }}
                onClick={() => handleModalOpen()}
              >
                View Crop Details
              </div>
            </small>
          </div>
        </CardContent>

        <CardActionArea
          style={{
            backgroundColor: '#e3f2f4',
            textAlign: 'center',
            padding: '0.5em',
          }}
          onClick={() => removeCrop(data['Cover Crop Name'])}
        >
          <Typography
            variant="body2"
            className="text-uppercase"
            style={{
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            REMOVE
          </Typography>
        </CardActionArea>
      </Card>
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </div>
  );
}

export default MyCoverCropCardsComponent;
