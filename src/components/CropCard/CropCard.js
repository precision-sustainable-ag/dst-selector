import {
  Button,
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { trimString } from '../../shared/constants';
import { Context } from '../../store/Store';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 250,
  },
  media: {
    height: 140,
  },
});

const CropCard = ({
  crop, handleModalOpen, addCropToBasket, removeCrop, index, type,
}) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const classes = useStyles();

  const [selectedBtns, setSelectedBtns] = useState(
    state.selectedCrops.map((crp) => crp.id),
  );

  useEffect(() => {
    const newSelectedBtns = state.selectedCrops.map((crp) => crp.id);
    setSelectedBtns(newSelectedBtns);
  }, [sfilters.zone, state.selectedCrops]);

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => handleModalOpen(crop)}>
        <CardMedia
          image={
            crop['Image Data']['Key Thumbnail']
              ? crop['Image Data']['Key Thumbnail']
              : 'https://placehold.it/100x100?text=Placeholder'
            }
          className={classes.media}
          title={crop['Cover Crop Name']}
        />
      </CardActionArea>
      <CardContent>
        {type === 'cropList'
        && (
        <div className="font-weight-bold text-muted text-uppercase" style={{ fontSize: '10pt' }}>
            {`Zone ${crop.Zone}`}
        </div>
        )}
        <div
          className="font-weight-bold text-muted text-uppercase"
          style={{ fontSize: '10pt' }}
        >
          {crop['Cover Crop Group']}
        </div>
        <div className="font-weight-bold " style={{ fontSize: '16pt' }}>
          <Typography variant="h6" className="text-truncate">
            {crop['Cover Crop Name']}
          </Typography>
        </div>
        <small className="font-italic text-muted d-inline-block text-truncate">
          {trimString(crop['Scientific Name'], 25)}
        </small>
        <div>
          <small className="text-muted">
            <Button
              style={{
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
            && sfilters.zone === crop.Zone
              ? 'activeCartBtn'
              : 'inactiveCartBtn'
          }
        onClick={() => {
          if (selectedBtns.includes(crop.id) && type === 'cropList') {
            return (
              removeCrop(
                crop['Cover Crop Name'],
                crop.id,
              )
            );
          }
          return (
            addCropToBasket(
              crop.id,
              crop['Cover Crop Name'],
              `cartBtn${index}`,
              crop,
            )
          );
        }}
      >
        <Typography
          variant="body2"
          className={`text-uppercase ${
            selectedBtns.includes(crop.id)
              && sfilters.zone === crop.Zone
              ? 'text-white'
              : ''
          }`}
          style={{
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {selectedBtns.includes(crop.id)
            && sfilters.zone === crop.Zone
            ? 'REMOVE'
            : 'ADD TO LIST'}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CropCard;
