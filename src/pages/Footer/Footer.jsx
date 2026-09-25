/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationButtons from '../../shared/NavigationButtons';
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

  return (
    <Box
      sx={{
        backgroundColor: '#598445',
        width: '100%',
      }}
      className="primaryFooter"
      id="page-footer"
    >
      <Grid
        container
        direction="column"
        sx={{
          p: '8px 0',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {pathname === '/' ? <ProgressButtons /> : <NavigationButtons />}
      </Grid>
    </Box>
  );
};

export default Footer;
