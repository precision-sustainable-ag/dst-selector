/*
  This file contains the CoverCropExplorer component
  The CoverCropExplorer component allows users to look at a list of all the cover crops for their zone 
  styled from from CustomStyles in ../../../shared/constants
*/

import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Store";
import CropSidebarComponent from "../CropSelector/CropSidebar";
import Header from "../Header/Header";
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

  useEffect(() => {
    document.title = "Cover Crop Explorer";
  }, []);

  const handleSearchChange = (e) => {
    setCropName(e.target.value);
    let { cropData } = state;

    let search = e.target.value.toLowerCase().match(/\w+/g);

    const crop_data = cropData.filter((crop) => {
      const match = (parm) => {
        const m = crop.fields[parm].toLowerCase().match(/\w+/g);

        return !search || search.every((s) => m.some((t) => t.includes(s)));
      };

      return match("Cover Crop Name") || match("Scientific Name");
    });

    setActiveCropData(crop_data);
  };

  return (
    <div className="contentWrapper">
      <Header logo="neccc_wide_logo_color_web.jpg" />
      <div className="container-fluid mt-4 mb-4">
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
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Please choose a zone from the sidebar
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <ExplorerCardView
                cropDataChanged={cropDataChanged}
                cropData={state.cropData}
                activeCropData={activeCropData}
                setActiveCropData={setActiveCropData}
                inactiveCropData={inactiveCropData}
                setInactiveCropData={setInactiveCropData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverCropExplorer;
