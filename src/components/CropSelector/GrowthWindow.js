import React, { useEffect, useState, Fragment } from "react";
import moment from "moment";
import { Tooltip, withStyles, Typography } from "@material-ui/core";

const HTMLTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const GrowthWindowComponent = props => {
  //   const [isCashCropMonth, setIsCashCropMonth] = useState(false);
  let isCashCropMonth = false;

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

    if (id + 1 >= 4 || id + 1 <= 8) {
      cropLegendObj.isCashCropMonth = true;
    } else {
      cropLegendObj.isCashCropMonth = false;
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

  useEffect(() => {
    console.log(`isCashCropMonth ? `, cropLegendObj.isCashCropMonth);
  }, []);

  return (
    <td className={`growthWindowCell ${id}`}>
      {/* {month} */}
      <div
        className={
          month >= 4
            ? month <= 8
              ? `legendContainer cashCropLegendContainer legendColor d-flex flex-direction-row `
              : "legendContainer legendColor d-flex flex-direction-row "
            : "legendContainer legendColor d-flex flex-direction-row "
        }
      >
        <HTMLTooltip
          arrow
          title={
            <Fragment>
              <Typography color="primary">
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
        </HTMLTooltip>
        <HTMLTooltip
          arrow
          title={
            <Fragment>
              <Typography color="primary">
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
        </HTMLTooltip>
      </div>
    </td>
  );
};

export default GrowthWindowComponent;
