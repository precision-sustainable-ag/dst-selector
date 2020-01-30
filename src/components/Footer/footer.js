import React from "react";
import { Link } from "@material-ui/core";

// import "../../styles/header.css";
import "../../styles/footer.scss";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <footer className="primaryFooter">
      <div className="leftSideText">
        Disclaimer: Actual cover crop performance may vary. Consult your local{" "}
        <a
          className="footerLink"
          href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
          style={{
            color: "#fff"
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          NRCS field office
        </a>
        ,{" "}
        <a
          href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
          className="footerLink"
          style={{
            color: "#fff"
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cooperative Extension Service office
        </a>{" "}
        , or{" "}
        <a
          href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
          className="footerLink"
          style={{
            color: "#fff"
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Conservation District
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
        <Link style={{ paddingRight: "50px", color: "#000" }}>
          {currentYear}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
