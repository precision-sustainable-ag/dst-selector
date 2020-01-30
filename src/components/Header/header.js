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
import { Button } from "@material-ui/core";
import { Redirect, Link, useHistory, NavLink } from "react-router-dom";
// import { Link, Button } from "@material-ui/core";
const Header = () => {
  let history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [collapse, setCollapse] = React.useState(false);
  const [isRoot, setIsRoot] = React.useState(false);
  const [redirectToRoot, setRedirectToRoot] = React.useState(false);
  let isActive = {};

  useEffect(() => {
    console.log("---Header.js started---");

    // check if isRoot

    if (window.location.pathname === "/") {
      setIsRoot(true);
      // setRedirectToRoot(true);
    } else {
      setIsRoot(false);
    }
    // check value of progress state

    switch (state.progress) {
      case 0:
        isActive["val"] = 0;
    }

    // document.getElementsByClassName('.nav-toggle')[0].addEventListener
  }, [state.progress]);
  const toggleClass = (el, className) => el.classList.toggle(className);

  const burgurClick = () => {
    toggleClass(document.querySelector("body"), "nav-open");
  };

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };
  const setmyCoverCropActivationFlag = () => {
    if (window.location.pathname === "/") {
      if (state.progress > 4) {
        dispatch({
          type: "ACTIVATE_MY_COVER_CROP_LIST_TILE",
          data: {
            myCoverCropActivationFlag: true,
            speciesSelectorActivationFlag: false
          }
        });
      }
    } else {
      history.push("/");
    }
  };

  const setSpeciesSelectorActivationFlag = () => {
    // if (state.progress) {
    if (window.location.pathname === "/") {
      console.log("pathname", "/");
      dispatch({
        type: "ACTIVATE_SPECIES_SELECTOR_TILE",
        data: {
          speciesSelectorActivationFlag: true,
          myCoverCropActivationFlag: false
        }
      });
    } else {
      // console.log("pathname", window.location.pathname);
      history.push("/");
      // return <Redirect to="/" />;
    }

    // console.log(window.location.pathname);
    // if (window.location.pathname !== "/") {
    //   setIsRoot(false);
    //   setRedirectToRoot(true);
    //   // return <Redirect to="/" />;
    // } else {
    //   setIsRoot(true);
    //   setRedirectToRoot(false);
    // }
    // }
  };

  return redirectToRoot ? (
    <Redirect to="/" />
  ) : (
    <header>
      <div className="topHeader">
        <Link to="/about" style={{ color: "black" }}>
          {" "}
          <div>ABOUT</div>
        </Link>
        <div onClick={() => window.open("//northeastcovercrops.com")}>
          NECCC
        </div>
        <div
          onClick={() =>
            window.open(
              "//www.nrcs.usda.gov/wps/portal/nrcs/site/national/home/"
            )
          }
        >
          USDA NRCS
        </div>
        <div onClick={() => window.open("//www.northeastsare.org/")}>
          NE SARE
        </div>
        <div>HELP</div>
        <div>FEEDBACK</div>
      </div>
      <div className="midHeader">
        <div
          className="logoContainer"
          onClick={() => window.open("//northeastcovercrops.com")}
          style={{ cursor: "pointer" }}
        />
        <div className="dataComponents">
          <span>
            <DateComponent />
          </span>
          <span>
            Forecast: {cloudIcon(14, 20)} 58 | 31 F
            <i className="fas fa-cloud-rain pl-2"></i> 0.25in
          </span>
        </div>
      </div>
      <div className="bottomHeader">
        <Button
          size="large"
          component={NavLink}
          exact
          to={"/cover-crop-explorer"}
          activeClassName="active"
        >
          COVER CROP EXPLORER
        </Button>
        <Button
          // className={state.speciesSelectorActivationFlag ? "active" : ""}
          className={
            isRoot ? (state.speciesSelectorActivationFlag ? "active" : "") : ""
          }
          onClick={setSpeciesSelectorActivationFlag}
          size="large"
        >
          SPECIES SELECTOR
        </Button>
        <Button
          size="large"
          exact
          component={NavLink}
          to={"/mix-maker"}
          activeClassName="active"
        >
          MIX MAKER
        </Button>
        {/* <Button className={state.progress === 3 ? "active" : ""}> */}
        <Button
          size="large"
          exact
          component={NavLink}
          to={"/seeding-rate-calculator"}
          activeClassName="active"
        >
          SEEDING RATE CALCULATOR
        </Button>
        <Button
          size="large"
          className={state.myCoverCropActivationFlag ? "active" : ""}
          onClick={setmyCoverCropActivationFlag}
        >
          MY COVER CROP LIST
        </Button>
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
              <MDBNavItem
                onClick={() => alert("hey")}
                active={state.progress === 4 ? true : false}
                className={state.myCoverCropActivationFlag ? "active" : ""}
              >
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
