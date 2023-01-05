/*
  Contains the comparison tool for my cover crop list
  removeCrop handles removing a crop from the list
  TopBar contains the blue bar for adding crops
  RenderRelevantData updates the filtered values
  RenderSeedingData updates seeding data
  GetAverageGoalRating calculates the average of all the scores
  styled using ../../styles/cropComparisonView.scss
*/

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import {
  DataTooltip,
  getRating,
} from '../../../shared/constants';
import sidebarDefinitionsz4 from '../../../shared/json/zone4/data-dictionary.json';
import sidebarDefinitionsz5 from '../../../shared/json/zone5/data-dictionary.json';
import sidebarDefinitionsz6 from '../../../shared/json/zone6/data-dictionary.json';
import sidebarDefinitionsz7 from '../../../shared/json/zone7/data-dictionary.json';
import { Context } from '../../../store/Store';
import '../../../styles/cropComparisonView.scss';
import '../../../styles/MyCoverCropComparisonComponent.scss';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import CropCard from '../../../components/CropCard/CropCard';

const lightBorder = {
  border: '1px solid #35999b',
  padding: '5px',
  marginBottom: '5px',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  width: 'calc(100%)',
};
const lightBG = {
  border: '1px solid white',
  backgroundColor: '#f1f7eb',
  padding: '5px',
  marginBottom: '5px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
  minHeight: '36px',
};

const GetAverageGoalRating = ({ crop }) => {
  const { state } = useContext(Context);
  let goalRating = 0;
  if (state.selectedGoals.length > 0) {
    state.selectedGoals.forEach((goal) => {
      if (crop[goal]) {
        goalRating += crop[goal];
      }
    });
  }
  return getRating(goalRating / state.selectedGoals.length);
};

const MyCoverCropComparison = ({ selectedCrops }) => {
  const { state, dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const { comparisonKeys } = state;
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const { zone } = state[section];

  const [sidebarDefs, setSidebarDefs] = useState(sidebarDefinitionsz7);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  selectedCrops = selectedCrops || state.selectedCrops;

  const handleModalOpen = (crop) => {
    // put data inside modal
    setModalData({ fields: crop });
    setModalOpen(true);
  };

  useEffect(() => {
    switch (parseInt(zone, 10)) {
      case 7: {
        setSidebarDefs(sidebarDefinitionsz7);
        break;
      }
      case 6: {
        setSidebarDefs(sidebarDefinitionsz6);
        break;
      }
      case 5: {
        setSidebarDefs(sidebarDefinitionsz5);
        break;
      }
      case 4: {
        setSidebarDefs(sidebarDefinitionsz4);
        break;
      }
      default: {
        setSidebarDefs(sidebarDefinitionsz7);
        break;
      }
    }
  }, [zone]);

  const removeCrop = (cropName, id) => {
    let removeIndex = -1;
    state.selectedCrops.forEach((item, i) => {
      if (item.id === id) {
        removeIndex = i;
      }
    });

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

  const getTooltipData = (keyName = '') => {
    const exactObject = sidebarDefs.find((keys) => keys.Variable === keyName);

    if (exactObject) {
      return exactObject.Description;
    }
    return 'No Data';
  };
  const [showScrollArrows, setShowScrollArrow] = useState(false);
  const [showLeftScrollArrow, setShowLeftScrollArrow] = useState(false);
  const scrollContainer = (direction = 'right', amount = 100) => {
    const parent = document.getElementById('scrollContainer');
    if (direction === 'right') {
      parent.scrollLeft += amount;
    } else {
      parent.scrollLeft -= amount;
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-4">
          <div className="row pt-3">
            <div className="col-12">
              {/* placeholder space before the first crop card */}
              <Card style={{ width: 'calc(100%)', boxShadow: 'none' }}>
                <CardMedia style={{ width: 'calc(100%)', height: '292px' }}>
                  <img
                    src="https://via.placeholder.com/10/FFFFFF/FFFFFF"
                    style={{ opacity: 0 }}
                    alt="placeholder"
                  />
                </CardMedia>
                <hr
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0)',
                    visibility: 'hidden',
                  }}
                />
                <CardContent style={{ paddingRight: '0px', paddingLeft: '0px', width: 'calc(100%)' }}>
                  {comparisonKeys.map((keys, index) => (
                    <div
                      style={lightBorder}
                      key={index}
                      id={`comparisonLabel-${keys.split(' ').join('')}`}
                    >
                      <span style={{ width: 'calc(10%)' }}>
                        <DataTooltip
                          data={getTooltipData(keys)}
                          disableInteractive
                          placement="top-start"
                        />
                      </span>
                      <span style={{ width: 'calc(90%)' }}>
                        <Typography variant="body2" className="text-capitalize" noWrap>
                          {keys === 'Cover Crop Group' ? 'Cover Crop Type' : keys}
                        </Typography>
                      </span>
                    </div>
                  ))}

                  {/* Average Goal Rating: Show only if goals are selected */}
                  {state.selectedGoals.length > 0 ? (
                    <div style={lightBorder}>
                      <span>
                        <DataTooltip
                          data="Average rating of all selected goals"
                          disableInteractive
                          placement="top-start"
                        />
                      </span>
                      <span>
                        <Typography variant="body2">Average Goal Rating</Typography>
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Actual crops show up from here */}
        <div className="col-xl-9 col-lg-8 col-md-8 comparisonContainer">
          {showScrollArrows || selectedCrops.length > 4 ? (
            <>
              {showLeftScrollArrow ? (
                <div className="arrowLeftContainer">
                  <IconButton
                    size="medium"
                    title="Scroll Left"
                    aria-label="Scroll Left"
                    onClick={() => scrollContainer('left', 150)}
                  >
                    <KeyboardArrowLeft fontSize="large" />
                  </IconButton>
                </div>
              ) : (
                ''
              )}

              <div className="arrowRightContainer">
                <IconButton
                  size="medium"
                  title="Scroll Right"
                  aria-label="Scroll Right"
                  onClick={() => scrollContainer('right', 150)}
                >
                  <KeyboardArrowRight fontSize="large" />
                </IconButton>
              </div>
            </>
          ) : (
            ''
          )}

          <div
            className="row pt-3"
            id="scrollContainer"
            onScroll={() => {
              // show arrows
              setShowScrollArrow(true);
              const a = document.getElementById('scrollContainer').scrollLeft;
              if (a === 0) {
                setShowLeftScrollArrow(false);
              } else {
                setShowLeftScrollArrow(true);
              }
            }}
          >
            {selectedCrops.map((crop, index) => (
              <div className="col-xl-3 col-lg-5 col-md-6" style={{ paddingLeft: '5px' }} key={index}>
                <CropCard
                  crop={crop.data}
                  removeCrop={removeCrop}
                  handleModalOpen={handleModalOpen}
                  index={index}
                  type="myListCompare"
                  comparisonKeys={comparisonKeys}
                  lightBG={lightBG}
                  GetAverageGoalRating={GetAverageGoalRating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </div>
  );
};

export default MyCoverCropComparison;
