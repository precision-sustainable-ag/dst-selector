/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Context } from '../../store/Store';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import LogoutButton from '../../components/Auth/Buttons/LogoutButton';
import { updateAccessToken, updateField } from '../../reduxStore/userSlice';
import { getFields } from '../../shared/constants';

const Header = () => {
  const dispatch = useDispatch();
  const { state } = useContext(Context);
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const [isRoot, setIsRoot] = useState(false);
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const isActive = {};

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatch(updateAccessToken(token));
      // get initial user field data
      getFields(token).then((data) => dispatch(updateField(data)));
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (window.location.pathname === '/explorer') {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }

    switch (state.progress) {
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
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <a href="/" onClick={loginWithRedirect}>
            LOG IN
          </a>
        )}
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
        || (state.progress < 0 && (
          <div className="topBar" />
        ))}
    </header>
  );
};

export default Header;
