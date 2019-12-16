import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../styles/wellComponent.css";
// import LCG from "leaflet-control-geocoder";
// import icon from "leaflet/dist/images/marker-icon.png";
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
  SnackBarMessage
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   }
// }));
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

// const [state, setState] = React.useState({
//   snackOpen: false,
//   snackVertical: "top",
//   snackHorizontal: "center"
// });

export default class WellComponent extends Component {
  myMap = React.createRef();

  constructor() {
    super();
    this.state = {
      progress: 0,
      address: "Enter Address",
      markers: [[35.78658905, -78.67144915505475]],
      showAddressChangeBtn: false,
      zoom: 13,
      addressVerified: false,
      snackOpen: false,
      snackVertical: "bottom",
      snackHorizontal: "center",
      snackMessage: ""
    };
  }

  componentDidMount() {}

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
        this.setState({
          address: latlng,
          addressVerified: true
        });
        // let latlng = data.results.map((latlng) => {

        // })
      });
  };
  addMarker = e => {
    const { markers } = this.state;
    markers.pop();
    markers.push(e.latlng);
    this.setState({ markers });
    console.log(markers[0]);
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
          this.setState({
            markers: [[data[0].lat, data[0].lon]],
            zoom: 15,
            addressVerified: true
          });
        } else {
          this.setState({
            address: "Please complete the address",
            addressVerified: false
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
          <Grid
            container
            align="center"
            justify="center"
            direction="column"
            style={{
              backgroundImage: `url(/images/cover-crop-field.jpg)`,
              backgroundSize: "cover",
              height: "75vh",
              backgroundRepeat: "no-repeat"
            }}
          >
            <Grid
              item
              style={{
                backgroundColor: "rgba(240,247,235,0.8)",
                width: "90%",
                margin: "0 auto",
                textAlign: "",
                padding: "6%"
              }}
            >
              <h1>Welcome to the NECCC Cover Crop Decision Support Tool </h1>
              <p>
                You are currently interacting with a Beta version of the Cover
                Crop DSTs. The purpose of this interaction is so that we may
                gather feedback about the usability and usefulness of these
                tools.
              </p>
              <p>
                The cover crop data you will see has been created by the NECCC
                Data Verification Team of cover crop experts, the original MCCC
                species selector tool, a seeding rate calculator developd by
                NRCS NY, and several other data sources. Please note: these data
                are still being finalized by NECCC teams for each of the plant
                hardiness zones. The data shown are a preview and are yet to be
                finalized.{" "}
              </p>{" "}
              <p style={{ fontWeight: "bold" }}>
                {" "}
                Thank you for your time and consideration. We look forward to
                your feedback and hope to build a pleasant cover crop tool
                experience for you to effectively select and manage your cover
                crops.
              </p>
            </Grid>
            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item style={{ marginTop: "2%" }} md={4}>
                <LightButton
                  onClick={() => {
                    this.setWellProgress(1);
                  }}
                >
                  NEXT
                </LightButton>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
          </Grid>
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
                  <FormControl variant="outlined" style={{ width: "30%" }}>
                    <InputLabel id="demo-simple-select-outlined-label" disabled>
                      Zone
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
                    style={{ width: "30%" }}
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
                  style={{ height: "100%" }}
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

            <Grid container style={{ marginTop: "2%", width: "100%" }}>
              <Grid item md={3}></Grid>
              <Grid item md={6}>
                <LightButton
                  onClick={() => {
                    this.setWellProgress(0);
                  }}
                >
                  Back
                </LightButton>
                <LightButton
                  onClick={() => {
                    this.setWellProgress(2);
                  }}
                  style={{
                    marginLeft: "5px"
                  }}
                >
                  NEXT
                </LightButton>
              </Grid>
              <Grid item md={3} style={{ textAlign: "right" }}>
                <div className="progress">
                  <div className="progress-track"></div>

                  <div
                    id="step1"
                    className="progress-step"
                    style={
                      this.state.progress !== 1
                        ? { backgroundColor: "gray", color: "black" }
                        : { backgroundColor: "green" }
                    }
                  >
                    Step One
                  </div>

                  <div
                    id="step2"
                    className="progress-step"
                    style={
                      this.state.progress !== 2
                        ? { backgroundColor: "gray", color: "black" }
                        : { backgroundColor: "green" }
                    }
                  >
                    Step Two
                  </div>

                  <div
                    id="step3"
                    className="progress-step"
                    style={
                      this.state.progress !== 3
                        ? { backgroundColor: "gray", color: "black" }
                        : { backgroundColor: "green" }
                    }
                  >
                    Step Three
                  </div>

                  <div
                    id="step4"
                    className="progress-step"
                    style={
                      this.state.progress !== 4
                        ? { backgroundColor: "gray", color: "black" }
                        : { backgroundColor: "green" }
                    }
                  >
                    Last Step
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        );
      case 2:
        return "Step 3";
      default:
        return "non handled case";
    }
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.renderProgress()}
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
      </div>
    );
  }
}
