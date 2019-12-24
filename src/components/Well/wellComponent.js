import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../styles/wellComponent.css";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBJumbotron,
  MDBCardTitle,
  MDBBtn,
  MDBIcon
} from "mdbreact";
/* Since we are not using redux here, all our state variables are local state variables by default ( local to the component).
   we would be putting all the state data to our local storage once the steps are completed and access them when required
   another benefit of this would be tha tif the user returns in the future, they might not need to fill up everything and we can 
   show a button to skip all if this (as we would already have their data into the local storage)
*/

/*
Bug List:
1. If user clicks the Map component and the lat,long from open street maps does not contain zip, our API calls break for getting zone info!
2. ...
*/
import {
  Button,
  Grid,
  GridList,
  GridListTile,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  ButtonGroup,
  SnackBarMessage,
  Popper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const LightButton = withStyles({
  root: {
    backgroundColor: "#e3f2f4",
    borderRadius: "20px",
    color: "#000",
    padding: "10px 20px 10px 20px",
    "&:hover": {
      backgroundColor: "#48a8ab",
      color: "#fff"
    }
  }
})(Button);

export default class WellComponent extends Component {
  myMap = React.createRef();

  constructor() {
    super();

    this.state = {
      progress: 0,
      address: "Enter Address",
      markers: [[39.03, -76.92]],
      showAddressChangeBtn: false,
      zoom: 13,
      addressVerified: false,
      snackOpen: false,
      snackVertical: "bottom",
      snackHorizontal: "center",
      snackMessage: ""
    };
  }

  componentDidMount() {
    this.setLocalStorage("stepperState", this.state);
    // set progress into local storage for the header
  }

  setLocalStorage(stateObj) {
    localStorage.setItem("stepperState", JSON.stringify(stateObj));
  }

  //   fetch(`https://httpbin.org/get`,{
  //     method: `GET`,
  //     headers: {
  //         'authorization': 'BaseAuth W1lcmxsa='
  //     }
  // }).then((res)=>{
  //     if(res.ok) {
  //         return res.json();
  //     }
  // }).then((res)=>{
  //     console.log(res); // It is like final answer of XHR or jQuery Ajax
  // })

  queryGEORevAPI = (lat, lon) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        method: "GET"
      }
    )
      .then(ret => {
        if (ret.ok) {
          return ret.json();
        }
      })
      .then(data => {
        let latlng = data.display_name;
        // console.log(data.address.postcode);
        // check https://phzmapi.org/[zip].json to map zone with zip probably also restricting the zips?
        this.setZoneState(data.address.postcode);
        this.setState({
          address: latlng,
          addressVerified: true
        });
        // let latlng = data.results.map((latlng) => {

        // })
      });
  };

  setZoneState = zip => {
    console.log(zip);
    fetch(`https://phzmapi.org/${zip}.json`, {
      method: "GET"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        let zone = 0;
        if (data !== null && data !== undefined) {
          if (data.zone.length > 1) {
            //  strip everything except the first char and covert it to int
            zone = data.zone.charAt(0);
          } else zone = data.zone;
          return (zone = parseInt(zone));
        } else {
          return 7;
        }
      })
      .then(zone => {
        // check if zone is in the NECCC range else set a default
        if (zone <= 7 && zone > 1) {
          if (zone === 2 || zone === 3) {
            this.setState({
              zoneText: "Zone 2 & 3"
            });
          } else {
            this.setState({
              zoneText: `Zone ${zone}`
            });
          }
        } else {
          this.setState({
            zoneText: "Zone 7"
          });
        }
      });
  };

  addMarker = e => {
    const { markers } = this.state;
    markers.pop();
    markers.push(e.latlng);
    this.setState({ markers });
    // console.log(markers[0]);
    let lon = markers[0].lng;
    let lat = markers[0].lat;
    this.queryGEORevAPI(lat, lon);
  };
  handleSnackClose = () => {
    this.setState({ snackOpen: false, snackMessage: "" });
  };
  setWellProgress(index) {
    if (index === 2) {
      // validate address before proceeding to step 3
      if (this.state.addressVerified) {
        // if address has been verified then go to next step else throw error
        this.setState({
          progress: index
        });
      } else {
        this.setState({
          snackOpen: true,
          snackMessage: "Please select a valid address first!"
        });
      }
    } else {
      this.setState({
        progress: index
      });
    }

    console.log(index);
  }
  isParent() {
    if (this.state.progress === 0) return true;
    else return false;
  }
  handleMapClick = event => {
    const { lat, long } = event.latlng;
    console.log(`Clicked at ${lat}, ${long}`);
  };

  handleAddressChangeByText = event => {
    this.setState({
      address: event.target.value,
      showAddressChangeBtn: true
    });
  };

  getZipByLatLong = () => {};
  updateAddressOnClick = () => {
    // update the new text address from state to map with a new marker!

    // get currect address from state
    var q = this.state.address;
    // https://nominatim.openstreetmap.org/search/?q=1139%20crab%20orchard%20drive&format=json
    fetch(`https://nominatim.openstreetmap.org/search/?q=${q}&format=json`, {
      method: "GET"
    })
      .then(ret => {
        if (ret.ok) {
          return ret.json();
        }
      })
      .then(data => {
        console.log(data);
        if (data.length === 1) {
          // th;
          this.setState({
            markers: [[data[0].lat, data[0].lon]],
            zoom: 15,
            addressVerified: true,
            address: data[0].display_name
          });
        } else {
          this.setState({
            address: "",
            addressVerified: false,
            snackOpen: true,
            snackMessage: "Please complete the address"
          });
        }

        // let latlng = data.display_name;
        // this.setState({
        //   address: latlng
        // });
        // let latlng = data.results.map((latlng) => {

        // })
      })
      .then(() => {
        this.setState({
          showAddressChangeBtn: false
        });
      });
  };

  renderProgress = () => {
    switch (this.state.progress) {
      case 0:
        return (
          <Container fluid className="pl-0 pr-0 pt-0 mt-0 vh-80">
            <Row>
              <Col>
                <MDBJumbotron fluid style={{ padding: 0 }} className="mb-0">
                  <Col
                    className="text-white text-center"
                    style={{
                      backgroundImage: `url(/images/cover-crop-field.png)`,
                      backgroundSize: "cover"
                    }}
                  >
                    <Col className="py-5" style={{ height: "75vh" }}>
                      <div
                        style={{
                          backgroundColor: "rgba(240,247,235,0.8)",
                          width: "90%",
                          margin: "0 auto",
                          color: "black",
                          padding: "2%"
                        }}
                      >
                        <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                          Welcome to the NECCC Cover Crop Decision Support Tool
                        </MDBCardTitle>
                        <p className="mb-5 text-left">
                          You are currently interacting with a Beta version of
                          the Cover Crop DSTs. The purpose of this interaction
                          is so that we may gather feedback about the usability
                          and usefulness of these tools.
                        </p>
                        <p className="mb-5 text-left">
                          The cover crop data you will see has been created by
                          the NECCC Data Verification Team of cover crop
                          experts, the original MCCC species selector tool, a
                          seeding rate calculator developd by NRCS NY, and
                          several other data sources. Please note: these data
                          are still being finalized by NECCC teams for each of
                          the plant hardiness zones. The data shown are a
                          preview and are yet to be finalized.
                        </p>
                        <p
                          className="mb-5 text-left"
                          style={{ fontWeight: "bold" }}
                        >
                          Thank you for your time and consideration. We look
                          forward to your feedback and hope to build a pleasant
                          cover crop tool experience for you to effectively
                          select and manage your cover crops.
                        </p>
                      </div>
                      <LightButton
                        className="mb-5 mt-5"
                        onClick={() => {
                          this.setWellProgress(1);
                        }}
                      >
                        NEXT
                      </LightButton>
                    </Col>
                  </Col>
                </MDBJumbotron>
              </Col>
            </Row>
          </Container>
        );
      case 1:
        return (
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ marginTop: "5%" }}
          >
            <GridList
              children={2}
              cols={2}
              cellHeight={300}
              style={{
                backgroundColor: "rgba(255,255,255,1)",
                boxShadow: "rgb(136, 136, 136) 0px 0px 1px",
                width: "90%",
                margin: "0 auto",
                textAlign: "",
                padding: "20px"
              }}
            >
              <GridListTile item md={6}>
                <h1>Where is your field located? </h1>
                <p>
                  Select plant hardiness zone for least site specific results.
                  Enter address or zip code for county-level specificity. For
                  more specific results, mark out your field boundary in the
                  map.
                </p>

                {/* <p style={{ fontWeight: "bold" }}>asd</p> */}
                <form noValidate autoComplete="off">
                  <FormControl variant="outlined" style={{ width: "40%" }}>
                    <InputLabel id="demo-simple-select-outlined-label" disabled>
                      Plant Hardiness Zone
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={() => {}}
                      disabled
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Zone 2 and 3</MenuItem>
                      <MenuItem value={1}>Zone 4</MenuItem>
                      <MenuItem value={2}>Zone 5</MenuItem>
                      <MenuItem value={3}>Zone 6</MenuItem>
                      <MenuItem value={4}>Zone 7</MenuItem>
                    </Select>
                  </FormControl>
                  &nbsp;&nbsp;
                  <TextField
                    value={this.state.address === "" ? "" : this.state.address}
                    id="locationAddress"
                    label="Location"
                    variant="outlined"
                    style={{ width: "40%" }}
                    onChange={this.handleAddressChangeByText}
                  />
                  {this.state.showAddressChangeBtn ? (
                    <LightButton
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                      onClick={this.updateAddressOnClick}
                    >
                      Update
                    </LightButton>
                  ) : (
                    ""
                  )}
                </form>
              </GridListTile>
              <GridListTile item md={6}>
                <Map
                  style={{ height: "100%", width: "100%" }}
                  center={this.state.markers[0]}
                  zoom={this.state.zoom}
                  minZoom={3}
                  maxZoom={20}
                  onClick={this.addMarker}
                  ref={this.myMap}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"
                  />
                  {this.state.markers.map((position, idx) => (
                    <Marker key={`marker-${idx}`} position={position}>
                      <Popup>
                        <span>{this.state.address}</span>
                      </Popup>
                    </Marker>
                  ))}
                </Map>
              </GridListTile>
            </GridList>
          </Grid>
        );
      case 2:
        return (
          <Container className="secondStepContainer">
            <Row>
              <Col md="6" sm="12">
                {" "}
                <Row className="case2FirstRow">
                  {/* <MDBCol size="4">.col-4</MDBCol>
              <MDBCol size="4">.col-4</MDBCol>
              <MDBCol size="4">.col-4</MDBCol> */}
                  <Col md="4" sm="12">
                    <Map
                      style={{ width: "100%", height: "100%" }}
                      center={this.state.markers[0]}
                      zoom={this.state.zoom}
                      minZoom={14}
                      maxZoom={20}
                      onClick={this.addMarker}
                      ref={this.myMap}
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"
                      />
                      {this.state.markers.map((position, idx) => (
                        <Marker key={`marker-${idx}`} position={position}>
                          <Popup>
                            <span>{this.state.address}</span>
                          </Popup>
                        </Marker>
                      ))}
                    </Map>
                  </Col>
                  <Col md="8" sm="12">
                    <h2>Location Details</h2>
                    <p>
                      Your cover crop recommendations will come from the Plant
                      Hardiness{" "}
                      {this.state.zoneText !== undefined
                        ? `${this.state.zoneText}`
                        : "Zone 7"}
                      &nbsp; &nbsp; NECCC Dataset
                    </p>
                  </Col>
                  <Col size="12" className="mt-3">
                    <TextField
                      value={this.state.address}
                      style={{ width: "100%" }}
                      label="Location"
                      variant="outlined"
                      disabled
                    ></TextField>
                  </Col>
                  <Col size="12" className="mt-3">
                    <p>
                      Disclaimer: Cover crop recommendations are based omn
                      expert opitions. Your cover crop performance will vary
                      based on location, management, cultivars, and many other
                      variables. Consult an{" "}
                      <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NRCS Extension Expert
                      </a>{" "}
                      for detailed guidance.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col size="6">{/* TODO: Weather Data */}</Col>
            </Row>

            {/* <article className="secondStepContainer">
              <div className="mapContainer">
                <Map
                  style={{ width: "100%", height: "100%" }}
                  center={this.state.markers[0]}
                  zoom={this.state.zoom}
                  minZoom={14}
                  maxZoom={20}
                  onClick={this.addMarker}
                  ref={this.myMap}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"
                  />
                  {this.state.markers.map((position, idx) => (
                    <Marker key={`marker-${idx}`} position={position}>
                      <Popup>
                        <span>{this.state.address}</span>
                      </Popup>
                    </Marker>
                  ))}
                </Map>
              </div>
              <div className="locationDetailsContainer">
                <h2>Location Details</h2>
                <p>
                  Your cover crop recommendations will come from the Plant
                  Hardiness{" "}
                  {this.state.zoneText !== undefined
                    ? `${this.state.zoneText}`
                    : "Zone 7"}
                  &nbsp; &nbsp; NECCC Dataset
                </p>
              </div>
              <div></div>
            </article>
            <article className="belowSecondStepContainer">
              <TextField
                value={this.state.address}
                style={{}}
                label="Location"
                variant="outlined"
                disabled
              ></TextField>
              <div>
                <p>
                  Disclaimer: Cover crop recommendations are based omn expert
                  opitions. Your cover crop performance will vary based on
                  location, management, cultivars, and many other variables.
                  Consult an{" "}
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NRCS Extension Expert
                  </a>{" "}
                  for detailed guidance.
                </p>
              </div>
            </article> */}
          </Container>
        );
      default:
        return "non handled case";
    }
  };
  // handleClose = event => {
  //   const anchorRef = React.useRef(null);
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };
  progressBar = () => {
    return (
      <Container className="progressContainer">
        <Row md="12">
          <Col md="4">
            <LightButton
              onClick={() => {
                this.setWellProgress(this.state.progress - 1);
                this.setLocalStorage(this.state);
              }}
            >
              Back
            </LightButton>
            <LightButton
              style={{ marginLeft: "3px" }}
              onClick={() => {
                this.setWellProgress(this.state.progress + 1);
                this.setLocalStorage(this.state);
              }}
            >
              Next
            </LightButton>
          </Col>
          <Col md="4" className="offset-md-4">
            <div className="progress">
              <div className="progress-track"></div>
              <div
                id="step1"
                className="progress-step"
                style={
                  this.state.progress !== 1
                    ? { backgroundColor: "#f0f7eb", color: "black" }
                    : { backgroundColor: "#8abc62" }
                }
              ></div>

              <div
                id="step2"
                className="progress-step"
                style={
                  this.state.progress !== 2
                    ? { backgroundColor: "#f0f7eb", color: "black" }
                    : { backgroundColor: "#8abc62" }
                }
              ></div>

              <div
                id="step3"
                className="progress-step"
                style={
                  this.state.progress !== 3
                    ? { backgroundColor: "#f0f7eb", color: "black" }
                    : { backgroundColor: "#8abc62" }
                }
              ></div>

              <div
                id="step4"
                className="progress-step"
                style={
                  this.state.progress !== 4
                    ? { backgroundColor: "#f0f7eb", color: "black" }
                    : { backgroundColor: "#8abc62" }
                }
              ></div>
            </div>
          </Col>
        </Row>
        <Row md="12">
          <Col md="4" className="offset-md-8" style={{ textAlign: "center" }}>
            <p>Question {this.state.progress} of 4</p>
          </Col>
        </Row>
      </Container>
      // <Grid container style={{ marginTop: "2%", width: "90%" }}>
      //   <Grid item md={3}></Grid>
      //   <Grid item md={6}>
      //     <LightButton
      //       onClick={() => {
      //         this.setWellProgress(this.state.progress - 1);
      //         this.setLocalStorage(this.state);
      //       }}
      //     >
      //       Back
      //     </LightButton>
      //     <LightButton
      //       onClick={() => {
      //         this.setWellProgress(this.state.progress + 1);
      //         this.setLocalStorage(this.state);
      //       }}
      //       style={{
      //         marginLeft: "5px"
      //       }}
      //     >
      //       NEXT
      //     </LightButton>
      //   </Grid>
      //   <Grid item md={3} style={{ textAlign: "right" }}>
      //     <div className="progress">
      //       <div className="progress-track"></div>

      // <div
      //   id="step1"
      //   className="progress-step"
      //   style={
      //     this.state.progress !== 1
      //       ? { backgroundColor: "#f0f7eb", color: "black" }
      //       : { backgroundColor: "#8abc62" }
      //   }
      // ></div>

      // <div
      //   id="step2"
      //   className="progress-step"
      //   style={
      //     this.state.progress !== 2
      //       ? { backgroundColor: "#f0f7eb", color: "black" }
      //       : { backgroundColor: "#8abc62" }
      //   }
      // ></div>

      // <div
      //   id="step3"
      //   className="progress-step"
      //   style={
      //     this.state.progress !== 3
      //       ? { backgroundColor: "#f0f7eb", color: "black" }
      //       : { backgroundColor: "#8abc62" }
      //   }
      // ></div>

      // <div
      //   id="step4"
      //   className="progress-step"
      //   style={
      //     this.state.progress !== 4
      //       ? { backgroundColor: "#f0f7eb", color: "black" }
      //       : { backgroundColor: "#8abc62" }
      //   }
      // ></div>
      //     </div>
      //   </Grid>
      //   <Grid container style={{ width: "90%", margin: "0 auto" }}>
      //     <Grid item md={9}></Grid>
      //     {/* <Grid item md={6}></Grid> */}
      //     <Grid item md={3} style={{ textAlign: "center" }}>
      //       Question {this.state.progress} of 4
      //     </Grid>
      //   </Grid>
      // </Grid>
    );
  };
  snackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: this.state.snackVertical,
          horizontal: this.state.snackHorizontal
        }}
        key={{
          vertical: this.state.snackVertical,
          horizontal: this.state.snackHorizontal
        }}
        autoHideDuration={5000}
        open={this.state.snackOpen}
        onClose={this.handleSnackClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={this.state.snackMessage}
      />
    );
  };
  render() {
    return (
      <div className="mh-100" style={{ width: "100%" }}>
        {this.renderProgress()}

        {this.state.progress !== 0 ? this.progressBar() : ""}

        {this.snackBar()}
      </div>
    );
  }
}
