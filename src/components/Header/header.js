import React, { useEffect, useContext } from "react";
import { Context } from "../../store/Store";
import "../../styles/header.scss";
import { DateComponent } from "./dateComponent";
import Greenbar from "./Greenbar/Greenbar";
import { cloudIcon } from "../../shared/constants";
import {
  MDBNavbar,
  MDBContainer,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem
} from "mdbreact";
// import { Link, Button } from "@material-ui/core";
const Header = () => {
  const [state, dispatch] = useContext(Context);
  const [collapse, setCollapse] = React.useState(false);
  let isActive = {};

  useEffect(() => {
    console.log("---Header.js started---");

    // check value of progress state

    switch (state.progress) {
      case 0:
        isActive["val"] = 0;
    }

    // document.getElementsByClassName('.nav-toggle')[0].addEventListener
  });
  const toggleClass = (el, className) => el.classList.toggle(className);

  const burgurClick = () => {
    toggleClass(document.querySelector("body"), "nav-open");
  };

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <header>
      <div className="topHeader">
        <div>ABOUT</div>
        <div>NECCC</div>
        <div>USDA NRCS</div>
        <div>NE SARE</div>
        <div>HELP</div>
        <div>FEEDBACK</div>
      </div>
      <div className="midHeader">
        <div className="logoContainer" />
        <div className="dataComponents">
          <span>
            <DateComponent />
          </span>
          <span>
            Weather Today: {cloudIcon(14, 20)} 58 | 31 F
            <i className="fas fa-cloud-rain pl-2"></i> 0.25in
          </span>
        </div>
      </div>
      <div className="bottomHeader">
        <div className={state.progress === 0 ? "active" : ""}>
          COVER CROP EXPLORER
        </div>
        <div className={state.progress === 1 ? "active" : ""}>
          SPECIES SELECTOR
        </div>
        <div className={state.progress === 2 ? "active" : ""}>MIX MAKER</div>
        <div className={state.progress === 3 ? "active" : ""}>
          SEED RATE CALCULATOR
        </div>
        <div className={state.progress === 4 ? "active" : ""}>
          MY COVER CROP LIST
        </div>
      </div>
      {/* <div className="ham-wrapper">
        <div className="nav-toggle" onClick={() => burgurClick()}>
          <div className="ham-icon"></div>
        </div>
        <div className={state.progress === 0 ? "active" : ""}>
          COVER CROP EXPLORER
        </div>
        <div className={state.progress === 1 ? "active" : ""}>
          SPECIES SELECTOR
        </div>
        <div className={state.progress === 2 ? "active" : ""}>MIX MAKER</div>
        <div className={state.progress === 3 ? "active" : ""}>
          SEED RATE CALCULATOR
        </div>
        <div className={state.progress === 4 ? "active" : ""}>
          MY COVER CROP LIST
        </div>
      </div> */}
      {/* <MDBContainer fluid> */}
      <MDBNavbar light className="ham-navWrapper">
        <MDBContainer fluid>
          <MDBHamburgerToggler
            color="#598443"
            id="hamburger1"
            onClick={() => toggleSingleCollapse()}
          />
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav className="ham-nav">
              <MDBNavItem active={state.progress === 0 ? true : false}>
                COVER CROP EXPLORER
              </MDBNavItem>
              <MDBNavItem active={state.progress === 1 ? true : false}>
                SPECIES SELECTOR
              </MDBNavItem>
              <MDBNavItem active={state.progress === 2 ? true : false}>
                MIX MAKER
              </MDBNavItem>
              <MDBNavItem active={state.progress === 3 ? true : false}>
                SEED RATE CALCULATOR
              </MDBNavItem>
              <MDBNavItem active={state.progress === 4 ? true : false}>
                MY COVER CROP LIST
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {/* </MDBContainer> */}
      <Greenbar />
      {state.progress === 0 ? (
        <div className="topBar"></div>
      ) : (
        <div className="topBarMuted"></div>
      )}
    </header>
  );
};

export default Header;

// import React, { Component } from "react";

// import "../../styles/header.css";

// import { Button } from "@material-ui/core";

// import { DateComponent } from "./dateComponent";
// import { GreenBarComponent } from "../GreenBar/greenBarComponent";

// // const flexContainer = {
// //   display: "flex",
// //   flexDirection: "row",
// //   padding: 0
// // };

// class Header extends Component {
//   index;
//   // constructor(props) {
//   //   super(props);
//   // }

//   progressInterval;
//   // BUG(Rohit Bandooni): Responsiveness, breakpoints have not been set
//   // BUG(Rohit Bandooni): logo cropping on smaller screens
//   // TODO: Alternative for navigation? with hamberger menu ?

//   setProgressBackground = () => {
//     this.progressInterval = setInterval(() => {
//       var a = localStorage.getItem("stepperState");
//       a = JSON.parse(a);
//       // console.log(a.progress);
//       if (a === "stepperState" || a === "") {
//         this.setState({
//           progress: 2
//         });
//       } else {
//         if (!isNaN(a.progress)) {
//           this.setState({
//             progress: 2
//           });
//         }
//       }
//       if (this.state.progress) {
//         document
//           .getElementsByClassName(`itemButton${this.state.progress}`)[0]
//           .classList.add("active");
//       }
//       this.setState({
//         wellState: a
//       });
//       // console.log(this.progressInterval);
//     }, 100);
//     return this.progressInterval;
//   };

