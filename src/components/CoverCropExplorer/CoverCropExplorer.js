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
import ConsentModal from "./ConsentModal";
import ReactGA from "react-ga";

const CoverCropExplorer = () => {
  const [state, dispatch] = useContext(Context);
  const [cropDataChanged, setCropDataChanged] = useState(false);
  // const [activeCropData, setActiveCropData] = useState([]);

  const activeCropData = state.activeCropData;
  console.log(activeCropData);

//  useEffect(() => {
//    let search = state.cropSearch.toLowerCase().match(/\w+/g);
//
//    const crop_data = state.cropData.filter((crop) => {
//      const match = (parm) => {
//        const m = crop.fields[parm].toLowerCase().match(/\w+/g);
//
//        return !search || search.every((s) => m.some((t) => t.includes(s)));
//      };
//
//      return match('Cover Crop Name') || match('Scientific Name');
//    });
//
//    setActiveCropData(crop_data);
//  }, [state.cropSearch, state.cropData]);

  useEffect(() => {
    setCropDataChanged((c) => !c);
  }, [state.zone]);

  useEffect(() => {
    if (state.consent === true) {
      console.log("viewing explorer");
      ReactGA.initialize("UA-181903489-1");

      ReactGA.pageview("cover crop explorer");
    }
  }, [state.consent]);

  useEffect(() => {
    document.title = "Cover Crop Explorer";
  }, []);

  const handleSearchChange = (e) => {
    dispatch({
      type: "CROP_SEARCH",
      data: {
        value: e.target.value,
      },
    });
  };

  return (
    <div className="contentWrapper">
      <ConsentModal consent={state.consent} />
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
              //setActiveCropData={setActiveCropData}
              isListView={true}
              handleSearchChange={handleSearchChange}
              searchValue={state.cropSearch}
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
                //setActiveCropData={setActiveCropData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverCropExplorer;
