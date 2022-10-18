import React, { useContext } from 'react';
import {
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
} from 'mdbreact';
import { Context } from '../../../store/Store';
import '../../../styles/header.scss';

const Navbar = ({ isRoot, setSpeciesSelectorActivationFlag, setmyCoverCropActivationFlag }) => {
  const { state } = useContext(Context);
  const [collapse, setCollapse] = React.useState(false);

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <MDBNavbar light className="ham-navWrapper">
      <MDBContainer fluid>
        <MDBHamburgerToggler
          color="#598443"
          id="hamburger1"
          onClick={() => toggleSingleCollapse()}
        />
        <MDBCollapse isOpen={collapse} navbar>
          <MDBNavbarNav className="ham-nav">
            <MDBNavItem>COVER CROP EXPLORER</MDBNavItem>
            <MDBNavItem
              onClick={setSpeciesSelectorActivationFlag}
              active={isRoot ? (!!state.speciesSelectorActivationFlag) : false}
            >
              SPECIES SELECTOR TOOL
            </MDBNavItem>
            {state.progress >= 5 && (
              <MDBNavItem
                onClick={setmyCoverCropActivationFlag}
                active={
                  !!(state.myCoverCropActivationFlag && window.location.pathname === '/')
                }
              >
                MY COVER CROP LIST
              </MDBNavItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