//   componentDidMount() {
//     this.setProgressBackground();
//   }
//   componentWillUnmount() {
//     clearTimeout(this.progressInterval);
//   }
//   render() {
//     // const logo = {
//     //   width: "100%",
//     //   height: "80px",
//     //   backgroundSize: "cover",
//     //   backgroundImage: `url(${this.props.logoPath})`
//     // };
//     return (
//       // <header>
//       //   <Grid container maxWidth="xl">
//       //     {/* This banner is good for desktop sizes, need something different for mobile, or probably ged rid of the borders */}
//       //     <div id="banner">
//       // <ul>
//       //   <li>
//       //     <a href="">ABOUT</a>
//       //   </li>
//       //   <li>
//       //     <a href="">NECCC</a>
//       //   </li>
//       //   <li>
//       //     <a href="">USDA NRCS</a>
//       //   </li>
//       //   <li>
//       //     <a href="">NE SARE</a>
//       //   </li>
//       //   <li>
//       //     <a href="">HELP</a>
//       //   </li>
//       //   <li>
//       //     <a href="">FEEDBACK</a>
//       //   </li>
//       // </ul>
//       //     </div>

//       //     <Grid container direction="row" alignItems="center">
//       //       <Grid item md={3} sm={12} className="logoGrid">
//       //         <Grid item md={12} style={logo}></Grid>
//       //       </Grid>
//       //       <Grid
//       //         item
//       //         md={3}
//       //         className="dateGrid"
//       //         style={{ paddingLeft: "1em" }}
//       //       >
//       //         <DateComponent />
//       //       </Grid>
//       //     </Grid>
//       //     <div style={{ padding: "15px" }}></div>
//       //     <List component="nav" style={flexContainer}>
//       //       <ListItem button className="listitemButton itemButton1">
//       //         <ListItemText
//       //           disableTypography
//       //           primary={
//       //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
//       //               COVER CROP EXPLORER
//       //             </Typography>
//       //           }
//       //         />
//       //       </ListItem>
//       //       <ListItem button className="listitemButton itemButton2">
//       //         <ListItemText
//       //           disableTypography
//       //           primary={
//       //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
//       //               SPECIES SELECTOR
//       //             </Typography>
//       //           }
//       //         />
//       //       </ListItem>
//       //       <ListItem button className="listitemButton itemButton3">
//       //         <ListItemText
//       //           disableTypography
//       //           primary={
//       //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
//       //               MIX MAKER
//       //             </Typography>
//       //           }
//       //         />
//       //       </ListItem>
//       //       <ListItem button className="listitemButton itemButton4">
//       //         <ListItemText
//       //           disableTypography
//       //           primary={
//       //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
//       //               SEED RATE CALCULATOR
//       //             </Typography>
//       //           }
//       //         />
//       //       </ListItem>
//       //       <ListItem button className="listitemButton itemButton5">
//       //         <ListItemText
//       //           disableTypography
//       //           primary={
//       //             <Typography style={{ fontWeight: "bold", fontSize: "15pt" }}>
//       //               MY COVER CROP LIST
//       //             </Typography>
//       //           }
//       //         />
//       //       </ListItem>
//       //     </List>
//       //   </Grid>
//       //   <GreenBarComponent {...this.state} />
//       // </header>
//       <header>
//         <div className="topHeader">
//           <ul>
//             <li>
//               <Button>ABOUT</Button>
//             </li>
//             <li>
//               <Button>NECCC</Button>
//             </li>
//             <li>
//               <Button>USDA NRCS</Button>
//             </li>
//             <li>
//               <Button>NE SARE</Button>
//             </li>
//             <li>
//               <Button>HELP</Button>
//             </li>
//             <li>
//               <Button>FEEDBACK</Button>
//             </li>
//           </ul>
//         </div>
//         <div className="bottomHeader">
//           <section>
//             <div className="logoContainer">
//               <img alt="Logo" src={this.props.logoPath}></img>
//             </div>
//             <div>
//               <DateComponent />
//             </div>
//           </section>
//           <ul>
//             {/* <li> */}
//             <Button size="large" className="listitemButton itemButton1">
//               COVER CROP EXPLORER
//             </Button>
//             {/* </li> */}
//             {/* <li className="active"> */}
//             <Button size="large" className="listitemButton itemButton2">
//               SPECIES SELECTOR
//             </Button>
//             {/* </li> */}
//             {/* <li> */}
//             <Button size="large" className="listitemButton itemButton3">
//               MIX MAKER
//             </Button>
//             {/* </li> */}
//             {/* <li> */}
//             <Button size="large" className="listitemButton itemButton4">
//               SEED RATE CALCULATOR
//             </Button>
//             {/* </li> */}
//             {/* <li> */}
//             <Button size="large" className="listitemButton itemButton5">
//               MY COVER CROP LIST
//             </Button>
//             {/* </li> */}
//           </ul>
//         </div>
//         <GreenBarComponent {...this.state} />
//       </header>
//     );
//   }
// }

// export default Header;
