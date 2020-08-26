import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import Header from "../Header/header";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  createMuiTheme,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { UnderConstructionText, CustomStyles } from "../../shared/constants";
import {
  Search,
  PictureAsPdf,
  FormatListBulleted,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
// import CropExplorerFilters from "./CropExplorerFilters";
import CropSidebarComponent from "../CropSelector/CropSidebar";
import { Context } from "../../store/Store";
import ExplorerCardView from "./ExplorerCardView";

const CoverCropExplorer = () => {
  const [state, dispatch] = useContext(Context);
  const cardViewRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cropDataChanged, setCropDataChanged] = useState(false);
  const [activeCropData, setActiveCropData] = useState([]);
  const [inactiveCropData, setInactiveCropData] = useState([]);
  const [cropName, setCropName] = useState("");

  useEffect(() => {
    setCropDataChanged(!cropDataChanged);
  }, [state.zone]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    document.title = "Cover Crop Explorer";
  }, []);
  const handleClose = (zone) => {
    if (typeof zone === "number") {
      let zoneText = `Zone ${zone}`;
      dispatch({
        type: "UPDATE_ZONE_TEXT",
        data: {
          zoneText: zoneText,
          zone: parseInt(zone),
        },
      });
    }
    setAnchorEl(null);
  };
  const handleSearchChange = (e) => {
    setCropName(e.target.value);
    // console.log(e.target.value.length);
    let { cropData } = state;
    const crop_data = cropData.filter((crop) => {
      let crop_name = crop.fields["Cover Crop Name"]
        .split(",")
        .join("")
        .toLowerCase();
      let scientific_name = crop.fields["Scientific Name"]
        .split(",")
        .join("")
        .toLowerCase();
      if (
        crop_name.includes(e.target.value.toLowerCase()) ||
        scientific_name.includes(e.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log(crop_data);
    setActiveCropData(crop_data);
  };
  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-4">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-3 col-xl-2 col-12">
            <CropSidebarComponent
              from={"explorer"}
              cropDataChanged={cropDataChanged}
              cropData={state.cropData}
              activeCropData={
                activeCropData.length > 0 ? activeCropData : state.cropData
              }
              setActiveCropData={setActiveCropData}
              inactiveCropData={inactiveCropData}
              setInactiveCropData={setInactiveCropData}
              isListView={true}
              handleSearchChange={handleSearchChange}
              searchValue={cropName}
            />
          </div>
          <div className="col-md-12 col-lg-9 col-xl-10 col-12">
            <div
              className="row"
              style={{
                backgroundColor: "#35999b",
                height: "40px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              {/*<div className="col-8">
                 <Button style={{ color: "white" }}>Download:</Button>
                <Button
                  style={{ color: "white" }}
                  onClick={() => window.print()}
                >
                  <PictureAsPdf /> <span className="pl-2">PDF</span>
                </Button>

                <Button href={`/csv/`} style={{ color: "white" }}>
                  <FormatListBulleted />
                  &nbsp; SPREADSHEET
                </Button> 
              </div>*/}
              <div className="col-12 offset-md-8 col-md-4 text-right">
                <Button
                  aria-controls="zone-selector"
                  aria-haspopup="true"
                  onClick={handleClick}
                  style={{ color: "white" }}
                >
                  Zone {state.zone}&nbsp;{" "}
                  {!Boolean(anchorEl) ? (
                    <KeyboardArrowDown />
                  ) : (
                    <KeyboardArrowUp />
                  )}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleClose(5)}>Zone 5</MenuItem>
                  <MenuItem onClick={() => handleClose(6)}>Zone 6</MenuItem>
                  <MenuItem onClick={() => handleClose(7)}>Zone 7</MenuItem>
                </Menu>
              </div>
            </div>
            <ExplorerCardView
              cropDataChanged={cropDataChanged}
              cropData={state.cropData}
              activeCropData={
                activeCropData.length > 0 ? activeCropData : state.cropData
              }
              setActiveCropData={setActiveCropData}
              inactiveCropData={inactiveCropData}
              setInactiveCropData={setInactiveCropData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverCropExplorer;
