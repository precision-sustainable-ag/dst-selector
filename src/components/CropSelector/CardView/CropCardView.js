import React, { useContext, useEffect } from "react";
import { Context } from "../../../store/Store";
import "../../../styles/cropCardView/cropCardView.scss";
import { CustomStyles } from "../../../shared/constants";
import CropCardComponent from "./CropCard";

const CropCardViewComponent = (props) => {
  const [state, dispatch] = useContext(Context);

  const computeWidth = (elClassName) => {
    let ele = document.getElementsByClassName(elClassName);
    let computedWidth = 0;
    for (let i = 0, len = ele.length; i < len; i++) {
      computedWidth += parseFloat(
        window.getComputedStyle(ele[i], null).getPropertyValue("width")
      );
    }
    return parseFloat(computedWidth);
  };

  const getElementWidth = (elClassName) => {
    console.log(computeWidth(elClassName));
  };

  useEffect(() => {
    getElementWidth("goalsDiv");
  }, []);

  const cardStyle = {
    width: "100%",
    height: "150px",
  };
  const cardHeader = {
    top: {
      fontWeight: 500,
      fontSize: "0.875rem",
      borderRadius: CustomStyles().semiRoundedRadius,
      textAlign: "center",
      backgroundClip: "content-box",
      //   marginBottom: "10px",
      firstEmpty: {
        width: `${computeWidth("cvrCropsHrd")}px`,
        backgroundColor: "white",
        backgroundClip: "content-box",
        height: "30px",
      },
      goals: {
        width: `${computeWidth("goalsDiv")}px`,
        backgroundColor: CustomStyles().lightGreen,
        backgroundClip: "content-box",
        height: "30px",
        borderTopLeftRadius: CustomStyles().semiRoundedRadius,
      },
      legend: {
        width: `${computeWidth("grwthWindow")}px`,
        backgroundColor: CustomStyles().lightGreen,
        backgroundClip: "content-box",
        height: "30px",
        borderTopRightRadius: CustomStyles().semiRoundedRadius,
      },
    },
    bottom: {
      height: "50px",
      fontWeight: 500,
      fontSize: "0.875rem",

      textAlign: "center",
      each: {
        backgroundColor: CustomStyles().lightGreen,
        backgroundClip: "content-box",
        height: "50px",
      },
      first: {
        borderTopLeftRadius: CustomStyles().semiRoundedRadius,
        borderBottomLeftRadius: CustomStyles().semiRoundedRadius,
      },
      last: {
        borderTopRightRadius: CustomStyles().semiRoundedRadius,
        borderBottomRightRadius: CustomStyles().semiRoundedRadius,
      },
    },
  };

  return (
    <div className="container-fluid">
      <section
        className="cardHeaderTop row d-flex align-items-center mb-2"
        style={cardHeader.top}
      >
        <div className="d-flex">
          <div className="col" style={cardHeader.top.firstEmpty}></div>
        </div>
        <div className="d-flex" style={cardHeader.top.goals}>
          <div className="col">COVER CROPPING GOALS</div>
        </div>
        <div className="d-flex" style={cardHeader.top.legend}>
          <div className="col">LEGEND</div>
        </div>
      </section>
      <section
        className="cardHeader row align-items-center"
        style={cardHeader.bottom}
      >
        <div
          className="col-3 align-items-center cvrCropsHrd pr-1 pl-0"
          style={Object.assign(
            {},
            cardHeader.bottom.each,
            cardHeader.bottom.first
          )}
        >
          COVER CROPS
        </div>
        {state.selectedGoals.length !== 0
          ? state.selectedGoals.map((val, index) => (
              <div
                key={index}
                className="col goalsDiv pr-1 pl-1"
                style={cardHeader.bottom.each}
              >
                {val.toUpperCase()}
              </div>
            ))
          : ""}

        {props.showGrowthWindow ? (
          <div
            className="col pr-1 pl-1 grwthWindow"
            style={cardHeader.bottom.each}
          >
            GROWTH WINDOW
          </div>
        ) : (
          ""
        )}

        <div
          className="col-md-1 pr-0 pl-1"
          style={Object.assign(
            {},
            cardHeader.bottom.each,
            cardHeader.bottom.last
          )}
        >
          MY LIST
        </div>
      </section>

      <CropCardComponent
        cropData={props.cropData}
        selectedGoals={state.selectedGoals}
        showGrowthWindow={props.showGrowthWindow}
      />
    </div>
  );
};

export default CropCardViewComponent;
