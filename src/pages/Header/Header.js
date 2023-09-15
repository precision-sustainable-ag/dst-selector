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
import { getFields, getHistory } from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';

const Header = () => {
  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const [isRoot, setIsRoot] = useState(false);
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const isActive = {};
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
      getHistory(token).then((res) => {
        if (res.data) {
          console.log('user history', res.data.json);
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
    if (!isLoading && !isAuthenticated) setConsentModalOpen(true);
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

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
