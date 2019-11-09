import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Header from "./components/header";
import Body from "./components/body";
import Grid from "@material-ui/core/Grid";
import Navigation from "./components/navigation";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <Grid>
      {/* Our header.js file exports the reusable Header component. 
      It is just a simple Grid based header with logo on the left hand side and typography on the right  */}

      <Header />

      {/* 
      Our Main part of this application would be this Navigation component. It contains code for our main navigation
      It is using a material-ui tab panel for simplicity and ease of use. 
      Each tab contains/would-contain components individually, as required.
      */}

      <Navigation />

      {/* body.js is just a temporary code, that would eventually be replaced by footer.js 
      Until production, this can serve as a playground!!
      */}

      {/* <Body /> */}

      <Footer />
    </Grid>
  );
}

export default App;
