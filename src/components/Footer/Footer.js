/*
  This file contains the Footer component
  The Footer page contains the disclaimer, links to external resources, and the last updated widget
  styles are made in ../../styles/footer.scss
*/

import { Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { accessToken, owner, repo } from '../../shared/keys';
import '../../styles/footer.scss';

const Footer = () => {
  const [monthYear, setMonthYear] = useState('');

  const fetchDate = async () => {
    return await Axios({
      url: `https://api.github.com/repos/${owner}/${repo}/commits?path=build&page=1&per_page=1`,
      method: 'GET',
      auth: {
        password: accessToken,
      },
    });
  };

  // useEffect(() => {
  //   fetchDate().then((resp) => {
  //     let lastCommitDate = resp.data[0].commit.committer.date;
  //     let lastCommitDateFormatted = new Date(lastCommitDate);
  //     setMonthYear(
  //       `${('0' + (lastCommitDateFormatted.getMonth() + 1)).slice(
  //         -2,
  //       )}/${lastCommitDateFormatted.getFullYear()}`,
  //     );
  //   });
  // }, []);

  return (
    <footer className="primaryFooter">
      <div className="leftSideText">
        <Typography variant="body2" style={{ color: 'black' }}>
          Disclaimer: Consult your local{' '}
          <a
            className="footerLink"
            href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
            target="_blank"
            rel="noopener noreferrer"
          >
            NRCS Service Center
          </a>
          ,{' '}
          <a
            href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
            className="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cooperative Extension Service office
          </a>
          , or{' '}
          <a
            href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
            className="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conservation District
          </a>{' '}
          for detailed guidance.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
