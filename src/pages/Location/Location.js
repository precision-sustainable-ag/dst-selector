/* eslint-disable */
/*
  This is the main location widget component
  styled using ../../styles/location.scss
*/

import '../../styles/location.scss';
import {
  Typography,
} from '@mui/material';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import moment from 'moment';
import { Map } from '@psa/dst.ui.map';
// import centroid from '@turf/centroid';
import mapboxgl from 'mapbox-gl';
import { useAuth0 } from '@auth0/auth0-react';
import statesLatLongDict from '../../shared/stateslatlongdict';
import {
  abbrRegion, reverseGEO, callCoverCropApi, postFields, getFields,
  buildPoint, buildGeometryCollection, drawAreaFromGeoCollection, deleteFields,
} from '../../shared/constants';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import PlantHardinessZone from '../CropSidebar/PlantHardinessZone/PlantHardinessZone';
import {
  changeAddressViaMap, updateLocation,
} from '../../reduxStore/addressSlice';
import { updateRegion } from '../../reduxStore/mapSlice';
import { snackHandler } from '../../reduxStore/sharedSlice';
import {
  updateAvgFrostDates, updateAvgPrecipAnnual, updateAvgPrecipCurrentMonth, updateFrostFreeDays,
} from '../../reduxStore/weatherSlice';
import { updateField } from '../../reduxStore/userSlice';
import UserFieldList from './UserFieldList/UserFieldList';
import UserFieldDialog from './UserFieldDialog/UserFieldDialog';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const initFieldDialogState = {
  open: false,
  fieldName: '',
  error: false,
  errorText: '',
  actionType: '',
  areaType: '',
  prevName: '',
};

const fieldNameValidation = (name, currentFields) => {
  if (name === '') return 'You must input a valid name!';
  if (currentFields.filter((f) => f.delete !== true && f.label === name).length > 0) return 'Input name existed!';
  return '';
};

