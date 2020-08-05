import React, { useState, useContext, useEffect, useMemo } from "react";
import Header from "../Header/header";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  createMuiTheme,
} from "@material-ui/core";
import { UnderConstructionText, CustomStyles } from "../../shared/constants";
import { Search } from "@material-ui/icons";
// import CropExplorerFilters from "./CropExplorerFilters";
import CropSidebarComponent from "../CropSelector/CropSidebar";
import { Context } from "../../store/Store";
import ExplorerCardView from "./ExplorerCardView";

const CoverCropExplorer = () => {
  const [state] = useContext(Context);
  const [cropDataChanged, setCropDataChanged] = useState(false);
  const [activeCropData, setActiveCropData] = useState([]);
  const [inactiveCropData, setInactiveCropData] = useState([]);
  const [cropName, setCropName] = useState("");

  useEffect(() => {
    setCropDataChanged(!cropDataChanged);
  }, [state.zone]);

  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10 row">
            <div className="col-4">
              <TextField
                fullWidth
                onChange={(e) => {
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
                }}
                value={cropName}
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                inputMode="search"
                title="Cover Crop Name Search"
                placeholder="Cover Crop Name Search"
                // label="Cover Crop Name Search"
              />
            </div>
            <div className="col-8"></div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-2">
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
            />
          </div>
          <div className="col-10">
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
