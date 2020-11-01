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
  const [cropData, setCropData] = useState([]);

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
    // console.log(crop_data);
    setActiveCropData(crop_data);
  };

  return cropData.length === 0 ? (
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
            {state.zone === "" ? (
              <Grid container>
                <Grid item xs={12} alignItems="center" justify="center">
                  <Typography variant="h5" align="center">
                    Please choose a zone from the sidebar
                  </Typography>
                </Grid>
              </Grid>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CoverCropExplorer;
