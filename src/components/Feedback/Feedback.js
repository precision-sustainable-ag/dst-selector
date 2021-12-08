/*
  This file contains the FeedbackComponent component, helper functions
  The FeedbackComponent page is a static page that shows an airtable form
*/

import React, { useEffect } from "react";
import Header from "../Header/Header";

const FeedbackComponent = (props) => {
  useEffect(() => {
    document.title = "Feedback";
  }, []);
  return (
    <div className="contentWrapper">
      <Header />
      <div className="container-fluid pt-4" style={{ minHeight: "70vh" }}>
        <div
          className="mx-auto d-flex justify-content-center align-center"
          style={{ width: "80%", minHeight: "600px", alignItems: "center" }}
        >
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/shr1UBoR7bqCbNhvW?backgroundColor=yellow"
            frameBorder="0"
            title="iframe"
            style={{
              background: "transparent",
              border: "1px solid #ccc",
              width: "100%",
              height: "733px",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
