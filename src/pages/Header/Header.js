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
import { updateAccessToken, updateField } from '../../reduxStore/userSlice';
import { getFields } from '../../shared/constants';
import AuthButton from '../../components/Auth/AuthButton/AuthButton';

const Header = () => {
  const [pathname, setPathname] = useState('/');
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // detect current pathname
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      dispatchRedux(updateAccessToken(token));
      // Initially get user field data
      getFields(token).then((data) => dispatchRedux(updateField(data)));
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently, consentRedux]);

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
    </header>
  );
};

export default Header;