const LocationComponent = () => {
  const dispatchRedux = useDispatch();
  const [currArea, setCurrArea] = useState([]);
  // redux vars
  const countyRedux = useSelector((stateRedux) => stateRedux.addressData.county);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const accessTokenRedux = useSelector((stateRedux) => stateRedux.userData.accessToken);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const myCoverCropListLocationRedux = useSelector((stateRedux) => stateRedux.sharedData.myCoverCropListLocation);
  const regionShorthand = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);

  // useState vars
  const [selectedZone, setselectedZone] = useState();
  const [selectedToEditSite, setSelectedToEditSite] = useState({});
  const [handleConfirm, setHandleConfirm] = useState(false);
  const [locZipCode, setLocZipCode] = useState();

  const { isAuthenticated } = useAuth0();

  // console.log('userFieldRedux', userFieldRedux);
  const [fieldDialogState, setFieldDialogState] = useState(initFieldDialogState);
  const [selectedUserField, setSelectedUserField] = useState(
    userFieldRedux && userFieldRedux.data.length
      ? userFieldRedux.data[userFieldRedux.data.length - 1].label
      : '',
  );
  // use a state to control if currently is adding a point
  const [isAddingPoint, setIsAddingPoint] = useState(true);
  const [drawFields, setDrawFields] = useState([]);
  
  const userFieldsRef = useRef(userFieldRedux ? [...userFieldRedux.data] : []);

  // console.log('selectedUserField', selectedUserField)


  const getArea = () => {
    if (userFieldsRef.current.length > 0) {
      for (let i = 0; i < userFieldsRef.current.length; i++) {
        const field = userFieldsRef.current[i];
        if (field.label === selectedUserField) {
          if (field.geometry.type === 'Point') return [field];
          if (field.geometry.type === 'GeometryCollection') return drawAreaFromGeoCollection(field);
        }
      }
    }
    // reset default field to state capitol
    return [buildPoint(statesLatLongDict[stateLabelRedux][1], statesLatLongDict[stateLabelRedux][0])];
  };


  useEffect(() => {
    setDrawFields(getArea());
  }, [selectedUserField]);

  const getLatLng = useCallback(() => {
    if (userFieldRedux && userFieldRedux.data.length > 0) {
      const currField = userFieldRedux.data[userFieldRedux.data.length - 1];
      // flip lat and lng here
      if (currField.geometry.type === 'Point') {
        return [currField.geometry.coordinates[1], currField.geometry.coordinates[0]];
      }
      if (currField.geometry.type === 'GeometryCollection') {
        const { coordinates } = currField.geometry.geometries[0];
        return [coordinates[1], coordinates[0]];
      }
    }
    if (stateLabelRedux) {
      return [statesLatLongDict[stateLabelRedux][0], statesLatLongDict[stateLabelRedux][1]];
    }
    return [47, -122];
  }, [stateLabelRedux]);

  useEffect(() => {
    if (selectedCropsRedux.length > 0) {
      setHandleConfirm(true);
    }
  }, [selectedCropsRedux, myCoverCropListLocationRedux]);

  const updateReg = (region) => {
    if (region !== undefined) {
      dispatchRedux(updateRegion({
        regionId: region.id ?? '',
        regionLabel: region.label ?? '',
        regionShorthand: region.shorthand ?? '',
      }));
    }
  };

  useEffect(() => {
    updateReg(regionsRedux[0]);
  }, [regionsRedux]);

  const handleMapChange = () => {
    // eslint-disable-next-line eqeqeq
    const regionInfo = regionsRedux.filter((region) => region.shorthand == selectedZone);

    updateReg(regionInfo[0]);
  };

  useEffect(() => {
    if (councilLabelRedux !== 'Midwest Cover Crop Council') {
      setselectedZone(zoneRedux);
    } else {
      setselectedZone(countyRedux?.replace(' County', ''));
    }
  }, [zoneRedux, countyRedux]);

  useEffect(() => {
    const {
      latitude,
      longitude,
      address,
      zipCode,
      county,
    } = selectedToEditSite;

    if (latitude === markersRedux[0][0] && longitude === markersRedux[0][1]) { return; }

    if (isAuthenticated) {
      const currSelectedField = userFieldsRef.current.filter((f) => f.label === selectedUserField)[0]?.geometry;
      if (isAddingPoint && latitude) {
        if ((!currSelectedField && latitude !== statesLatLongDict[stateLabelRedux][0])
          || (currSelectedField?.type === 'Point' && latitude !== currSelectedField?.coordinates[1])
          || (currSelectedField?.type === 'GeometryCollection' && latitude !== currSelectedField?.geometries[0].coordinates[1])
        ) {
          setFieldDialogState({
            ...fieldDialogState, open: true, actionType: 'add', areaType: 'Point',
          });
        }
      }
    }

    if (Object.keys(selectedToEditSite).length > 0) {
      setLocZipCode(zipCode);
      dispatchRedux(updateLocation(
        {
          address,
          markers: [[latitude, longitude]],
        },
      ));
      dispatchRedux(snackHandler({
        snackOpen: true,
        snackMessage: 'Your location has been saved.',
      }));

      if (selectedToEditSite.address) {
        dispatchRedux(changeAddressViaMap(
          {
            address,
            county,
          },
        ));
      }
      if (selectedZone) {
        handleMapChange();
      }
    }
  }, [selectedToEditSite]);

  useEffect(() => {
    // const { markers } = state;
    const weatherApiURL = 'https://weather.covercrop-data.org';

    // update address on marker change
    // ref forecastComponent
    const lat = markersRedux[0][0];
    const lon = markersRedux[0][1];

    // since this updates with state; ideally, weather and soil info should be updated here
    // get current lat long and get county, state and city
    if (progressRedux >= 1 && markersRedux.length > 0) {
      reverseGEO(lat, lon)
        .then(async (resp) => {
          const abbrState = abbrRegion(
            resp?.features?.filter((feature) => feature?.place_type?.includes('region'))[0]?.text,
            'abbr',
          ).toLowerCase();

          const city = resp?.features?.filter((feature) => feature?.place_type?.includes('place'))[0]?.text?.toLowerCase();

          const currentMonthInt = moment().month() + 1;
          // frost url
          const frostUrl = `${weatherApiURL}/frost?lat=${lat}&lon=${lon}`;
          // What was the 5-year average rainfall for city st during the month of currentMonthInt?
          //  Dynamic dates ?
          const averageRainUrl = `${weatherApiURL}/hourly?location=${city}%20${abbrState}&start=2015-01-01&end=2019-12-31`;
          const averageRainForAMonthURL = `${averageRainUrl}&stats=sum(precipitation)/5&where=month=${currentMonthInt}&output=json`;
          // What was the 5-year average annual rainfall for city st?
          const fiveYearAvgRainURL = `${averageRainUrl}&stats=sum(precipitation)/5&output=json`;
          // added "/" and do %100 to get them into correct format (want frost dates to look like 01/01/23)
          const currYear = `/${(new Date().getFullYear() % 100).toString()}`;
          const prevYear = `/${((new Date().getFullYear() % 100) - 1).toString()}`;
          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

          // call the frost url and then set frostFreeDays, averageFrostObject in store
          callCoverCropApi(frostUrl)
            .then(((frostResp) => {
              const firstFrost = new Date(frostResp.firstfrost + prevYear);
              const lastFrost = new Date(frostResp.lastfrost + currYear);
              const frostFreeDays = Math.round(Math.abs((firstFrost.valueOf() - lastFrost.valueOf()) / oneDay));

              dispatchRedux(updateFrostFreeDays(frostFreeDays));
              dispatchRedux(updateAvgFrostDates({
                firstFrostDate: {
                  month: firstFrost.toLocaleString('en-US', { month: 'long' }),
                  day: firstFrost.getDate().toString(),
                },
                lastFrostDate: {
                  month: lastFrost.toLocaleString('en-US', { month: 'long' }),
                  day: lastFrost.getDate().toString(),
                },
              }));
            })).catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });

          // call the frost url and then set averagePrecipitationForCurrentMonth in store
          callCoverCropApi(averageRainForAMonthURL)
            .then((rainResp) => {
              let averagePrecipitationForCurrentMonth = rainResp[0]['sum(precipitation)/5'];

              averagePrecipitationForCurrentMonth = parseFloat(
                averagePrecipitationForCurrentMonth * 0.03937,
              ).toFixed(2);

              dispatchRedux(updateAvgPrecipCurrentMonth(averagePrecipitationForCurrentMonth));
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });

          // call the frost url and then set fiveYearAvgRainAnnual in store
          callCoverCropApi(fiveYearAvgRainURL)
            .then((rainResp) => {
              let fiveYearAvgRainAnnual = rainResp[0]['sum(precipitation)/5'];
              fiveYearAvgRainAnnual = parseFloat(fiveYearAvgRainAnnual * 0.03937).toFixed(
                2,
              );
              dispatchRedux(updateAvgPrecipAnnual(fiveYearAvgRainAnnual));
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(`Weather API error code: ${error?.response?.status} for getting 5 year average rainfall for this month`);
            });
        });
    }
  }, [markersRedux]);

  useEffect(() => {
    if (!locZipCode) {
      return;
    }

    callCoverCropApi(`https://phzmapi.org/${locZipCode}.json`)
      .then((response) => {
        let { zone } = response;

        let regionId = null;

        if (zone !== '8a' && zone !== '8b') {
          zone = zone.slice(0, -1);
        }

        if (regionsRedux?.length > 0) {
          regionsRedux.forEach((region) => {
            if (region.shorthand === zone) {
              regionId = region.id;
            }
          });
        }
        if (councilShorthandRedux !== 'MCCC') {
          dispatchRedux(updateRegion({
            regionId: regionId ?? '',
            regionShorthand: zone ?? '',
          }));
        }
      });
  }, [locZipCode]);

  // save user selected field when component will unmount, need to use refs to reach the component state
  useEffect(() => () => {
    console.log('save', userFieldsRef.current);
    if (isAuthenticated) {
      const updateFields = async () => {
        const fieldUpdates = userFieldsRef.current.map((field) => {
          if (field.delete === true) {
            return deleteFields(accessTokenRedux, field.id);
          }
          // if there is no id field in the object, then it means this object is a new one and need to be post to the backend
          if (!field.id) {
            return postFields(accessTokenRedux, field);
          }
          return null;
        });
        await Promise.all(fieldUpdates);
        getFields(accessTokenRedux).then((data) => dispatchRedux(updateField(data)));
      };
      updateFields();
    }
  }, []);

  // console.log('currArea', currArea, currArea?.features?.slice(-1)[0]);
  // console.log('features', features);

  const onDraw = (draw) => {
    console.log(draw.mode, draw.e.type, draw);
    // set isaddingPoint to false
    if (isAuthenticated && draw.mode !== 'select') {
      setIsAddingPoint(false);
      setFieldDialogState({
        ...fieldDialogState, open: true, actionType: draw.mode, areaType: 'Polygon',
      });
    }
  };

  const handleClose = (save) => {
    const { actionType, areaType, fieldName } = fieldDialogState;
    if (save) {
      if (actionType === 'add') {
        const errText = fieldNameValidation(fieldName, userFieldsRef.current);
        if (errText !== '') {
          setFieldDialogState({ ...fieldDialogState, error: true, errorText: errText });
          return;
        }
        const { longitude, latitude } = selectedToEditSite;
        const point = buildPoint(longitude, latitude, fieldName);
        // console.log('add area', polygon);
        if (areaType === 'Point') {
          userFieldsRef.current = [...userFieldsRef.current, point];
        }
        if (areaType === 'Polygon') {
          const polygon = currArea.features.slice(-1)[0];
          const geoCollection = buildGeometryCollection(point.geometry, polygon.geometry, fieldName);
          userFieldsRef.current = [...userFieldsRef.current, geoCollection];
        }
        setSelectedUserField(fieldName);
      }
      if (actionType === 'update') {
        // Only supports polygon updates
        const { longitude, latitude } = selectedToEditSite;
        const point = buildPoint(longitude, latitude, selectedUserField);
        const polygon = currArea.features.slice(-1)[0];
        // console.log('update', polygon);
        const geoCollection = buildGeometryCollection(point.geometry, polygon.geometry, selectedUserField);
        userFieldsRef.current = userFieldsRef.current.map((f) => {
          if (f.label === selectedUserField) return geoCollection;
          return f;
        });
      }
      if (actionType === 'delete') {
        // add a delete flag so when saving the code knows delete which field
        userFieldsRef.current = userFieldsRef.current.map((f) => {
          if (f.label === selectedUserField) {
            // if this field have not been saved to the backend, directly delete it from the userFields.
            if (!f.id) return null;
            return { ...f, delete: true };
          }
          return f;
        });
        userFieldsRef.current = userFieldsRef.current.filter((f) => f !== null);
        // TODO: reset initFeature to another field(the last field?)
        setSelectedUserField('');
      }
      if (actionType === 'updateName') {
        const { prevName } = fieldDialogState;
        const errText = fieldNameValidation(fieldName, userFieldsRef.current);
        if (errText !== '') {
          setFieldDialogState({ ...fieldDialogState, error: true, errorText: errText });
          return;
        }
        const newField = {
          type: 'Feature',
          geometry: userFieldsRef.current.filter((f) => f.label === prevName)[0].geometry,
          label: fieldName,
        };
        userFieldsRef.current = [...userFieldsRef.current.map((f) => {
          if (f.label === prevName) return { ...f, delete: true };
          return f;
        }), newField];
        setSelectedUserField(fieldName);
      }
    } else {
      // select cancel
      setDrawFields(getArea());
      console.log('This field will not be saved');
    }
    // reset to default state
    setFieldDialogState(initFieldDialogState);
    // reset isAdding point
    setIsAddingPoint(true);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row boxContainerRow mx-0 px-0 mx-lg-3 px-lg-3" style={{ minHeight: '520px' }}>
        <div className="col-xl-4 col-sm-12">
          <div className="container-fluid">
            <Typography variant="h4" align="left">
              Where is your field located?
            </Typography>
            {councilLabelRedux === 'Midwest Cover Crop Council'
              ? (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Please Select A County.
                </Typography>
              )
              : (
                <Typography variant="body1" align="left" justifyContent="center" className="pt-5 pb-2">
                  Find your address or ZIP code using the search bar on the map and hit
                  <Search fontSize="inherit" />
                  to determine your location. If needed, adjust your USDA Plant Hardiness Zone in the dropdown.
                </Typography>
              )}
            <div className="row py-3 my-4 ">
              <div className="col-md-5 col-lg-6 col-sm-12 col-12">
                <PlantHardinessZone
                  updateReg={updateReg}
                  regionShorthand={regionShorthand}
                  regionsRedux={regionsRedux}
                  councilLabelRedux={councilLabelRedux}
                />
              </div>
            </div>
            <div className="row py-3 my-4">
              <div className="col-md-5 col-lg-6 col-sm-12 col-12">
                <UserFieldList
                  userFields={userFieldsRef.current}
                  field={selectedUserField}
                  setField={setSelectedUserField}
                  setFieldDialogState={setFieldDialogState}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-sm-12">
          <div className="container-fluid">
            <Map
              setAddress={setSelectedToEditSite}
              setFeatures={setCurrArea}
              onDraw={onDraw}
              initWidth="100%"
              initHeight="600px"
              initLat={getLatLng()[0]}
              initLon={getLatLng()[1]}
              initFeatures={drawFields}
              initStartZoom={12}
              initMinZoom={4}
              initMaxZoom={18}
              hasSearchBar
              hasMarker
              hasNavigation
              hasCoordBar
              hasDrawing
              hasGeolocate
              hasFullScreen
              hasMarkerPopup
              hasMarkerMovable
            />
          </div>
        </div>
      </div>
      <MyCoverCropReset handleConfirm={handleConfirm} setHandleConfirm={setHandleConfirm} from="selector" />
      <UserFieldDialog
        fieldDialogState={fieldDialogState}
        setFieldDialogState={setFieldDialogState}
        handleClose={handleClose}
      />
    </div>
  );
};

export default LocationComponent;
