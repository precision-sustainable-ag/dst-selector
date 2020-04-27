import React, { useEffect, useState, Fragment, useContext } from "react";
import moment from "moment";
import { Tooltip, withStyles, Typography } from "@material-ui/core";
import { Context } from "../../store/Store";

import "../../styles/growthWindow.scss";

const GrowthWindowComponent = props => {
  const [state, dispatch] = useContext(Context);
  //   const [isCashCropMonth, setIsCashCropMonth] = useState(false);
  let isCashCropMonth = false;
  let from = props.from;
  let cropData = props.data;
  let month = props.month;
  let id = props.id;
  let cropLegendObj = {
    Early: "",
    Mid: "",
    class: "",
    isCashCropMonth: false
  };

  var fullMonth = moment()
    .localeData()
    .months();

  const setMonthVals = id => {
    let cropDataLegendLabel_Early = cropData[`${fullMonth[id]}, Early`];
    let cropDataLegendLabel_Mid = cropData[`${fullMonth[id]}, Mid`];

    if (
      state.cashCropData.dateRange.startDate !== "" &&
      state.cashCropData.dateRange.endDate !== ""
    ) {
      if (
        id >= state.cashCropData.dateRange.startDate - 1 ||
        id <= state.cashCropData.dateRange.endDate - 1
      ) {
        cropLegendObj.isCashCropMonth = true;
      } else {
        cropLegendObj.isCashCropMonth = false;
      }
    }

    if (cropDataLegendLabel_Early || cropDataLegendLabel_Mid) {
      if (cropDataLegendLabel_Early) {
        cropLegendObj.Early = cropDataLegendLabel_Early;
      } else {
        cropLegendObj.Early = "";
      }
      if (cropDataLegendLabel_Mid) {
        cropLegendObj.Mid = cropDataLegendLabel_Mid;
      } else {
        cropLegendObj.Mid = "";
      }
    } else {
      cropLegendObj.Early = "";
      cropLegendObj.Mid = "";
    }

    // console.log("Month", id);
  };

  const sanitizeLabels = () => {
    // IF: check if cropLegendObj values are same ? or different.
    // Reliable establishment/growth : className = "reliableEstablishment"
    // Temperature/moisture risk to establishment/growth: "t_mRiskToEstablishment"
    // Frost Seeding: "frostSeeding"

    if (cropLegendObj.Early === cropLegendObj.Mid) {
      // good to go
    } else {
    }
  };

  switch (month) {
    case 0: {
      setMonthVals(0);

      break;
    }
    case 1: {
      setMonthVals(1);
      break;
    }
    case 2: {
      setMonthVals(2);
      break;
    }
    case 3: {
      setMonthVals(3);
      break;
    }
    case 4: {
      setMonthVals(4);
      break;
    }
    case 5: {
      setMonthVals(5);
      break;
    }
    case 6: {
      setMonthVals(6);
      break;
    }
    case 7: {
      setMonthVals(7);
      break;
    }
    case 8: {
      setMonthVals(8);
    }
    case 9: {
      setMonthVals(9);
      break;
    }
    case 10: {
      setMonthVals(10);
      break;
    }
    case 11: {
      setMonthVals(11);
      break;
    }
    default: {
      setMonthVals(0);
      break;
    }
  }

  // useEffect(() => {
  //   // console.log(`isCashCropMonth ? `, cropLegendObj.isCashCropMonth);
  //   // console.log(cropLegendObj);
  // }, []);

  return from === "calendar" ? (
    <td
      className={`growthWindowCell ${id}`}
      style={
        month >= 11
          ? { borderLeft: "none", paddingTop: "0px", paddingBottom: "0px" }
          : { paddingTop: "0px", paddingBottom: "0px" }
      }
    >
      {/* {month} */}
      <div
        className={
          state.cashCropData.dateRange.startDate !== ""
            ? month >=
              moment(state.cashCropData.dateRange.startDate, "MM/dd").format(
                "M"
              ) -
                1 //these two should come from sidebar dateRange
              ? month <=
                moment(state.cashCropData.dateRange.endDate, "MM/dd").format(
                  "M"
                ) -
                  1
                ? "legendContainer cashCropLegendContainer legendColor d-flex flex-direction-row"
                : "legendContainer legendColor d-flex flex-direction-row"
              : "legendContainer legendColor d-flex flex-direction-row"
            : "legendContainer legendColor d-flex flex-direction-row"
        }
      >
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">
                {fullMonth[month].toUpperCase()}, EARLY
              </Typography>
              <em>
                <Typography variant="body1">{cropLegendObj.Early}</Typography>
              </em>
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Early}`}
            style={{ height: "30px", width: "50%" }}
          ></div>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">
                {fullMonth[month].toUpperCase()}, MID
              </Typography>
              <em>
                <Typography variant="body1">{cropLegendObj.Mid}</Typography>
              </em>
            </Fragment>
          }
        >
          <div
            className={`midPart ${cropLegendObj.Mid}`}
            style={{ height: "30px", width: "50%" }}
          ></div>
        </Tooltip>
      </div>
    </td>
  ) : from === "tableOnlyCashCropWindow" ? (
    <td className="tableGrowthCell growthWindowCell">
      <div
        className={
          state.cashCropData.dateRange.startDate !== ""
            ? month >=
              moment(state.cashCropData.dateRange.startDate, "MM/dd").format(
                "M"
              ) -
                1 //these two should come from sidebar dateRange
              ? month <=
                moment(state.cashCropData.dateRange.endDate, "MM/dd").format(
                  "M"
                ) -
                  1
                ? `legendContainer cashCropLegendContainer legendColor d-flex flex-direction-row `
                : "legendContainer legendColor d-flex flex-direction-row "
              : "legendContainer legendColor d-flex flex-direction-row "
            : `legendContainer legendColor d-flex flex-direction-row `
        }
      >
        <div
          className={`earlyPart ${
            cropLegendObj.isCashCropMonth ? "cashCropMonth" : ""
          }`}
          style={{ height: "20px", width: "50%" }}
        ></div>
        <div
          className={`midPart ${
            cropLegendObj.isCashCropMonth ? "cashCropMonth" : ""
          }`}
          style={{ height: "20px", width: "50%" }}
        ></div>
      </div>
    </td>
  ) : (
    <td className="tableGrowthCell growthWindowCell">
      <div className="legendContainer legendColor d-flex flex-direction-row ">
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">
                {fullMonth[month].toUpperCase()}, EARLY
              </Typography>
              <em>
                <Typography variant="body1">{cropLegendObj.Early}</Typography>
              </em>
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Early}`}
            style={{ height: "20px", width: "50%" }}
          ></div>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">
                {fullMonth[month].toUpperCase()}, MID
              </Typography>
              <em>
                <Typography variant="body1">{cropLegendObj.Mid}</Typography>
              </em>
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Mid}`}
            style={{ height: "20px", width: "50%" }}
          ></div>
        </Tooltip>
      </div>
    </td>
  );
};

export default GrowthWindowComponent;
