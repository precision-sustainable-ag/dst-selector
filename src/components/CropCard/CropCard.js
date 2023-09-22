import {
  Button,
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@mui/material';
import React, {
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { addCropToBasket, trimString } from '../../shared/constants';
import RenderRelevantData from './RenderRelevantData/RenderRelevantData';
import { myCropListLocation, snackHandler } from '../../reduxStore/sharedSlice';
import { selectedCropsModifier } from '../../reduxStore/cropSlice';

const CropCard = ({
  crop, handleModalOpen, index, type, comparisonKeys, lightBG, GetAverageGoalRating, dispatchRedux, enqueueSnackbar,
}) => {
  // redux vars
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = filterStateRedux[section];

  // useState vars
  const [allfilters, setAllFilters] = useState([]);
  const allData = [];

  const [selectedBtns, setSelectedBtns] = useState(selectedCropsRedux);

  // TODO: Update SelectedCropsRedux

  async function updateBtns() {
    await setSelectedBtns(selectedCropsRedux);
  }

  async function setDataDict() {
    await Object.keys(crop.data).forEach((key) => {
      Object.keys(crop?.data?.[key]).forEach((k) => {
        if (crop.data[key][k] !== null && !k.startsWith('Notes:') && typeof crop?.data?.[key]?.[k] === 'object') {
          allData.push(crop.data?.[key]?.[k]);
        }
      });
    });
    await setAllFilters(allData);
  }

  useEffect(() => {
    updateBtns();
  }, [sfilters.zone, selectedCropsRedux]);

  useEffect(() => {
    setDataDict();
  }, [comparisonKeys]);

  async function addToBasket(cropId, name) {
    addCropToBasket(cropId, name, dispatchRedux, enqueueSnackbar, snackHandler, selectedCropsModifier, selectedCropsRedux, myCropListLocation);
    await updateBtns();
  }
  const getRenderData = () => (
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
          data={allfilters}
        />
      ))}
      {/* Show Goal Rating Only IF Goals > 0 */}
      {selectedGoalsRedux.length > 0 && (
      <div style={lightBG}>
        <GetAverageGoalRating crop={crop} />
      </div>
      )}
    </CardContent>
  );

  useEffect(() => {
    if (allfilters.length > 0 && comparisonKeys?.length > 0) {
      getRenderData();
    }
  }, [allfilters, comparisonKeys]);

  return (
    <Card
      sx={{
        position: 'center',
        width: '100%',
        maxWidth: 345,
        marginRight: 10,
      }}
    >
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
      {type === 'myListCompare'
        && (
          getRenderData()
        )}
    </Card>
  );
};

export default CropCard;
