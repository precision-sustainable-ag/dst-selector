import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Typography } from "@material-ui/core";

const HelpComponent = (props) => {
  const resizeIframe = (obj) => {
    obj.style.height =
      obj.contentWindow.document.documentElement.scrollHeight + "px";
  };
  return (
    <div className="contentWrapper">
      <Header />
      <div className="container-fluid pt-4" style={{ minHeight: "70vh" }}>
        <div className="row">
          <iframe
            src="https://docs.google.com/document/d/e/2PACX-1vTZ-K1pVoaJLtlUV0m24VLcJzaaPHGVbC5pABnClERFTD_YcWrgSOVg7SJ6Rr_2ab90Md_Am8MQBAFc/pub?embedded=true"
            frameBorder="none"
            width="100%"
            height="400px"
            style={{
              minHeight: "80vh",
            }}
            // onLoad={resizeIframe}
          />
        </div>
      </div>
    </div>
  );
};

export default HelpComponent;
