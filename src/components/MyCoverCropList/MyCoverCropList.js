import React, { useContext, Fragment } from "react";
import { Context } from "../../store/Store";
import MyCoverCropCardsComponent from "./MyCoverCropCardsComponent";
import { Button, Typography } from "@material-ui/core";
import { PictureAsPdf, ListAlt, Add } from "@material-ui/icons";

const MyCoverCropList = () => {
  const [state, dispatch] = useContext(Context);

  const redirectToSpeciesSelector = () => {
    dispatch({
      type: "ACTIVATE_SPECIES_SELECTOR_TILE",
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false
      }
    });
  };
  return (
    <div className="container-fluid">
      {state.selectedCrops.length === 0 ? (
        <Typography variant="body1">
          Your list is empty. Use the Species Selector to add plants.
        </Typography>
      ) : (
        <Fragment>
          <div className="row">
            <div
              className="col-12 myCoverCropsBlueBar"
              style={{
                backgroundColor: "#35999b",
                height: "40px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px"
              }}
            >
              <div className="row">
                <div className="col-8">
                  <Button style={{ color: "white" }}>Download:</Button>
                  <Button style={{ color: "white" }}>
                    <PictureAsPdf /> <span className="pl-2">PDF</span>
                  </Button>
                  <Button style={{ color: "white" }}>
                    <ListAlt /> <span className="pl-2">SPREADSHEET</span>
                  </Button>
                  <Button
                    style={{ color: "white" }}
                    onClick={redirectToSpeciesSelector}
                  >
                    <Add /> <span className="pl-2">ADD A CROP</span>
                  </Button>
                </div>
                <div className="col-6"></div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            {state.selectedCrops.map((crop, index) => (
              <MyCoverCropCardsComponent
                key={index}
                data={crop.data}
                btnId={crop.btnId}
                itemNo={index}
              />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MyCoverCropList;
