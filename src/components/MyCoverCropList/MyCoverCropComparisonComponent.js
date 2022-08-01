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
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Cancel, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import {
  DataTooltip,
  flipCoverCropName,
  getRating,
  RenderSeedPriceIcons,
  trimString,
} from '../../shared/constants';
import sidebarDefinitionsz4 from '../../shared/json/zone4/data-dictionary.json';
import sidebarDefinitionsz5 from '../../shared/json/zone5/data-dictionary.json';
import sidebarDefinitionsz6 from '../../shared/json/zone6/data-dictionary.json';
import sidebarDefinitionsz7 from '../../shared/json/zone7/data-dictionary.json';
import { Context } from '../../store/Store';
import '../../styles/cropComparisonView.scss';
import '../../styles/MyCoverCropComparisonComponent.scss';
import CropDetailsModalComponent from '../CropSelector/CropDetailsModal';

const lightBorder = {
  border: '1px solid #35999b',
  padding: '5px',
  marginBottom: '5px',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
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

const MyCoverCropComparisonComponent = (props) => {
  const { state, dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const { comparisonKeys } = state;
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const zone = state[section].zone;

  const [sidebarDefs, setSidebarDefs] = useState(sidebarDefinitionsz7);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const selectedCrops = props.selectedCrops ? props.selectedCrops : state.selectedCrops;

  const handleModalOpen = (crop) => {
    // put data inside modal

    setModalData(crop);

    setModalOpen(true);
  };

  useEffect(() => {
    switch (parseInt(zone)) {
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

  const removeCrop = (id, cropName) => {
    var removeIndex = state.selectedCrops
      .map(function (item) {
        return item.id;
      })
      .indexOf(`${id}`);

    if (removeIndex === -1) {
      // element not in array
      // not possible ?
    } else {
      let selectedCropsCopy = state.selectedCrops;

      selectedCropsCopy.splice(removeIndex, 1);
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: selectedCropsCopy,
          snackOpen: false,
          snackMessage: `Removed`,
        },
      });
      enqueueSnackbar(`${cropName} Removed`);
    }
  };

  const getTooltipData = (keyName = '') => {
    const exactObject = sidebarDefs.find((keys) => keys.Variable === keyName);

    if (exactObject) {
      return exactObject.Description;
    } else {
      return 'No Data';
    }
  };
  const [showScrollArrows, setShowScrollArrow] = useState(false);
  const [showLeftScrollArrow, setShowLeftScrollArrow] = useState(false);
  const scrollContainer = (direction = 'right', amount = 100) => {
    let parent = document.getElementById('scrollContainer');
    if (direction === 'right') {
      parent.scrollLeft += amount;
    } else {
      parent.scrollLeft -= amount;
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Placeholder for empty white space */}
        <div className="col-xl-3 col-lg-4 col-md-4">
          <div className="row pt-3">
            <div className="col-12">
              <Card style={{ width: '100%', boxShadow: 'none' }}>
                <CardMedia
                  children={
                    <img
                      src="https://via.placeholder.com/10/FFFFFF/FFFFFF"
                      style={{ opacity: 0 }}
                      alt="placeholder"
                    />
                  }
                  style={{ width: '100%', height: '100px' }}
                />
                <CardContent>
                  <div
                    className="font-weight-bold text-uppercase"
                    style={{
                      fontSize: '10pt',
                      color: 'white',
                      visibility: 'hidden',
                    }}
                  >
                    {`Zone`}
                  </div>
                  <div
                    className="font-weight-bold text-uppercase"
                    style={{
                      fontSize: '10pt',
                      color: 'white',
                      visibility: 'hidden',
                    }}
                  >
                    {'Family Common Name'}
                  </div>
                  <div
                    className="font-weight-bold "
                    style={{
                      fontSize: '16pt',
                      color: 'white',
                      visibility: 'hidden',
                    }}
                  >
                    {'Cover Crop Name'}
                  </div>
                  <small className="font-italic" style={{ color: 'white', visibility: 'hidden' }}>
                    {'Scientific Name'}
                  </small>
                  <div>
                    <small className="text-muted">
                      <a
                        style={{
                          textDecoration: 'underline',
                          color: 'white',
                          visibility: 'hidden',
                        }}
                        href="/#"
                      >
                        View Crop Details
                      </a>
                    </small>
                  </div>
                </CardContent>
                <hr
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0)',
                    visibility: 'hidden',
                  }}
                />
                <CardContent style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                  {comparisonKeys.map((keys, index) => {
                    return (
                      <div
                        style={lightBorder}
                        key={index}
                        id={`comparisonLabel-${keys.split(' ').join('')}`}
                      >
                        <span>
                          <DataTooltip
                            data={getTooltipData(keys)}
                            interactive={false}
                            placement="top-start"
                          />
                        </span>
                        <span>
                          <Typography variant="body2" className="text-capitalize">
                            {keys === 'Cover Crop Group' ? 'Cover Crop Type' : keys}
                          </Typography>
                        </span>
                      </div>
                    );
                  })}

                  {/* Average Goal Rating: Show only if goals are selected */}
                  {state.selectedGoals.length > 0 ? (
                    <div style={lightBorder}>
                      <span>
                        <DataTooltip
                          data={'Average rating of all selected goals'}
                          interactive={false}
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
              let a = document.getElementById('scrollContainer').scrollLeft;
              if (a === 0) {
                setShowLeftScrollArrow(false);
              } else {
                setShowLeftScrollArrow(true);
              }
            }}
          >
            {selectedCrops.map((crop, index) => (
              <div className="col-xl-3 col-lg-5" key={index}>
                <Card className="mainComparisonCard" style={{ width: '100%' }}>
                  <span
                    onClick={() => removeCrop(crop.id, crop.cropName)}
                    className="cardCloseIcon"
                  >
                    <Cancel titleAccess="Remove Crop" />
                  </span>
                  {crop.data['Image Data'] ? (
                    <CardMedia
                      image={
                        crop.data['Image Data']['Key Thumbnail']
                          ? `/images/Cover Crop Photos/250/${crop.data['Image Data']['Key Thumbnail']}`
                          : 'https://placehold.it/100x100?text=Placeholder'
                      }
                      title={crop.cropName}
                      style={{ width: '100%', height: '100px' }}
                    />
                  ) : (
                    <CardMedia
                      children={
                        <img
                          src="https://via.placeholder.com/100/?text=Placeholder"
                          style={{ width: '100%', height: '100px' }}
                          alt="Placeholder"
                        />
                      }
                    />
                  )}

                  <CardContent>
                    <div
                      className="font-weight-bold text-muted text-uppercase"
                      style={{ fontSize: '10pt' }}
                    >
                      {`Zone ${crop.data['Zone']}`}
                    </div>
                    <div
                      className="font-weight-bold text-muted text-uppercase"
                      style={{ fontSize: '10pt' }}
                    >
                      {crop.data['Family Common Name']}
                    </div>
                    <div className="font-weight-bold " style={{ fontSize: '16pt' }}>
                      {flipCoverCropName(crop.data['Cover Crop Name'])}
                    </div>
                    <small className="font-italic text-muted">
                      {trimString(crop.data['Scientific Name'], 25)}
                    </small>
                    <div>
                      <small className="text-muted">
                      {console.log('here here here HERE')}
                        <div
                          style={{
                            textDecoration: 'underline',
                            color: 'rgb(53, 153, 155)',
                          }}
                          onClick={() => handleModalOpen({ fields: crop.data })}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Crop Details
                        </div>
                      </small>
                    </div>
                  </CardContent>
                  <hr />
                  <CardContent
                    style={{
                      paddingRight: '0px',
                      paddingLeft: '0px',
                      paddingBottom: '0px',
                    }}
                  >
                    {comparisonKeys.map((filterKey, index) => (
                      <RenderRelevantData
                        key={index}
                        filterKey={filterKey}
                        data={crop.data}
                        index={index}
                      />
                    ))}
                    {/* Show Goal Rating Only IF Goals > 0 */}
                    {state.selectedGoals.length > 0 ? (
                      <div style={lightBG}>
                        <GetAverageGoalRating crop={crop} />
                      </div>
                    ) : (
                      ''
                    )}
                  </CardContent>
                  <CardActionArea
                    style={{
                      backgroundColor: '#e3f2f4',
                      textAlign: 'center',
                      padding: '0.5em',
                    }}
                    onClick={() => removeCrop(crop.id, crop.cropName)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </div>
  );
};

const RenderRelevantData = ({ filterKey = '', data = [], index = 0 }) => {
  if (typeof data[filterKey] === 'number') {
    if (data[filterKey].toString().length === 1) {
      if (filterKey === 'Seed Price per Pound') {
        return (
          <div style={lightBG}>
            <RenderSeedPriceIcons val={data['Seed Price per Pound']} />
          </div>
        );
      } else return <div style={lightBG}>{getRating(data[filterKey])}</div>;
    } else {
      return (
        <div style={lightBG}>
          <Typography variant="body2">{data[filterKey]}</Typography>
        </div>
      );
    }
  } else {
    if (filterKey === 'Frost Seeding' || filterKey === 'Aerial Seeding') {
      return (
        <div style={lightBG}>
          <RenderSeedingData data={data} filterKey={filterKey} />
        </div>
      );
    } else if (data[filterKey]) {
      return (
        <div style={lightBG}>
          <Typography variant="body2">{data[filterKey].toString()}</Typography>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
};

const RenderSeedingData = ({ filterKey, data }) => {
  if (data[filterKey]) {
    return <Typography variant="body2">Yes</Typography>;
  } else {
    return <Typography variant="body2">N/A</Typography>;
  }
};
const GetAverageGoalRating = ({ crop }) => {
  const { state } = useContext(Context);
  let goalRating = 0;
  if (state.selectedGoals.length > 0) {
    state.selectedGoals.forEach((goal) => {
      if (crop.data[goal]) {
        goalRating += crop.data[goal];
      }
    });
  }
  return getRating(goalRating / state.selectedGoals.length);
};

export default MyCoverCropComparisonComponent;
