import React from "react";
import { Link } from "@material-ui/core";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import "../../styles/header.css";
import "../../styles/footer.scss";

const Footer = () => {
  return (
    <footer className="primaryFooter">
      <div className="leftSideText">
        Disclaimer: Actual cover crop performance may vary. Consult an{" "}
        <a
          className="footerLink"
          href="http://placehold.it/1000x1000"
          style={{
            color: "#fff"
          }}
        >
          NRCS Extension Educator
        </a>{" "}
        for detailed guidance.
      </div>
      <div className="rightSideText">
        <Link
          href="https://opensource.org/"
          style={{ paddingRight: "50px", color: "#000" }}
        >
          OPEN SOURCE
        </Link>
        <Link
          href="https://google.com/"
          style={{ paddingRight: "50px", color: "#000" }}
        >
          CONTACT US
        </Link>
        <Link style={{ paddingRight: "50px", color: "#000" }}>2019</Link>
      </div>
    </footer>
  );
};

export default Footer;
