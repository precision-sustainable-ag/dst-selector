/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import MyCoverCropReset from '../../components/MyCoverCropReset/MyCoverCropReset';
import {
  updateAccessToken,
  updateConsent,
  updateField,
  setSelectFieldId,
} from '../../reduxStore/userSlice';
import {
  getFields, getHistory, buildHistory, postHistory,
} from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';
import ConsentModal from '../CoverCropExplorer/ConsentModal/ConsentModal';
import AuthModal from '../Landing/AuthModal/AuthModal';

const Header = () => {
  const [pathname, setPathname] = useState('/');
  const history = useHistory();
  const dispatchRedux = useDispatch();

  // redux vars
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
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // detect current pathname
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
      getHistory(token).then((res) => {
        if (res.data) {
          const {
            state, region, council, consent,
          } = res.data.json;
          // set user history redux state
          dispatchRedux(
            updateStateInfo({
              stateLabel: state.label,
              stateId: state.id,
              councilShorthand: council.shorthand,
              councilLabel: council.label,
            }),
          );
          dispatchRedux(updateRegion({ regionId: region.id, regionShorthand: region.shorthand }));
          dispatchRedux(updateConsent(consent.status, consent.date));
          // The consent is mainly use localstorage to test is expired, use history to update localStorage
          const consentKey = 'consent';
          if (localStorage.getItem(consentKey) === null) {
            const consentObject = {
              choice: consent.status,
              // set user consent selection time as 180 days
              expiredAt: new Date(consent.date).getTime() + 180 * 24 * 60 * 60 * 1000,
            };
            localStorage.setItem(consentKey, JSON.stringify(consentObject));
          }
          const selectedFieldId = res.data.fieldId;
          dispatchRedux(setSelectFieldId(selectedFieldId));
        } else {
          setConsentModalOpen(true);
        }
      });
    };
    if (isAuthenticated) fetchUserData();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    // save user history when user click next in Landing & Location page, change zone in explorer
    if (isAuthenticated && (progressRedux === 1 || progressRedux === 2 || pathname === '/explorer')) {
      const userHistory = buildHistory(
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
      postHistory(accessTokenRedux, userHistory);
    }
  }, [progressRedux, regionShorthandRedux]);

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
        <HeaderLogoInfo />
      </div>
      <div className="bottomHeader">
        <ToggleOptions pathname={pathname} />
      </div>
      <InformationBar pathname={pathname} />
      <MyCoverCropReset />

      {(!authModalOpen || isAuthenticated) && (
        <ConsentModal modalOpen={consentModalOpen} setModalOpen={setConsentModalOpen} />
      )}
      <AuthModal
        modalOpen={authModalOpen}
        setModalOpen={setAuthModalOpen}
        setConsentModalOpen={setConsentModalOpen}
      />
    </header>
  );
};

export default Header;
