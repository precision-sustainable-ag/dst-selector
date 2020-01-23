import React, { useEffect, useContext } from "react";
import { Context } from "../../../store/Store";
import "../../../styles/header.scss";
import {
  locationIcon,
  zoneIcon,
  GetMonthString
} from "../../../shared/constants";
import { Button, Menu, MenuItem } from "@material-ui/core";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import CloudIcon from "@material-ui/icons/Cloud";

const Greenbar = () => {
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    console.log("---Greeenbar.js mounted---");
  }, []);
  const getAddress = () => {
    if (state.address === "") {
      return "";
    } else {
      let address = state.address.split(",");
      // address = address.split(" ");
      //console.log("address: " + address[1]);
      address = `${address[0]}${address[1]}`;

      address = address.substr(0, 20);

      return (
        <Button>
          {locationIcon(14, 20)}
          &nbsp; {address}
        </Button>
      );
    }
  };

  const getZone = () => {
    if (state.zoneText === "" || parseInt(state.zoneText) === 0) {
      return "";
    } else
      return (
        <Button onClick={handleClick}>
          {zoneIcon(20, 14)}
          &nbsp;
          {state.zone !== 2 ? `Zone ${state.zone}` : `Zone ${state.zone} & 3`}
        </Button>
      );
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const getSoil = () => {
    if (state.soilData.length === 0) {
      return "";
    } else
      return (
        <Button>
          {<FilterHdrIcon />}
          &nbsp;{" "}
          {`Soils: Loam (${state.soilData[0].loam}%), Silt Loam: (${state.soilData[0].siltLoam}%)`}
        </Button>
      );
  };

  const showZoneDropdown = () => {};
  const handleClose = event => {
    setAnchorEl(null);
    let zoneText = "";

    if (event.target.getAttribute("value") === 2) {
      zoneText = "Zone 2 & 3";
    } else if (event.target.getAttribute("value") === 4) {
      zoneText = "Zone 4";
    } else if (event.target.getAttribute("value") === 5) {
      zoneText = "";
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 5",
          zone: parseInt(event.target.getAttribute("value"))
        }
      });
    } else if (event.target.getAttribute("value") === 6) {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 6",
          zone: parseInt(event.target.getAttribute("value"))
        }
      });
    } else {
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: "Zone 7",
          zone: parseInt(event.target.getAttribute("value"))
        }
      });
    }
  };

  const getWeatherData = () => {
    let date = new Date();
    let month = date.getMonth();
    // TODO: convert month to string, currently returning int
    let currentMonth = GetMonthString(month);

    if (state.weatherData.length === 0) return "";
    else
      return (
        <Button>
          {<CloudIcon fontSize="small" />}
          &nbsp;{" "}
          {`Average First Frost: ${state.weatherData[0].firstFrost} | Average Rain(${currentMonth}): ${state.weatherData[0].averageRain} in`}
        </Button>
      );
  };
  return (
    <div className="greenBarWrapper">
      <div className="addressBar">{getAddress()}</div>

      <div className="zoneBar">
        {getZone()}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} value={2}>
            Zone 2 and 3
          </MenuItem>
          <MenuItem onClick={handleClose} value={4}>
            Zone 4
          </MenuItem>
          <MenuItem onClick={handleClose} value={5}>
            Zone 5
          </MenuItem>
          <MenuItem onClick={handleClose} value={6} key={6}>
            Zone 6
          </MenuItem>
          <MenuItem onClick={handleClose} value={7} key={7}>
            Zone 7
          </MenuItem>
        </Menu>
      </div>
      <div className="soilBar">{getSoil()}</div>
      <div className="weatherBar">{getWeatherData()}</div>
    </div>
  );
};

export default Greenbar;
