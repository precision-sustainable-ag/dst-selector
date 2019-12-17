import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../../styles/header.css";
import {
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { DateComponent } from "./dateComponent";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0
};

class Header extends Component {
  index;
  constructor() {
    super();
  }

  componentDidMount() {
    var a = setTimeout(localStorage.getItem("stepperState"), 3000);
    console.log(a);
  }
  render() {
    const logo = {
      width: "100%",
      height: "80px",
      backgroundSize: "cover",
      backgroundImage: `url(${this.props.logoPath})`
    };
    return (
      <Container maxWidth="xl">
        {/* This banner is good for desktop sizes, need something different for mobile, or probably ged rid of the borders */}
        <div id="banner">
          <ul>
            <li>
              <a href="">ABOUT</a>
            </li>
            <li>
              <a href="">NECCC</a>
            </li>
            <li>
              <a href="">USDA NRCS</a>
            </li>
            <li>
              <a href="">NE SARE</a>
            </li>
            <li>
              <a href="">HELP</a>
            </li>
            <li>
              <a href="">FEEDBACK</a>
            </li>
          </ul>
        </div>

        <Grid container direction="row" alignItems="center">
          <Grid item md={2} className="logoGrid">
            <Grid item md={12} style={logo}></Grid>
          </Grid>
          <Grid item md={3} className="dateGrid" style={{ paddingLeft: "1em" }}>
            <DateComponent />
          </Grid>
        </Grid>
        <div style={{ height: "15px" }}></div>
        <List component="nav" style={flexContainer}>
          <ListItem button className="listitemButton">
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
                  COVER CROP EXPLORER
                </Typography>
              }
            />
          </ListItem>
          <ListItem button className="listitemButton">
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
                  SPECIES SELECTOR
                </Typography>
              }
            />
          </ListItem>
          <ListItem button className="listitemButton">
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
                  MIX MAKER
                </Typography>
              }
            />
          </ListItem>
          <ListItem button className="listitemButton">
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
                  SEED RATE CALCULATOR
                </Typography>
              }
            />
          </ListItem>
          <ListItem button className="listitemButton">
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
                  MY COVER CROP LIST
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Container>
    );
  }
}

export default Header;
