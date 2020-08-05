import React from "react";
import moment from "moment-timezone";
// import "../../styles/header.css";
import "../../styles/footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const now = moment();
  const tzdata = moment.tz.guess();

  const currentMonthYear = now.tz(tzdata).format("MM/YYYY");

  return (
    <footer className="primaryFooter">
      <div className="leftSideText">
        Disclaimer: Actual cover crop performance may vary. Consult your local{" "}
        <a
          className="footerLink"
          href="https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/programs/financial/csp/?&cid=nrcsdev11_000242"
          target="_blank"
          rel="noopener noreferrer"
        >
          NRCS field office
        </a>
        ,{" "}
        <a
          href="https://nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory"
          className="footerLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cooperative Extension Service office
        </a>{" "}
        , or{" "}
        <a
          href="https://www.nacdnet.org/general-resources/conservation-district-directory/"
          className="footerLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conservation District
        </a>{" "}
        for detailed guidance.
      </div>
      <div className="rightSideText">
        {/* <Link
          href="https://opensource.org/docs/osd"
          style={{ paddingRight: "50px" }}
          target="_blank"
        >
          OPEN SOURCE
        </Link> */}
        <a href="/about" style={{ paddingRight: "50px" }}>
          CONTACT US
        </a>
        <a style={{ paddingRight: "50px" }}>Last Updated {currentMonthYear}</a>
      </div>
    </footer>
  );
};

export default Footer;
