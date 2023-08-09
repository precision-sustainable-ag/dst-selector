/*
  This file contains the Header component, helper functions
  The Header shows the header for all the pages
  styled using ../../styles/header.scss
*/

import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../store/Store';
import '../../styles/header.scss';
import HeaderLogoInfo from './HeaderLogoInfo/HeaderLogoInfo';
import InformationBar from './InformationBar/InformationBar';
import ToggleOptions from './ToggleOptions/ToggleOptions';
import {
  lastZipCode, updateZone,
} from '../../reduxStore/addressSlice';

const Header = () => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const zipCodeRedux = useSelector((stateRedux) => stateRedux.addressData.zipCode);
  const lastZipCodeRedux = useSelector((stateRedux) => stateRedux.addressData.lastZipCode);
  const [isRoot, setIsRoot] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isActive = {};

  const getUSDAZone = async (zip) => fetch(`https://phzmapi.org/${zip}.json`);

  useEffect(() => {
    if (!zipCodeRedux) {
      return;
    }

    if (zipCodeRedux !== lastZipCodeRedux) {
      dispatchRedux(lastZipCode(zipCodeRedux));
      // dispatch({
      //   type: 'LAST_ZIP_CODE',
      //   data: {
      //     value: zipCodeRedux,
      //   },
      // });

      getUSDAZone(zipCodeRedux)
        .then((response) => {
          if (response.ok) {
            const dataJson = response.json();
            dataJson.then((data) => {
              // eslint-disable-next-line
              // let zone = window.location.search.match(/zone=([^\^]+)/); // for automating Information Sheet PDFs
              let { zone } = data;

              let regionId = null;

              if (zone !== '8a' && zone !== '8b') {
                zone = zone.slice(0, -1);
              }

              if (state.regions?.length > 0) {
                state.regions.forEach((region) => {
                  if (region.shorthand === zone) {
                    regionId = region.id;
                  }
                });
              }
              if (state.councilShorthand !== 'MCCC') {
                dispatchRedux(updateZone(
                  {
                    zoneText: `Zone ${zone}`,
                    zone,
                    zoneId: regionId,
                  },
                ));
                // dispatch({
                //   type: 'UPDATE_ZONE',
                //   data: {
                //     zoneText: `Zone ${zone}`,
                //     zone,
                //     zoneId: regionId,
                //   },
                // });
              }
            });
          }
        });
    }
  }, [zipCodeRedux, lastZipCodeRedux, dispatch, dispatchRedux, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (window.location.pathname === '/explorer') {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }
    // check value of progress state

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
