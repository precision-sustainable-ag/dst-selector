import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Typography } from "@material-ui/core";

const HelpComponent = (props) => {
  return (
    <div className="contentWrapper">
      <Header />
      <div className="container-fluid pt-4" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-12 text-left">
            <Typography variant="h5">
              How to Use the Northeast Cover Crop Species Selector Tool
            </Typography>
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-12 text-left">
            <ol>
              <li>Start with the Species Selector Wizard</li>
              <li>
                <ol>
                  <li>Define your location:</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpComponent;
