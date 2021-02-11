/*
  This file contains the License component, helper functions
  The License page contains the license which is made of the MIT license text and Agriculture Informatics license
*/

import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../Header/header";
import AgInformaticsLicenseText from "./AgInformaticsLicenseText";
import MITLicenseText from "./MITLicenseText";

const License = ({ licenseType = "MIT" }) => {
  useEffect(() => {
    switch (licenseType) {
      case "MIT":
        document.title = "MIT License";
        break;
      case "AgInformatics":
        document.title = "AgInformatics License";
        break;
      default:
        document.title = "MIT License";
        break;
    }
  }, [licenseType]);
  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-5">
        <Grid container>
          <Grid item>
            {licenseType === "AgInformatics" ? (
              <AgInformaticsLicenseText />
            ) : (
              <MITLicenseText />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default License;
