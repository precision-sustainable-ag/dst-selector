/*
  This file contains the MITLicenseText component, helper functions, and styles
  The MITLicenseText page contains the MIT license text
*/

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MITLicenseText = ({ styles = true, aboutPage = false }) => {
  const currentYear = new Date().getFullYear();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Copyright ©
          {' '}
          {currentYear}
          {' '}
          Northeast Cover Crops Council,&nbsp;
          <a href="http://northeastcovercrops.com/" target="_blank" rel="noopener noreferrer">
            northeastcovercrops.com
          </a>
        </Typography>
        {aboutPage && (
          <>
            <Typography variant="body1" gutterBottom>
              Copyright ©
              {' '}
              {currentYear}
              {' '}
              Midwest Cover Crops Council,&nbsp;
              <a href="http://midwestcovercrops.org/" target="_blank" rel="noopener noreferrer">
                midwestcovercrops.org
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Copyright ©
              {' '}
              {currentYear}
              {' '}
              Southern Cover Crops Council,&nbsp;
              <a href="http://southerncovercrops.org/" target="_blank" rel="noopener noreferrer">
                southerncovercrops.org
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Copyright ©
              {' '}
              {currentYear}
              {' '}
              Western  Cover Crops Council,&nbsp;
              <a href="http://westerncovercrops.org/" target="_blank" rel="noopener noreferrer">
                westerncovercrops.org
              </a>
            </Typography>
          </>
        )}
      </Grid>
      {aboutPage ? (
        <Grid item xs={12}>
          <Typography variant="body1">
            The cover crop data is part of NECCC Cover Crop Decision Support Tools project
            (https://covercrop.tools). The data files and their contents licensed under the terms of
            MIT License. You may use, copy, modify and redistribute all files included in this
            distribution, individually or in aggregate, subject to the terms and conditions of the
            MIT license. See
            {' '}
            <Link to="/license">License</Link>
            {' '}
            for details.
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={styles ? 6 : 12}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body1">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the “Software”), to deal in the
                Software without restriction, including without limitation the rights to use, copy,
                modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
                and to permit persons to whom the Software is furnished to do so, subject to the
                following conditions: The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
                OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default MITLicenseText;
