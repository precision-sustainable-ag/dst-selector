import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React, {
  useEffect, useState,
} from 'react';
import { PSAButton } from 'shared-react-components/src';
import { useSelector } from 'react-redux';
import { addCropToBasket, trimString } from '../../shared/constants';
import { myCropListLocation, snackHandler } from '../../reduxStore/sharedSlice';
import { updateSelectedCropIds } from '../../reduxStore/cropSlice';
import { setSaveHistory } from '../../reduxStore/userSlice';

const CropCard = ({
  crop, handleModalOpen, index, dispatchRedux,
}) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  // useState vars
  const [selectedBtns, setSelectedBtns] = useState(selectedCropIdsRedux);

  // TODO: Update SelectedCropsRedux

  async function updateBtns() {
    await setSelectedBtns(selectedCropIdsRedux);
  }

  useEffect(() => {
    updateBtns();
  }, [selectedCropIdsRedux]);

  async function addToBasket(cropId, name) {
    addCropToBasket(
      cropId,
      name,
      dispatchRedux,
      snackHandler,
      updateSelectedCropIds,
      selectedCropIdsRedux,
      myCropListLocation,
      historyStateRedux,
      'explorer',
      setSaveHistory,
    );
    await updateBtns();
  }

  // height: isMobile ? '350px' : '350px'
  return (
    <Card style={{ width: isMobile ? '160px' : '260px' }} data-test={`crop-card-${index - 1}`}>
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
          {crop.attributes.filter((a) => a.label === 'Cover Crop Group')[0]?.values[0].value}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} data-test={`crop-card-label-${index - 1}`}>
          {crop.label}
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {crop.scientificName ? trimString(crop.scientificName, 25) : 'No Data'}
        </Typography>
        <PSAButton
          style={{
            fontSize: '10pt',
            left: -5,
            textDecoration: 'underline',
            color: 'rgb(53, 153, 155)',
            backgroundColor: 'transparent',
          }}
          buttonType=""
          target="_blank"
          onClick={() => handleModalOpen(crop)}
          title="View Crop Details"
        />
      </CardContent>
      <CardActionArea
        id={`cartBtn${index}`}
        sx={{
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
