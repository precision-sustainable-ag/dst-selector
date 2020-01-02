import React from "react";
import { Link } from "@material-ui/core";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import "../../styles/header.css";
import "../../styles/footer.css";

function Footer() {
  return (
    <MDBFooter className="primaryFooter font-small pt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            {/* <h5 className="title">Footer Content</h5> */}
            <p>
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
            </p>
          </MDBCol>
          <MDBCol md="4" className="offset-md-2 rightSideFooterLinks">
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
            <Link
              href="https://google.com"
              style={{ paddingRight: "50px", color: "#000" }}
            >
              2019
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;
