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
import RenderRelevantData from './RenderRelevantData/RenderRelevantData';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 250,
    marginRight: 10,
  },
  media: {
    height: 140,
  },
});

const CropCard = ({
  crop, handleModalOpen, addCropToBasket, removeCrop, index, type, comparisonKeys, lightBG, GetAverageGoalRating,
}) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const classes = useStyles();

  const [selectedBtns, setSelectedBtns] = useState(
    state.selectedCrops.map((crp) => crp.id),
  );

  async function updateBtns() {
    await setSelectedBtns(state.selectedCrops.map((crp) => crp.id));
  }

  useEffect(() => {
    updateBtns();
  }, [sfilters.zone, state.selectedCrops]);

  async function addToBasket(cropId, name, i, c) {
    addCropToBasket(cropId, name, i, c);
    await updateBtns();
  }

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
              ? 'activeCartBtn'
              : 'inactiveCartBtn'
          }
        onClick={() => {
          if (selectedBtns.includes(crop.id) && type !== 'explorer') {
            return (
              removeCrop(
                crop['Cover Crop Name'],
                crop.id,
              )
            );
          }
          return (
            addToBasket(
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
      {type === 'myListCompare'
        && (
        <CardContent
          style={{
            paddingRight: '0px',
            paddingLeft: '0px',
            paddingBottom: '0px',
          }}
        >
          {comparisonKeys.map((filterKey, i) => (
            <RenderRelevantData
              key={i}
              filterKey={filterKey}
              data={crop}
            />
          ))}
          {/* Show Goal Rating Only IF Goals > 0 */}
          {state.selectedGoals.length > 0 && (
          <div style={lightBG}>
            <GetAverageGoalRating crop={crop} />
          </div>
          )}
        </CardContent>
        )}
    </Card>
  );
};

export default CropCard;
