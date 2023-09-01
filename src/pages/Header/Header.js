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
import { updateAccessToken, updateField } from '../../reduxStore/userSlice';
import { getFields } from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';

const Header = () => {
  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const progressRedux = useSelector((stateRedux) => stateRedux.sharedData.progress);
  const consentRedux = useSelector((stateRedux) => stateRedux.sharedData.consent);
  const [isRoot, setIsRoot] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const isActive = {};

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently, consentRedux]);

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
        <HeaderLogoInfo />
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
    </header>
  );
};

export default Header;
