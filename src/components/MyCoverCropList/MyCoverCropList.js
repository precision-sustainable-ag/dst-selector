import React, { useContext, Fragment } from "react";
import { Context } from "../../store/Store";
import MyCoverCropCardsComponent from "./MyCoverCropCardsComponent";
import { Button, Typography } from "@material-ui/core";
import { PictureAsPdf, ListAlt, Add } from "@material-ui/icons";
import MyCoverCropComparisonComponent from "./MyCoverCropComparisonComponent";
import { downloadAllPDF, downloadAllCSV } from "../../shared/constants";
import { useHistory } from "react-router-dom";

const MyCoverCropList = (props) => {
  const [state, dispatch] = useContext(Context);
  const comparisonView = props.comparisonView ? props.comparisonView : false;
  const from = props.from ? props.from : "state";
  const history = useHistory();
  const redirectToSpeciesSelector = () => {
    dispatch({
      type: "ACTIVATE_SPECIES_SELECTOR_TILE",
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      },
    });
  };

  const redirectToExplorer = () => {
    history.replace("/cover-crop-explorer");
  };

  const TopBar = ({ comparisonView }) => {
    const { selectedCrops } = state;
    const selectedCropNames = selectedCrops.map((crop) => {
      return {
        name: crop.cropName,
        pdf: `/pdf/${crop.cropName}.pdf`,
        csv: `/csv/${crop.cropName}.csv`,
      };
    });
    return (
      <div className="row">
        <div
          className="col-12 myCoverCropsBlueBar"
          style={{
            backgroundColor: "#35999b",
            height: "40px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <div className="row">
            {comparisonView ? (
              <div className="col-8">
                {/* <Button style={{ color: "white" }}>Download:</Button>
                <Button
                  style={{ color: "white" }}
                  onClick={() => downloadAllPDF(selectedCropNames)}
                >
                  <PictureAsPdf /> <span className="pl-2">PDF</span>
                </Button> */}

                <Button
                  style={{ color: "white" }}
                  onClick={
                    from === "myCoverCropListStatic"
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
                >
                  <Add /> <span className="pl-2">ADD A CROP</span>
                </Button>
              </div>
            ) : (
              <div className="col-8">
                <Button
                  style={{ color: "white" }}
                  onClick={
                    from === "myCoverCropListStatic"
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
                >
                  <Add /> <span className="pl-2">ADD A CROP</span>
                </Button>
              </div>
            )}

            <div className="col-6"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      {state.selectedCrops.length === 0 ? (
        <Typography variant="body1">
          Your list is empty.{" "}
          <Button
            onClick={
              from === "myCoverCropListStatic"
                ? redirectToExplorer
                : redirectToSpeciesSelector
            }
          >
            Add Crops
          </Button>
        </Typography>
      ) : comparisonView ? (
        <Fragment>
          <TopBar comparisonView={comparisonView} />
          <div className="row mt-2">
            <MyCoverCropComparisonComponent
              selectedCrops={state.selectedCrops}
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <TopBar comparisonView={comparisonView} />
          <div className="row">
            <div className="d-flex flex-wrap mt-2">
              {state.selectedCrops.map((crop, index) => (
                <MyCoverCropCardsComponent
                  key={index}
                  cardNo={index + 1}
                  data={crop.data}
                  btnId={crop.id}
                  itemNo={index}
                />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MyCoverCropList;
