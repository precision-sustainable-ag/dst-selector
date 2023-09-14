/*
  Shows the location selected, which zone the user is in, and shows a disclaimer
  styled using CustomStyles from ../../shared/constants
*/

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';
import { Map } from '@psa/dst.ui.map';
import { useAuth0 } from '@auth0/auth0-react';
import { CustomStyles, buildHistory, postHistory } from '../../../shared/constants';
import SoilCondition from '../SoilCondition/SoilCondition';
import WeatherConditions from '../../../components/WeatherConditions/WeatherConditions';

const LocationConfirmation = () => {
  // redux vars
  const addressRedux = useSelector((stateRedux) => stateRedux.addressData.address);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  // const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);

  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const userFieldRedux = useSelector((stateRedux) => stateRedux.userData.field);
  const selectedFieldRedux = useSelector((stateRedux) => stateRedux.userData.selectedField);
  const accessTokenRedux = useSelector((stateRedux) => stateRedux.userData.accessToken);

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fieldId = userFieldRedux.data.filter((field) => field.label === selectedFieldRedux).id;
      const history = buildHistory(
        stateIdRedux,
        stateLabelRedux,
        regionIdRedux,
        regionShorthandRedux,
        councilLabelRedux,
        councilShorthandRedux,
        consentRedux.status,
        consentRedux.date,
        fieldId,
      );
      console.log('save', history, selectedFieldRedux);

      postHistory(accessTokenRedux, history);
    }
  }, []);

  return (
    <div
      className="container-fluid mt-5"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="row boxContainerRow" style={{ textAlign: 'left', minHeight: '520px' }}>
        <div className="col-xl-6 col-lg-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <Map
                  initWidth="100%"
                  initHeight="200px"
                  initLon={markersRedux && markersRedux.length > 0 ? markersRedux[0][1] : -122}
                  initLat={markersRedux && markersRedux.length > 0 ? markersRedux[0][0] : 47}
                  initMinZoom={4}
                  initMaxZoom={18}
                  initStartZoom={12}
                  hasSearchBar={false}
                  hasMarker
                  hasNavigation={false}
                  hasCoordBar={false}
                  hasDrawing={false}
                  hasGeolocate={false}
                  hasFullScreen={false}
                  hasMarkerPopup={false}
                  hasMarkerMovable={false}
                  scrollZoom={false}
                  dragRotate={false}
                  dragPan={false}
                  keyboard={false}
                  doubleClickZoom={false}
                  touchZoomRotate={false}
                />
              </div>
              <div className="col-lg-6">
                <div className="col-12">
                  <Typography variant="h4">Location Details</Typography>
                </div>
                <div className="col-12 pt-2">
                  <Typography variant="body1">
                    Your cover crop recommendations will come from the Plant Hardiness Zone
                    {` ${zoneRedux} ${councilShorthandRedux} dataset`}
                  </Typography>
                </div>
                <div className="col-12">
                  <Typography
                    variant="body1"
                    className="pt-2 font-weight-bold"
                    style={{
                      color: CustomStyles().lighterGreen,
                    }}
                  >
                    {addressRedux?.length > 0
                      ? `${addressRedux.toString().substring(0, 35)}...`
                      : 'Loading...'}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12" />
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <Typography variant="body1">
                  Disclaimer: Cover crop recommendations are based on expert opinions. Your cover
                  crop performance and seeding rates will vary based on location, management,
                  cultivars, and many other variables. Consult your local
                  {' '}
                  <a
                    href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
                    title="click to consult your local nrcs service center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NRCS Service Center
                  </a>
                  ,
                  {' '}
                  <a
                    href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
                    title="Link to Cooperative Extension Service office"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cooperative Extension Service office
                  </a>
                  ,
                  or
                  {' '}
                  <a
                    href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Conservation District
                  </a>
                  {' '}
                  for detailed guidance. Cover crop incentive programs may dictate seeding rate
                  ranges and methods, and planting and termination dates. Consult your program
                  contact to ensure your plans comply.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5 offset-xl-1 col-lg-12">
          <div className="container-fluid">
            {progressRedux === 2 && <SoilCondition />}
            {progressRedux === 3 && <WeatherConditions />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmation;
