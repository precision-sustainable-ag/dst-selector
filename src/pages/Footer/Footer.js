/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ProgressButtons from '../../shared/ProgressButtons';

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

  const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state to state while taking out the width of the horizontal scrollbar
        setWindowSize({
          width: window.innerWidth - (window.innerWidth - document.documentElement.clientWidth),
          height: document.documentElement.clientHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };

  const windowSize = useWindowSize().width;

  const [footerWidth, setFooterWidth] = useState('100%');
  const tableWidth = useSelector((stateRedux) => stateRedux.pageData.tableWidth);
  const sidebarWidth = useSelector((stateRedux) => stateRedux.pageData.sidebarWidth);

  useEffect(() => {
    setFooterWidth(`${Math.max(windowSize, tableWidth + sidebarWidth)}px`);
  }, [tableWidth, sidebarWidth, windowSize]);
  return (
    <Box
      sx={{
        backgroundColor: '#598445',
        width: footerWidth,
      }}
      className="primaryFooter"
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
