import React from "react";
import { Grid, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@material-ui/system";
// import Helper from "./helper";

const useStyles = makeStyles(theme => ({
  footer: {
    position: `absolute`,
    bottom: 0,
    backgroundColor: `rgba(0,0,0,0.1)`,
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
        <Grid container className={classes.surface}>
          <Grid item md={2}>
            <p>
              2108 Plant Sciences Bldg University of Maryland College Park MD
              20742
            </p>
          </Grid>
          <Grid
            item
            md={10}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <Button color="primary">Our Sponsors</Button>
            </Grid>
            <Grid item>
              <Button color="primary">Contact Us</Button>
            </Grid>
            <Grid item>
              <Button color="primary">Subscribe</Button>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid item>
            <p>
              Copyright © {year} · All Rights Reserved · Northeast Cover Crops
              Council
            </p>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
