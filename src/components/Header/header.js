import React, { Component } from "react";

import "../../styles/header.css";

import { Button } from "@material-ui/core";

import { DateComponent } from "./dateComponent";
import { GreenBarComponent } from "../GreenBar/greenBarComponent";

// const flexContainer = {
//   display: "flex",
//   flexDirection: "row",
//   padding: 0
// };

class Header extends Component {
  index;
  // constructor(props) {
  //   super(props);
  // }

  progressInterval;
  // BUG(Rohit Bandooni): Responsiveness, breakpoints have not been set
  // BUG(Rohit Bandooni): logo cropping on smaller screens
  // TODO: Alternative for navigation? with hamberger menu ?

  setProgressBackground = () => {
    this.progressInterval = setInterval(() => {
      var a = localStorage.getItem("stepperState");
      a = JSON.parse(a);
      // console.log(a.progress);
      if (a === "stepperState" || a === "") {
        this.setState({
          progress: 2
        });
      } else {
        if (!isNaN(a.progress)) {
          this.setState({
            progress: 2
          });
        }
      }
      if (this.state.progress) {
        document
          .getElementsByClassName(`itemButton${this.state.progress}`)[0]
          .classList.add("active");
      }
      this.setState({
        wellState: a
      });
      // console.log(this.progressInterval);
    }, 100);
    return this.progressInterval;
  };

  componentDidMount() {
    this.setProgressBackground();
  }
  componentWillUnmount() {
    clearTimeout(this.progressInterval);
  }
  render() {
    // const logo = {
    //   width: "100%",
    //   height: "80px",
    //   backgroundSize: "cover",
    //   backgroundImage: `url(${this.props.logoPath})`
    // };
    return (
      // <header>
      //   <Grid container maxWidth="xl">
      //     {/* This banner is good for desktop sizes, need something different for mobile, or probably ged rid of the borders */}
      //     <div id="banner">
      // <ul>
      //   <li>
      //     <a href="">ABOUT</a>
      //   </li>
      //   <li>
      //     <a href="">NECCC</a>
      //   </li>
      //   <li>
      //     <a href="">USDA NRCS</a>
      //   </li>
      //   <li>
      //     <a href="">NE SARE</a>
      //   </li>
      //   <li>
      //     <a href="">HELP</a>
      //   </li>
      //   <li>
      //     <a href="">FEEDBACK</a>
      //   </li>
      // </ul>
      //     </div>

      //     <Grid container direction="row" alignItems="center">
      //       <Grid item md={3} sm={12} className="logoGrid">
      //         <Grid item md={12} style={logo}></Grid>
      //       </Grid>
      //       <Grid
      //         item
      //         md={3}
      //         className="dateGrid"
      //         style={{ paddingLeft: "1em" }}
      //       >
      //         <DateComponent />
      //       </Grid>
      //     </Grid>
      //     <div style={{ padding: "15px" }}></div>
      //     <List component="nav" style={flexContainer}>
      //       <ListItem button className="listitemButton itemButton1">
      //         <ListItemText
      //           disableTypography
      //           primary={
      //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
      //               COVER CROP EXPLORER
      //             </Typography>
      //           }
      //         />
      //       </ListItem>
      //       <ListItem button className="listitemButton itemButton2">
      //         <ListItemText
      //           disableTypography
      //           primary={
      //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
      //               SPECIES SELECTOR
      //             </Typography>
      //           }
      //         />
      //       </ListItem>
      //       <ListItem button className="listitemButton itemButton3">
      //         <ListItemText
      //           disableTypography
      //           primary={
      //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
      //               MIX MAKER
      //             </Typography>
      //           }
      //         />
      //       </ListItem>
      //       <ListItem button className="listitemButton itemButton4">
      //         <ListItemText
      //           disableTypography
      //           primary={
      //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
      //               SEED RATE CALCULATOR
      //             </Typography>
      //           }
      //         />
      //       </ListItem>
      //       <ListItem button className="listitemButton itemButton5">
      //         <ListItemText
      //           disableTypography
      //           primary={
      //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
      //               MY COVER CROP LIST
      //             </Typography>
      //           }
      //         />
      //       </ListItem>
      //     </List>
      //   </Grid>
      //   <GreenBarComponent {...this.state} />
      // </header>
      <header>
        <div className="topHeader">
          <ul>
            <li>
              <Button>ABOUT</Button>
            </li>
            <li>
              <Button>NECCC</Button>
            </li>
            <li>
              <Button>USDA NRCS</Button>
            </li>
            <li>
              <Button>NE SARE</Button>
            </li>
            <li>
              <Button>HELP</Button>
            </li>
            <li>
              <Button>FEEDBACK</Button>
            </li>
          </ul>
        </div>
        <div className="bottomHeader">
          <section>
            <div className="logoContainer">
              <img alt="Logo" src={this.props.logoPath}></img>
            </div>
            <div>
              <DateComponent />
            </div>
          </section>
          <ul>
            {/* <li> */}
            <Button size="large" className="listitemButton itemButton1">
              COVER CROP EXPLORER
            </Button>
            {/* </li> */}
            {/* <li className="active"> */}
            <Button size="large" className="listitemButton itemButton2">
              SPECIES SELECTOR
            </Button>
            {/* </li> */}
            {/* <li> */}
            <Button size="large" className="listitemButton itemButton3">
              MIX MAKER
            </Button>
            {/* </li> */}
            {/* <li> */}
            <Button size="large" className="listitemButton itemButton4">
              SEED RATE CALCULATOR
            </Button>
            {/* </li> */}
            {/* <li> */}
            <Button size="large" className="listitemButton itemButton5">
              MY COVER CROP LIST
            </Button>
            {/* </li> */}
          </ul>
        </div>
        <GreenBarComponent {...this.state} />
      </header>
    );
  }
}

export default Header;
