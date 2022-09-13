/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import { Typography } from '@mui/material';
import React from 'react';
import '../../styles/footer.scss';

function Footer() {
  return (
    <footer className="primaryFooter">
      <div className="leftSideText">
        <Typography variant="body2" style={{ color: 'black' }}>
          Disclaimer: Consult your local
          {' '}
          <a
            className="footerLink"
            href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
            target="_blank"
            rel="noopener noreferrer"
          >
            NRCS Service Center
          </a>
          ,
          {' '}
          <a
            href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
            className="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cooperative Extension Service office
          </a>
          , or
          {' '}
          <a
            href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
            className="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conservation District
          </a>
          {' '}
          for detailed guidance.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
