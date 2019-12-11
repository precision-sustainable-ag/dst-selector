import React from "react";
import {
  Grid,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@material-ui/system";
// import Helper from "./helper";

const useStyles = makeStyles(theme => ({
  footer: {
    position: `absolute`,
    bottom: 0,
    backgroundColor: `#598445`,
    width: `100%`
  },
  textButton: {},

  surface: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
}));

function Footer() {
  const classes = useStyles();
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Box flexGrow={1}>
            <p>
              Disclaimer: Actual cover crop performance may vary. Consult an{" "}
              <a href="">NRCS Extension Educator</a> for detailed guidance.
            </p>
          </Box>

          <Box>
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
          </Box>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
