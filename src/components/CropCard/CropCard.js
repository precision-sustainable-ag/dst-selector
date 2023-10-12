import {
  Button,
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React, {
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { addCropToBasket, trimString } from '../../shared/constants';
import { myCropListLocation, snackHandler } from '../../reduxStore/sharedSlice';
import { selectedCropsModifier } from '../../reduxStore/cropSlice';

const CropCard = ({
  crop, handleModalOpen, index, type, dispatchRedux,
}) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);

  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = filterStateRedux[section];

  const [selectedBtns, setSelectedBtns] = useState(selectedCropsRedux);

  // TODO: Update SelectedCropsRedux

  async function updateBtns() {
    await setSelectedBtns(selectedCropsRedux);
  }

  useEffect(() => {
    updateBtns();
  }, [sfilters.zone, selectedCropsRedux]);

  async function addToBasket(cropId, name) {
    addCropToBasket(cropId, name, dispatchRedux, snackHandler, selectedCropsModifier, selectedCropsRedux, myCropListLocation);
    await updateBtns();
  }

  return (
    <Card style={{ width: isMobile ? '160px' : '260px' }}>
      <CardActionArea onClick={() => handleModalOpen(crop)}>
        <CardMedia
          image={
            crop.thumbnail
              ? crop.thumbnail
              : 'https://placehold.it/250x150?text=Placeholder'
            }
          sx={{ height: 140 }}
          title={crop.label}
        />
      </CardActionArea>
      <CardContent>
        {type === 'cropList'
        && (
        <div className="font-weight-bold text-muted text-uppercase" style={{ fontSize: '10pt', marginLeft: '-10px' }}>
            {`Zone ${zoneRedux}`}
        </div>
        )}
        <div
          className="font-weight-bold text-muted text-uppercase"
          style={{ fontSize: '10pt', marginLeft: '-10px' }}
        >
          {crop.group}
        </div>
        <div className="font-weight-bold " style={{ fontSize: '16pt', marginLeft: '-10px' }}>
          <Typography variant="subtitle1" className="font-weight-bold text-truncate">
            {crop.label}
          </Typography>
        </div>
        <small className="font-italic text-muted d-inline-block text-truncate" style={{ marginLeft: '-10px' }}>
          {crop.family.scientific ? trimString(crop.family.scientific, 25) : null}
        </small>
        <div>
          <small className="text-muted">
            <Button
              style={{
                fontSize: '10pt',
                left: -15,
                textDecoration: 'underline',
                color: 'rgb(53, 153, 155)',
              }}
              target="_blank"
              onClick={() => handleModalOpen(crop)}
            >
              View Crop Details
            </Button>
          </small>
        </div>
      </CardContent>
      <CardActionArea
        id={`cartBtn${index}`}
        style={{
          backgroundColor: '#e3f2f4',
          textAlign: 'center',
          padding: '0.5em',
        }}
        className={
            selectedBtns.includes(crop.id)
              ? 'activeCartBtn'
              : 'inactiveCartBtn'
          }
        onClick={() => (
          addToBasket(
            crop.id,
            crop.label,
          )
        )}
      >
        <Typography
          variant="body2"
          className={`text-uppercase ${
            selectedBtns.includes(crop.id)
              ? 'text-white'
              : ''
          }`}
          style={{
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {selectedBtns.includes(crop.id)
            ? 'REMOVE'
            : 'ADD TO LIST'}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CropCard;
