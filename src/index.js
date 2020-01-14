import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Store, { Context } from "./store/Store";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./styles/progressBar.css";
import Footer from "./components/Footer/footer";

const withFooter = WrappedComponent => () => [
  <WrappedComponent key="1" />,
  <Footer key="2" />
];

const Wrapper = () => (
  <Store>
    <App />
  </Store>
);

const WrapperWithFooter = withFooter(Wrapper);

ReactDOM.render(<WrapperWithFooter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
