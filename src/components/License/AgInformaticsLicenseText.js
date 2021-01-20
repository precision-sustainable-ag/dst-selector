import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const AgInformaticsLicenseText = ({
  styles = true,
  aboutPage = false,
  footerPage = false,
}) => {
  const currentYear = new Date().getFullYear();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {footerPage ? (
          <Typography variant="body2">
            Copyright © {currentYear}{" "}
            <a href="http://northeastcovercrops.com/" target="_blank">
              Northeast Cover Crop Council
            </a>
            ,{" "}
            <a href="http://aginformaticslab.org/" target="_blank">
              Agricultural Informatics Lab
            </a>
          </Typography>
        ) : (
          <Typography variant={footerPage ? "body2" : "body1"} gutterBottom>
            Copyright © {currentYear} Agricultural Informatics Lab, &nbsp;
            <a href="http://aginformaticslab.org/" target="_blank">
              aginformaticslab.org
            </a>
          </Typography>
        )}
      </Grid>
      {!footerPage ? (
        aboutPage ? (
          <Grid item xs={12}>
            <Typography variant="body1">
              This is free software; all of the software, documentation, and
              data files and their contents, is licensed under the terms of MIT
              License, with the exception of the copyright protected cover crop
              images. You may use, copy, modify and redistribute all files
              included in this distribution, individually or in aggregate,
              subject to the terms and conditions of the MIT license. See{" "}
              <Link to={"/ag-informatics-license"}>License</Link> for details.
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={styles ? 6 : 12}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="body1">
                  Permission is hereby granted, free of charge, to any person
                  obtaining a copy of this software and associated documentation
                  files (the “Software”), to deal in the Software without
                  restriction, including without limitation the rights to use,
                  copy, modify, merge, publish, distribute, sublicense, and/or
                  sell copies of the Software, and to permit persons to whom the
                  Software is furnished to do so, subject to the following
                  conditions: The above copyright notice and this permission
                  notice shall be included in all copies or substantial portions
                  of the Software.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      ) : (
        ""
      )}
    </Grid>
  );
};

export default AgInformaticsLicenseText;
