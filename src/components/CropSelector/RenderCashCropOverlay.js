import React, { useContext } from "react";
import { Context } from "../../store/Store";
import moment from "moment";

const RenderCashCropOverlay = (props) => {
  const [state, dispatch] = useContext(Context);

  const id = props.id;
  const month = props.month;

  return props.from === "calendar" ? (
    <td
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
              ? "overlayGrowthWindowCell legendContainer overlayGrowthCell cashCropLegendContainer legendColor d-flex flex-direction-row"
              : "overlayGrowthWindowCelllegendContainer legendColor d-flex flex-direction-row"
            : "overlayGrowthWindowCell legendContainer legendColor d-flex flex-direction-row"
          : "overlayGrowthWindowCell legendContainer legendColor d-flex flex-direction-row"
      }
      style={
        month >= 11
          ? { borderLeft: "none", paddingTop: "0px", paddingBottom: "0px" }
          : { paddingTop: "0px", paddingBottom: "0px" }
      }
    >
      {/* {month} */}
      <div
        style={
          {
            //   width: "91px",
            //   height: "100%",
            //   maxHeight: "100%",
          }
        }
      >
        <div
          className="earlyPart"
          style={{
            height: "30px",
            width: "50%",
          }}
        ></div>
        <div
          className="midPart"
          style={{
            height: "30px",
            width: "50%",
          }}
        ></div>
      </div>
    </td>
  ) : (
    <td
      className={`overlayGrowthWindowCell ${id}`}
      style={
        month >= 11
          ? { borderLeft: "none", paddingTop: "0px", paddingBottom: "0px" }
          : { paddingTop: "0px", paddingBottom: "0px" }
      }
    >
      {/* {month} */}
      <div
        style={
          {
            //   width: "51px",
            //   height: "119px",
            //   maxHeight: "100%",
          }
        }
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
                ? "legendContainer overlayGrowthCell cashCropLegendContainer legendColor d-flex flex-direction-row"
                : "legendContainer legendColor d-flex flex-direction-row"
              : "legendContainer legendColor d-flex flex-direction-row"
            : "legendContainer legendColor d-flex flex-direction-row"
        }
      >
        <div
          className="earlyPart"
          style={{
            height: "30px",
            width: "50%",
          }}
        ></div>
        <div
          className="midPart"
          style={{
            height: "30px",
            width: "50%",
          }}
        ></div>
      </div>
    </td>
  );
};

export default RenderCashCropOverlay;
