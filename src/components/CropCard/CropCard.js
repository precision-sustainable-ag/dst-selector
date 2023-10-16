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
  crop, handleModalOpen, index, dispatchRedux,
}) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
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

  // height: isMobile ? '350px' : '350px'
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
        <Typography
          sx={{ color: 'grey', textTransform: 'uppercase' }}
        >
          {crop.group}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {crop.label}
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {crop.family.scientific ? trimString(crop.family.scientific, 25) : <br />}
        </Typography>
        <Button
          style={{
            fontSize: '10pt',
            left: -5,
            textDecoration: 'underline',
            color: 'rgb(53, 153, 155)',
          }}
          target="_blank"
          onClick={() => handleModalOpen(crop)}
        >
          View Crop Details
        </Button>
      </CardContent>
      <CardActionArea
        id={`cartBtn${index}`}
        style={{
          backgroundColor: selectedBtns.includes(crop.id) ? '#2b7b79' : '#e3f2f4',
          color: selectedBtns.includes(crop.id) ? 'white' : 'black',
          textAlign: 'center',
          padding: '0.5em',
        }}
        onClick={() => (
          addToBasket(
            crop.id,
            crop.label,
          )
        )}
      >
        <Typography
          variant="body2"
          sx={{ color: selectedBtns.includes(crop.id) ? 'white' : '', fontWeight: 'bold' }}
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
