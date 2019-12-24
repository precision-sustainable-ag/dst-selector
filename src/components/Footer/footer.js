import React from "react";
import {
  Grid,
  Container,
  // Button,
  // List,
  // ListItem,
  // ListItemText,
  // Typography,
  Link,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import { width } from "@material-ui/system";
// import Helper from "./helper";

const useStyles = makeStyles(theme => ({
  footer: {
    position: `absolute`,
    bottom: 0,
    backgroundColor: `#598445`,
    width: `100%`,
    height: `5%`,
    maxHeight: "5%"
  },
  textButton: {},

  surface: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
}));

function Footer() {
  const classes = useStyles();
  // const year = new Date().getFullYear();
  return (
    // <footer className={classes.footer}>
    //   <Container maxWidth="xl">
    //     <Grid container alignItems="center">
    //       <Box flexGrow={1}>
    // <p>
    // Disclaimer: Actual cover crop performance may vary. Consult an{" "}
    // <a href="http://placehold.it/1000x1000" style={{ color: "#fff" }}>
    //   NRCS Extension Educator
    // </a>{" "}
    // for detailed guidance.
    // </p>
    //       </Box>

    //       <Box>
    // <Link
    //   href="https://open-source.org/"
    //   style={{ paddingRight: "50px", color: "#000" }}
    // >
    //   OPEN SOURCE
    // </Link>
    // <Link
    //   href="https://google.com/"
    //   style={{ paddingRight: "50px", color: "#000" }}
    // >
    //   CONTACT US
    // </Link>
    // <Link
    //   href="https://google.com"
    //   style={{ paddingRight: "50px", color: "#000" }}
    // >
    //   2019
    // </Link>
    //       </Box>
    //     </Grid>
    //   </Container>
    // </footer>
    <MDBFooter
      className="font-small pt-4 fixed-bottom"
      style={{ backgroundColor: `#598445` }}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            {/* <h5 className="title">Footer Content</h5> */}
            <p>
              Disclaimer: Actual cover crop performance may vary. Consult an{" "}
              <a href="http://placehold.it/1000x1000" style={{ color: "#fff" }}>
                NRCS Extension Educator
              </a>{" "}
              for detailed guidance.
            </p>
          </MDBCol>
          <MDBCol md="4" className="offset-md-2">
            <Link
              href="https://open-source.org/"
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
      {/* <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div> */}
    </MDBFooter>
  );
}

export default Footer;
