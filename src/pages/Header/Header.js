/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import {
  updateAccessToken, updateConsent, updateField, setSelectFieldId,
} from '../../reduxStore/userSlice';
import {
  getFields, getHistory, buildHistory, postHistory,
} from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';

const Header = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const selectedFieldIdRedux = useSelector((stateRedux) => stateRedux.userData.selectedFieldId);
  const accessTokenRedux = useSelector((stateRedux) => stateRedux.userData.accessToken);

  // useState vars
  const [isRoot, setIsRoot] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(true);

  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const isActive = {};

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
      getHistory(token).then((res) => {
        if (res.data) {
          console.log('load user history', res.data.json, res.data.fieldId);
          const {
            state, region, council, consent,
          } = res.data.json;
          // set user history redux state
          dispatchRedux(updateStateInfo({
            stateLabel: state.label, stateId: state.id, councilShorthand: council.shorthand, councilLabel: council.label,
          }));
          dispatchRedux(updateRegion({ regionId: region.id, regionShorthand: region.shorthand }));
          dispatchRedux(updateConsent(consent.status, consent.date));
          const selectedFieldId = res.data.fieldId;
          dispatchRedux(setSelectFieldId(selectedFieldId));
        } else setConsentModalOpen(true);
      });
    };
    if (isAuthenticated) getToken();
    // if (!isLoading && !isAuthenticated) setConsentModalOpen(true);
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated && (progressRedux === 1 || progressRedux === 2)) {
      const history = buildHistory(
        stateIdRedux,
        stateLabelRedux,
        regionIdRedux,
        regionShorthandRedux,
        councilLabelRedux,
        councilShorthandRedux,
        consentRedux.status,
        consentRedux.date,
        selectedFieldIdRedux,
      );
      console.log('save', history, selectedFieldIdRedux);
      postHistory(accessTokenRedux, history);
    }
    // have to add regionShorthandRedux to dependency since Location cleanup is slower than this function
  }, [progressRedux, regionShorthandRedux]);

  useEffect(() => {
    if (window.location.pathname === '/explorer') {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }

    switch (progressRedux) {
      case 0:
        isActive.val = 0;
        break;
      default:
        break;
    }
  }, [markersRedux]);

  return (
    <header className="d-print-none">
      <div className="topHeader">
        <NavLink to="/profile" activeClassName="active">
          PROFILE
        </NavLink>
        <span className="line" />
        <NavLink to="/about" activeClassName="active">
          ABOUT
        </NavLink>
        <span className="line" />
        <NavLink to="/help" activeClassName="active">
          HELP
        </NavLink>
        <span className="line" />
        <NavLink to="/feedback" activeClassName="active">
          FEEDBACK
        </NavLink>
        <span className="line" />
        <AuthButton
          type={isAuthenticated ? 'Logout' : 'Login'}
          color={isAuthenticated ? 'error' : 'primary'}
        />
      </div>

      <div className="container-fluid">
        <HeaderLogoInfo logo />
      </div>
      <div className="bottomHeader">
        <ToggleOptions
          isRoot={isRoot}
        />
      </div>

      <InformationBar />

      {window.location.pathname === '/about'
        || window.location.pathname === '/help'
        || (window.location.pathname === '/feedback'
          && window.location.pathname !== '/cover-crop-explorer')
        || (progressRedux < 0 && (
          <div className="topBar" />
        ))}

      {(!authModalOpen || isAuthenticated)
      && <ConsentModal modalOpen={consentModalOpen} setModalOpen={setConsentModalOpen} />}
      <AuthModal modalOpen={authModalOpen} setModalOpen={setAuthModalOpen} />
    </header>
  );
};

export default Header;
