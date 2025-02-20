/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ProgressButtons from '../../shared/ProgressButtons';
// import useWindowSize from '../../shared/constants';

const Footer = () => {
  const history = useHistory();

  // useState vars
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    // detect current pathname
    history.listen((location) => {
      setPathname(location.pathname);
    });
  }, [history]);

  // const windowSize = useWindowSize().width;

  // const [footerWidth, setFooterWidth] = useState('100%');
  // const tableWidth = useSelector((stateRedux) => stateRedux.pageData.tableWidth);
  // const sidebarWidth = useSelector((stateRedux) => stateRedux.pageData.sidebarWidth);

  // useEffect(() => {
  //   setFooterWidth(`${Math.max(windowSize, tableWidth + sidebarWidth)}px`);
  // }, [tableWidth, sidebarWidth, windowSize]);
  return (
    <Box
      sx={{
        backgroundColor: '#598445',
        width: '100vw',
      }}
      className="primaryFooter"
      id="page-footer"
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        height={pathname !== '/' ? '50px' : 'auto'}
      >
        {pathname === '/' && (
        <Grid
          item
          xs={12}
          mt={0.6}
          mb={0.6}
        >
          <ProgressButtons />
        </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Footer;
