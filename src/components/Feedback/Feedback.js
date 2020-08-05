import React, { useState, useEffect } from "react";
import Header from "../Header/header";

const FeedbackComponent = (props) => {
  return (
    <div className="contentWrapper">
      <Header />
      <div className="container-fluid pt-4" style={{ minHeight: "70vh" }}>
        <div
          className="mx-auto d-flex justify-content-center align-center"
          style={{ width: "80%", height: "50vh", alignItems: "center" }}
        >
          <h3>Coming Soon</h3>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
