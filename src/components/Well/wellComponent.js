import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../styles/wellComponent.css";
// import DoneIcon from "@material-ui/icons/Done";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ListIcon from "@material-ui/icons/List";
import PrintIcon from "@material-ui/icons/Print";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBJumbotron,
  MDBCardTitle,
  // MDBBtn,
  // MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDataTable,
  MDBModal,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";
import "../../styles/listViewComponent.css";
import { List, arrayMove } from "react-movable";

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
  // ButtonGroup,
  // SnackBarMessage,
  // Popper,
  Chip,
  Tooltip,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Card,
  CardContent,
  CardMedia,
  Box
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { cloudIcon } from "../../shared/constants.js";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

    const hdr2 = new Headers();
    hdr2.append("Authorization", "Bearer keywdZxSD9AC4vL6e");
    fetch(
      "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?maxRecords=300&filterByFormula=NOT(SWITCH({Cover Crop Name},'__Open Discussion Row','Ok hopefully he answers me soon.'))",
      {
        headers: hdr2
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.records);
        // console.log(data);

        this.setState({
          cropData: data.records
        });
      });

    this.state = {
      progress: 0,
      address: "",
      markers: [[39.03, -76.92]],
      // markers: [[35.76422, 78.69976]],
      showAddressChangeBtn: false,
      allGoals: [],
      cropData: [],
      selectedCrops: [],
      // selectedGoals: [
      //   "Lasting residue",
      //   "Nitrogen scavenging",
      //   "Prevent soil erosion"
      // ],
      selectedGoals: [],
      zoom: 13,
      addressVerified: false,
      snackOpen: false,
      snackVertical: "bottom",
      snackHorizontal: "center",
      snackMessage: "",
      modalOpen: false,
      modalSize: "lg", //sm,md,lg,fluid
      modalBody: {},
      addToCartBtnText: "add to list",
      zoneText: "0"
    };
    // this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    // set progress into local storage for the header
    this.setLocalStorage("stepperState", this.state);
    // connect to airtable api -- CURRENTLY USING JSONBIN!
    // TODO: Change jsonbin api to a more stable api source

    // const hdrs = new Headers();
    // hdrs.append("Content-Type", "application/json");
    // hdrs.append(
    //   "secret-key",
    //   "$2b$10$cB.vdtYXdwSORs8uKPq9.uWi1vLDspYmJoHamkfLZxiwvZHsswg4m"
    // );

    const hdr2 = new Headers();
    hdr2.append("Authorization", "Bearer keywdZxSD9AC4vL6e");
    // fetch('https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crops%20Data?api_key=keywdZxSD9AC4vL6e')
    // .then((resp) => resp.json())
    // .then(data => {
    //   console.log(data);
    // }
    //     // this.setState({ items: data.records.crover }
    //       );
    // })

    fetch(
      "https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300",
      {
        headers: hdr2
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data.records.fields);
        // console.log(data);
        this.setState({
          allGoals: data.records
        });
      });

    // fetch("https://api.jsonbin.io/b/5daab0ecee19b1311aa10fcf/latest", {
    //   headers: hdrs
    // })
    //   .then(resp => resp.json())

    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       cropData: result.items
    //     });
    //   });
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

  addCropToBasket = (cropId, cropName, btnId) => {
    let container = document.getElementById(btnId);
    let selectedCrops = {};
    let toAdd = false;
    var cropArray = [];
    selectedCrops["id"] = cropId;
    selectedCrops["cropName"] = cropName;
    selectedCrops["btnId"] = btnId;
    cropArray = selectedCrops;
    // change the UI
    if (container.classList.contains("activeCartBtn")) {
      // change text back to 'add to list' and remove element from state

      if (document.getElementById(btnId).textContent === "ADDED") {
        container.querySelector(".MuiButton-label").innerHTML = "ADD TO LIST";
        container.classList.remove("activeCartBtn");
        toAdd = false;
      } else toAdd = true;

      // this.state.selectedCrops.splice(x, 1);
      // get index of the element
    } else {
      // change text to 'added' and add element to state
      console.log(document.getElementById(btnId).textContent);
      if (container.textContent === "ADD TO LIST") {
        container.querySelector(".MuiButton-label").innerHTML = "ADDED";
        container.classList.add("activeCartBtn");
        toAdd = true;
      } else toAdd = false;
    }

    // // check if crop id exists inside state, if yes then remove it

    if (this.state.selectedCrops.length > 0) {
      // let flag = null;
      // let idx = 0;
      var removeIndex = this.state.selectedCrops
        .map(function(item) {
          return item.btnId;
        })
        .indexOf(`${btnId}`);
      if (removeIndex === -1) {
        // element not in array
        this.setState({
          selectedCrops: [...this.state.selectedCrops, selectedCrops],
          snackOpen: true,
          snackMessage: `${cropName} Added`
        });
      } else {
        // alert(removeIndex);
        let selectedCropsCopy = this.state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);
        // console.log(selectedCropsCopy);
        this.setState({
          selectedCrops: selectedCropsCopy,
          snackOpen: true,
          snackMessage: `${cropName} Removed`
        });
        // this.state.selectedCrops.splice(removeIndex, 1);
      }
    } else {
      //   // DONE: add the selected crop to state and change the state, show snackbar
      this.setState({
        selectedCrops: [cropArray],
        snackOpen: true,
        snackMessage: `${cropName} Added`
      });
    }

    // this.setState({

    // })
  };

  getRating = ratng => {
    let rating = parseInt(ratng);
    if (rating === 0) {
      return (
        <div className="rating-0">
          <span></span>
        </div>
      );
    } else if (rating === 1) {
      return (
        <div className="rating-1">
          <span></span>
        </div>
      );
    } else if (rating === 2) {
      return (
        <div className="rating-2">
          <span></span>
        </div>
      );
    } else if (rating === 3) {
      return (
        <div className="rating-3">
          <span></span>
        </div>
      );
    } else if (rating === 4) {
      return (
        <div className="rating-4">
          <span></span>
        </div>
      );
    } else if (rating === 5) {
      return (
        <div className="rating">
          <span></span>
        </div>
      );
    }
  };

  getCropImageFromAPI = query => {
    // BUG: API call returns random image and is restricted to 200 calls per hour! Not useful!!

    query = encodeURI(query);
    const headers = new Headers();
    headers.append(
      "Authorization",
      "563492ad6f91700001000001bad1d7b7cf55408ca4d272cea7c088da"
    );
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1&page=1`, {
      headers: headers
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      });
  };
  isExpansionExpanded = true;
  updateSelectedGoals = (newGoalArr, oldIndex, newIndex) => {
    let newGoals = arrayMove(newGoalArr, oldIndex, newIndex);
    this.setState({
      selectedGoals: newGoals,
      snackOpen: true,
      snackMessage: "Goal Priority Changed"
    });
    // this.setState({
    //   snackOpen: true,
    //   snackMessage: "Please select a valid address first!"
    // });
  };

  renderProgress = () => {
    switch (this.state.progress) {
      case 0:
        return (
          <Container fluid className="pl-0 pr-0 pt-0 mt-0">
            <Row>
              <Col className="parentJumbotronRow" size="12">
                <MDBJumbotron fluid style={{ padding: 0 }} className="mb-0">
                  <Col
                    className="text-white text-center parentJumbotronCol"
                    style={{
                      backgroundImage: `url(/images/cover-crop-field.png)`,
                      backgroundSize: "cover"
                    }}
                  >
                    <Col id="mainJumbotronWrapper" className="py-5" style={{}}>
                      <div id="mainJumbotronTextWrapper" style={{}}>
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
            style={{ marginTop: "5em" }}
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
          <Container fluid className="secondStepContainer">
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
                    <div>
                      Your cover crop recommendations will come from the Plant
                      Hardiness{" "}
                      <MDBDropdown className="zoneDrowdown" size="sm">
                        <MDBDropdownToggle caret color="primary">
                          {this.state.zoneText !== undefined
                            ? `${this.state.zoneText}`
                            : "Zone 7"}
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem header>Zones</MDBDropdownItem>
                          <MDBDropdownItem>Zone 2 &amp; 3</MDBDropdownItem>
                          <MDBDropdownItem>Zone 4</MDBDropdownItem>
                          <MDBDropdownItem>Zone 5</MDBDropdownItem>
                          <MDBDropdownItem>Zone 6</MDBDropdownItem>
                          <MDBDropdownItem>Zone 7</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                      NECC Dataset
                    </div>
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
              <Col size="6">
                {/* TODO: Weather Data */}
                <h2>Weather Conditions? </h2>

                <p>{cloudIcon(20, 20)} Historical Weather Data</p>
                <p>Average Frost Dates</p>
                <p>Average Precipitation</p>
                <p>Frost Free Days</p>
              </Col>
            </Row>
          </Container>
        );
      case 3:
        return (
          <Container fluid className="thirdStepContainer">
            <Row className="case3FirstRow" sm={12}>
              <h1>What are your cover cropping goals</h1>
            </Row>
            <Row sm={12} className="case3SecondRow">
              <p>Select upto three. Hover for more information</p>
            </Row>
            <Row className="case3ThirdRow mt-4 mb-4">
              {this.state.allGoals.map((item, key) => {
                // return chips for all goals that dont start with TBD
                if (!item.fields["Cover Crop Goal"].startsWith("TBD")) {
                  return (
                    <Col size="auto">
                      <Tooltip
                        title={
                          <div className="tooltipText">
                            {item.fields["Description"]}
                          </div>
                        }
                        interactive
                        arrow
                      >
                        <Chip
                          label={item.fields["Cover Crop Goal"].toUpperCase()}
                          onClick={() => {
                            // check if state array is empty
                            // get a copy of selected goals
                            const goals = [...this.state.selectedGoals];
                            if (
                              goals.indexOf(item.fields["Cover Crop Goal"]) ===
                              -1
                            ) {
                              // does not exist

                              // set state
                              this.setState({
                                selectedGoals: [
                                  ...this.state.selectedGoals,
                                  item.fields["Cover Crop Goal"]
                                ]
                              });

                              // make it darker on the ui

                              document
                                .getElementById(`chip${key}`)
                                .classList.add("active");
                            } else {
                              // exists, remove it from the state and update the state

                              let index = goals.indexOf(
                                item.fields["Cover Crop Goal"]
                              );
                              goals.splice(index, 1);
                              this.setState({
                                selectedGoals: goals
                              });

                              // make it lighter on the ui

                              document
                                .getElementById(`chip${key}`)
                                .classList.remove("active");
                            }
                            // this.setState({
                            //   sortableGoals: this.listGenerator()
                            // });
                          }}
                          clickable={true}
                          variant="outlined"
                          className={`chip`}
                          id={`chip${key}`}
                          size="medium"
                        />
                      </Tooltip>
                    </Col>
                  );
                } else return "";
              })}
            </Row>
          </Container>
          // TODO: Maintain styling for selectedGoals on prev/next click
        );
      case 4:
        return (
          <div className="container-fluid">
            <div className="row mt-5 mainWrapperRow1">
              <div className="col-md-1 col-sm-12"></div>
              <div className="col-md-10 col-sm-12 mainCol1">
                {/* TODO: Ideal place for a list/grid view toggle */}
              </div>
              <div className="col-md-1 col-sm-12"></div>
            </div>
            <div className="row mt-5 mainWrapperRow2">
              {/* <div className="col-lg-1 hidden-md"></div> */}
              <div className="col-lg-12 col-md-12 mainCol2">
                <div className="row">
                  <div className="col-md-2">
                    <div className="sidebarTitle">
                      <Typography variant="h6">FILTER</Typography>
                    </div>
                    <div className="sidebarContents">
                      <ExpansionPanel
                        className="sideBar"
                        defaultExpanded={this.isExpansionExpanded}
                        onTouchEnd={() => {
                          this.isExpansionExpanded = !this.isExpansionExpanded;
                        }}
                      >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography
                            className="sidePanelCollapsibleHeading"
                            variant="subtitle1"
                          >
                            COVER CROP GOALS
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          {this.state.selectedGoals.length !== 0 ? (
                            <div>
                              <Typography variant="subtitle1" className="mb-2">
                                Goal Priority Order
                              </Typography>
                              <List
                                values={this.state.selectedGoals}
                                onChange={({ oldIndex, newIndex }) =>
                                  this.updateSelectedGoals(
                                    this.state.selectedGoals,
                                    oldIndex,
                                    newIndex
                                  )
                                }
                                renderList={({ children, props }) => (
                                  <ol className="goalsListFilter" {...props}>
                                    {children}
                                  </ol>
                                )}
                                renderItem={({ value, props }) => (
                                  <li {...props}>{value.toUpperCase()}</li>
                                )}
                              />
                              <Typography variant="subtitle1" className="mt-2">
                                Drag to reorder
                              </Typography>
                            </div>
                          ) : (
                            <div>
                              <Typography variant="subtitle1" component="h4">
                                <i>No Goals Selected</i>
                              </Typography>
                            </div>
                          )}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel className="sideBar">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1b-content"
                          id="panel1b-header"
                        >
                          <Typography className="sidePanelCollapsibleHeading">
                            CASH CROP
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          Details for Cash Crops
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel className="sideBar">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1c-content"
                          id="panel1c-header"
                        >
                          <Typography className="sidePanelCollapsibleHeading">
                            COVER CROP FILTERS
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          Cover Crop Filters Details
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </div>
                  <div className="col-md-10 no-padding-left">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="tableheadWrapper">
                          <tr>
                            <th>COVER CROP</th>
                            {this.state.selectedGoals.length !== 0
                              ? this.state.selectedGoals.map((goal, index) => (
                                  <th>{goal.toUpperCase()}</th>
                                ))
                              : ""}
                            <th>GROWTH WINDOW</th>
                            <th>
                              MY LIST
                              <br />
                              {`[${this.state.selectedCrops.length} CROPS]`}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="tableBodyWrapper">
                          {this.state.cropData.map((crop, index) => {
                            if (
                              !crop.fields["Cover Crop Name"].trim() !==
                              "Ok hopefully he answers me soon.".trim()
                            ) {
                              return (
                                <tr>
                                  <td
                                    style={{
                                      display: "flex",
                                      flexDirection: "row"
                                    }}
                                  >
                                    {/* {this.getCropImageFromAPI(
                                      crop.fields["Cover Crop Name"]
                                    )} */}
                                    <img
                                      src="//via.placeholder.com/200x100.pmg?text=Cover+Crop+Image"
                                      alt="placeholder"
                                      style={
                                        {
                                          // flexBasis: "40%"
                                        }
                                      }
                                    />
                                    <div
                                      className="cropDetailsText"
                                      style={{
                                        display: "flex",
                                        flexBasis: "60%",
                                        flexDirection: "column",
                                        paddingLeft: "2em"
                                      }}
                                    >
                                      <span className="cropCategory">
                                        {crop.fields["Family Common Name"]}
                                      </span>
                                      <span className="cropName">
                                        {crop.fields["Cover Crop Name"]}
                                      </span>
                                      <span className="cropScientificName">
                                        {crop.fields["Scientific Name"]}
                                      </span>
                                      <span className="cropDuration">
                                        {crop.fields["Duration"]}
                                      </span>
                                    </div>
                                  </td>
                                  {this.state.selectedGoals.length !== 0
                                    ? this.state.selectedGoals.map(
                                        (goal, index) => (
                                          <td>
                                            {this.getRating(crop.fields[goal])}
                                          </td>
                                        )
                                      )
                                    : ""}
                                  <td>GROWTH WINDOW</td>
                                  <td style={{}}>
                                    <div className="button1">
                                      <LightButton
                                        id={`cartBtn${index}`}
                                        style={{
                                          borderRadius: "0px",
                                          width: "130px"
                                        }}
                                        onClick={() => {
                                          this.addCropToBasket(
                                            crop.id,
                                            crop.fields["Cover Crop Name"],
                                            `cartBtn${index}`
                                          );
                                        }}
                                      >
                                        ADD TO LIST
                                      </LightButton>
                                    </div>
                                    <br />
                                    <div className="button2">
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          this.setState({
                                            modalOpen: true,
                                            modalBody: crop.fields
                                          });
                                        }}
                                      >
                                        View Crop Details
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            } else return "";
                          })}
                        </tbody>
                      </table>
                      {/* <MDBDataTable striped hover data={this.data} /> */}
                    </div>

                    <div className="cropGoals"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return "non handled case";
    }
  };

  isValid = () => {
    // check if it is progress no. 3
    if (this.state.progress === 3) {
      // change logic from atleast to atmost
      // check if a̶t̶l̶e̶a̶s̶t̶ atmost 3 goals have been selected
      if (this.state.selectedGoals.length > 3) {
        return true;
      } else return false;
    } else return false;
  };
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
              disabled={this.isValid()}
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

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  showModal = () => {
    return (
      <MDBModal
        isOpen={this.state.modalOpen}
        size={this.state.modalSize}
        toggle={() => this.toggleModal()}
      >
        <MDBModalHeader
          className="modalHeader"
          toggle={() => this.toggleModal()}
        ></MDBModalHeader>
        <MDBModalBody className="col-12">
          {Object.keys(this.state.modalBody).length > 0 ? (
            <div className="modalBodyHeader">
              <Box width="100%">
                <Card style={{ display: "flex" }}>
                  <div
                    className="classDetails"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <CardContent style={{ flex: "1 0 auto" }}>
                      <Typography component="h5" variant="h5">
                        {this.state.modalBody["Cover Crop Name"]}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {this.state.modalBody["Family Common Name"]}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {this.state.modalBody["Duration"]}
                      </Typography>
                    </CardContent>
                    <div style={{}}></div>
                  </div>
                  <CardMedia
                    style={{ width: 151 }}
                    className=""
                    image="/images/temp.jpg"
                    title="Live from space album cover"
                  />
                  <CardMedia
                    style={{ width: 151 }}
                    className=""
                    image="/images/temp.jpg"
                    title="Live from space album cover"
                  />
                  <CardMedia
                    style={{ width: 151 }}
                    className=""
                    image="/images/temp.jpg"
                    title="Live from space album cover"
                  />
                </Card>
                <div
                  className="buttonStripe"
                  style={{
                    width: "100%",
                    //height: "50px",
                    backgroundColor: "#2d7b7b",
                    display: "flex"
                  }}
                >
                  <div className="leftSideModalBtns" style={{ flexGrow: 2 }}>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<GroupWorkIcon />}
                      aria-label={`Plant Hardiness Zone ${this.state.zoneText} Dataset`}
                    >
                      {`Plant Hardiness Zone ${this.state.zoneText} Dataset`}
                    </Button>
                  </div>
                  <div className="midSideModalBtns" style={{ flexGrow: 0 }}>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<PhotoLibraryIcon />}
                      aria-label={`View Photos`}
                    >
                      {`View Photos`}
                    </Button>
                  </div>
                  <div className="semiMidSideModalBtns" style={{ flexGrow: 1 }}>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                    >
                      Download:
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<PictureAsPdfIcon />}
                      aria-label={`Download as pdf`}
                    >
                      {`PDF`}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<ListIcon />}
                      aria-label={`Download as spreadsheet`}
                    >
                      {`SPREADSHEET`}
                    </Button>
                  </div>
                  <div className="rightSideModalBtns">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        color: "white"
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<PrintIcon />}
                      aria-label={`Print this information`}
                    >
                      {`PRINT`}
                    </Button>
                  </div>

                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                </div>
                <div className="mainModalContentWrapper row mt-4">
                  <div className="col-6">
                    <div className="mainModalContentWrapperLeftHead row">
                      <div className="col-12">
                        <div className="row modalBodyLeftHead">
                          <div className="col-6">
                            <Typography variant="h6">
                              Cover Crop Uses
                            </Typography>
                          </div>
                          <div
                            className="col-6"
                            style={{
                              color: "#969696",
                              textAlign: "right"
                            }}
                          >
                            <Typography variant="caption">
                              (Source : NRCS Plant Guide)
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mainModalContentWrapperLeftBody row mt-4"></div>
                    <div className="col-12">
                      <Typography variant="body1">
                        {this.state.modalBody[""]}
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque id accumsan turpis, at commodo lectus.
                          Donec sit amet porta odio. Etiam tempus lacus enim,
                          vitae euismod odio fermentum eget. Ut nisl quam,
                          tincidunt ac tellus cursus, scelerisque feugiat quam.
                          Integer faucibus porttitor ante, sed venenatis mi
                          finibus in. Vestibulum ante ipsum primis in faucibus
                          orci luctus et ultrices posuere cubilia Curae; Integer
                          ac feugiat massa.
                        </p>

                        <p>
                          Ut eu elit a lorem viverra efficitur. Mauris faucibus
                          nulla vitae mi maximus ultrices. Ut aliquet augue quis
                          ligula pellentesque tincidunt. Sed faucibus, lorem
                          quis viverra fermentum, diam sapien tempor ex, vel
                          auctor lacus orci quis nisi. Vestibulum et urna est.
                          Praesent vel nibh tincidunt, finibus felis rhoncus,
                          consequat metus. Class aptent taciti sociosqu ad
                          litora torquent per conubia nostra, per inceptos
                          himenaeos. Vestibulum faucibus, enim et faucibus
                          fringilla, libero felis laoreet ex, id accumsan eros
                          sem eu magna. Integer at eros ac mi dictum cursus.
                        </p>
                      </Typography>
                    </div>
                  </div>
                  <div className="col-6">
                    <ExpansionPanel className="modalSideBar">
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Agronimic
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        Agronomic data
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2b-content"
                        id="panel2b-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Environmental Tolerance
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        Environmental Tolerance data
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2c-content"
                        id="panel2c-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Soil Conditions
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        Soil Conditions data
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Growth
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>Growth data</ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2e-content"
                        id="panel2e-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Planting &amp; Termination
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        Planting and termination data
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2f-content"
                        id="panel2f-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Grazers &amp;Pollinators
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>data</ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2g-content"
                        id="panel2g-header"
                      >
                        <Typography className="modalSidePanelCollapsibleHeading">
                          Pests &amp; Disease
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>data</ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
              </Box>
            </div>
          ) : (
            ":("
          )}
        </MDBModalBody>
      </MDBModal>
    );
  };
  render() {
    return (
      <div className="" style={{ width: "100%", minHeight: "50vh" }}>
        {this.renderProgress()}

        {this.state.progress === 0 || this.state.progress >= 4
          ? ""
          : this.progressBar()}

        {this.snackBar()}
        {this.showModal()}
      </div>
    );
  }
}
