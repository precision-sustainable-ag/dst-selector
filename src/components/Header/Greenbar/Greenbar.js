import React, { useEffect, useContext, Fragment } from "react";
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
import moment from "moment";

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
      return state.address === "" ? (
        ""
      ) : (
        <Fragment>
          <Button onClick={handleClick}>
            {zoneIcon(20, 14)}
            &nbsp;
            {state.zone !== 2 ? `Zone ${state.zone}` : `Zone ${state.zone} & 3`}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleZoneDropdownClose}
          >
            <MenuItem onClick={handleZoneDropdownClose} value={2} key={2}>
              Zone 2 and 3
            </MenuItem>
            <MenuItem onClick={handleZoneDropdownClose} value={4} key={4}>
              Zone 4
            </MenuItem>
            <MenuItem onClick={handleZoneDropdownClose} value={5} key={5}>
              Zone 5
            </MenuItem>
            <MenuItem onClick={handleZoneDropdownClose} value={6} key={6}>
              Zone 6
            </MenuItem>
            <MenuItem onClick={handleZoneDropdownClose} value={7} key={7}>
              Zone 7
            </MenuItem>
          </Menu>
        </Fragment>
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

  const handleZoneDropdownClose = event => {
    setAnchorEl(null);
    let zoneText = "";
    console.log(event.target.getAttribute("value"));
    let value = event.target.getAttribute("value");

    if (!isNaN(parseInt(value))) {
      switch (parseInt(value)) {
        case 2: {
          zoneText = `Zone ${value} &amp; ${value + 1}`;
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: zoneText,
              zone: value
            }
          });
          break;
        }
        case 4: {
          zoneText = `Zone ${value}`;
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: zoneText,
              zone: value
            }
          });
          break;
        }
        case 5: {
          zoneText = `Zone ${value}`;
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: zoneText,
              zone: value
            }
          });
          break;
        }
        case 6: {
          zoneText = `Zone ${value}`;
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: zoneText,
              zone: value
            }
          });
          break;
        }
        case 7: {
          zoneText = `Zone ${value}`;
          dispatch({
            type: "UPDATE_ZONE_TEXT",
            data: {
              zoneText: zoneText,
              zone: value
            }
          });
          break;
        }
        default: {
        }
      }
    }
  };

  const getWeatherData = () => {
    // TODO: convert month to string, currently returning int
    // let currentMonth = GetMonthString(month);
    let currentMonth = moment().format("MMM");
    // frost free days :-
    // http://128.192.142.200:3000/hourly?location=raleigh%20nc&start=2015-01-01&end=2019-12-31&stats=count(date)/24/5&where=air_temperature%3E0&output=json
    if (state.weatherData.length === 0) return "";
    else
      return (
        <Button>
          {<CloudIcon fontSize="small" />}
          &nbsp;{" "}
          {`Average First Frost: ${state.weatherData.averageFrost.firstFrostDate.month} ${state.weatherData.averageFrost.firstFrostDate.day} | Average Rain(${currentMonth}): ${state.weatherData.averagePrecipitation.thisMonth} in`}
        </Button>
      );
  };
  return (
    <div className="greenBarWrapper">
      <div className="addressBar">{state.progress > 0 ? getAddress() : ""}</div>

      <div className="zoneBar">{state.progress > 0 ? getZone() : ""}</div>
      <div className="soilBar">{state.progress > 1 ? getSoil() : ""}</div>
      <div className="weatherBar">
        {state.progress > 1 ? getWeatherData() : ""}
      </div>
    </div>
  );
};

export default Greenbar;
