/*
  This file contains the GrowthWindowComponent component
  The GrowthWindowComponent is the that shows the growth window view in the calendar
  Styles are created using growthWindow.scss
*/

import React, { useEffect, useState, Fragment, useContext } from 'react';
import moment from 'moment';
import { Tooltip, withStyles, Typography } from '@material-ui/core';
import { Context } from '../../store/Store';

import '../../styles/growthWindow.scss';

const GrowthWindowComponent = (props) => {
  const { state, dispatch } = useContext(Context);
  //   const [isCashCropMonth, setIsCashCropMonth] = useState(false);
  let from = props.from;
  let cropData = props.data;
  let month = props.month;
  let id = props.id;
  const [cropLegendObj, setCropLegendObj] = useState({
    Early: [],
    Mid: [],
    class: '',
    isCashCropMonth: false,
  });

  var fullMonth = moment().localeData().months();

  const setMonthVals = (id) => {
    let cropDataLegendLabel_Early = cropData[`${fullMonth[id]}, Early`]
      ? cropData[`${fullMonth[id]}, Early`]
      : [];

    let cropDataLegendLabel_Mid = cropData[`${fullMonth[id]}, Mid`]
      ? cropData[`${fullMonth[id]}, Mid`]
      : [];

    // debug

    // TODO: is this if statement needed?
    if (cropData['Cover Crop Name'] === 'Oats, Spring') {
      console.log(cropData[`${fullMonth[id]}, Early`]);
    }

    if (
      state.cashCropData.dateRange.startDate !== '' &&
      state.cashCropData.dateRange.endDate !== ''
    ) {
      if (
        id >= state.cashCropData.dateRange.startDate - 1 ||
        id <= state.cashCropData.dateRange.endDate - 1
      ) {
        // cropLegendObj.isCashCropMonth = true;
        setCropLegendObj({ ...cropLegendObj, isCashCropMonth: true });
      } else {
        // cropLegendObj.isCashCropMonth = false;
        setCropLegendObj({ ...cropLegendObj, isCashCropMonth: false });
      }
    }

    if (cropDataLegendLabel_Early || cropDataLegendLabel_Mid) {
      if (cropDataLegendLabel_Early) {
        // cropLegendObj.Early = cropDataLegendLabel_Early;
        setCropLegendObj({
          ...cropLegendObj,
          Early: cropDataLegendLabel_Early,
        });
      } else {
        cropLegendObj.Early = '';
      }
      if (cropDataLegendLabel_Mid) {
        // cropLegendObj.Mid = cropDataLegendLabel_Mid;
        setCropLegendObj({ ...cropLegendObj, Mid: cropDataLegendLabel_Mid });
      } else {
        cropLegendObj.Mid = '';
      }
    } else {
      // cropLegendObj.Early = "";
      // cropLegendObj.Mid = "";
      setCropLegendObj({ ...cropLegendObj, Early: cropDataLegendLabel_Early });
      setCropLegendObj({ ...cropLegendObj, Mid: cropDataLegendLabel_Mid });
    }
  };

  useEffect(() => {
    if (props.data['Cover Crop Name'] === 'Oats, Spring') {
    }
  }, [cropLegendObj]);

  useEffect(() => {
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
        break;
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
  }, []);

  return from === 'calendar' ? (
    <td
      className={
        state.cashCropData.dateRange.startDate !== ''
          ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
            ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
              ? `growthWindowCell ${id} cashCropLegendContainer `
              : `growthWindowCell ${id}`
            : `growthWindowCell ${id}`
          : `growthWindowCell ${id}`
      }
      style={month >= 11 ? { borderLeft: 'none', paddingBottom: '0px' } : { paddingBottom: '0px' }}
    >
      {/* {month} */}
      <div
        className={
          state.cashCropData.dateRange.startDate !== ''
            ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
              ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
                ? 'legendContainer cashCropLegendContainer legendColor d-flex flex-direction-row'
                : 'legendContainer legendColor d-flex flex-direction-row'
              : 'legendContainer legendColor d-flex flex-direction-row'
            : 'legendContainer legendColor d-flex flex-direction-row'
        }
      >
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, EARLY</Typography>
              {cropLegendObj.Early.map((v, i) => (
                <Typography variant="body1" key={i} gutterBottom>
                  {v}
                </Typography>
              ))}
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Early.toString().split(',').join(' ')}`}
            style={{ height: '30px', width: '50%' }}
          ></div>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, MID</Typography>
              {cropLegendObj.Mid.map((v, i) => (
                <Typography variant="body1" key={i} gutterBottom>
                  {v}
                </Typography>
              ))}
            </Fragment>
          }
        >
          <div
            className={`midPart ${cropLegendObj.Mid.toString().split(',').join(' ')}`}
            style={{ height: '30px', width: '50%' }}
          ></div>
        </Tooltip>
      </div>
    </td>
  ) : from === 'tableOnlyCashCropWindow' ? (
    <td
      className={
        state.cashCropData.dateRange.startDate !== ''
          ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
            ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
              ? `growthWindowCell ${id} cashCropLegendContainer`
              : `growthWindowCell ${id}`
            : `growthWindowCell ${id}`
          : `growthWindowCell ${id}`
      }
    >
      <div
        className={
          state.cashCropData.dateRange.startDate !== ''
            ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
              ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
                ? `legendContainer cashCropLegendContainer legendColor d-flex flex-direction-row `
                : 'legendContainer legendColor d-flex flex-direction-row '
              : 'legendContainer legendColor d-flex flex-direction-row '
            : `legendContainer legendColor d-flex flex-direction-row `
        }
      >
        <div
          className={`earlyPart ${cropLegendObj.isCashCropMonth ? 'cashCropMonth' : ''}`}
          style={{ height: '20px', width: '50%' }}
        ></div>
        <div
          className={`midPart ${cropLegendObj.isCashCropMonth ? 'cashCropMonth' : ''}`}
          style={{ height: '20px', width: '50%' }}
        ></div>
      </div>
    </td>
  ) : from === 'infosheet' ? (
    <td
      className={
        state.cashCropData.dateRange.startDate !== ''
          ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
            ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
              ? `growthWindowCell noBorderRightCond ${id}`
              : `growthWindowCell noBorderRightCond ${id}`
            : `growthWindowCell noBorderRightCond ${id}`
          : `growthWindowCell noBorderRightCond ${id}`
      }
      style={{
        borderRight: `${month !== 'Dec' ? `2px solid white` : ``}`,
      }}
    >
      <div className="legendContainer legendColor d-flex flex-direction-row w-100">
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, EARLY</Typography>
              <div>
                <Typography variant="body1">{cropLegendObj.Early}</Typography>
              </div>
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Early}`}
            style={{ height: '20px', width: '50%' }}
          ></div>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, MID</Typography>
              <div>
                <Typography variant="body1">{cropLegendObj.Mid}</Typography>
              </div>
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Mid}`}
            style={{ height: '20px', width: '50%' }}
          ></div>
        </Tooltip>
      </div>
    </td>
  ) : (
    <td
      className={
        state.cashCropData.dateRange.startDate !== ''
          ? month >= moment(state.cashCropData.dateRange.startDate, 'MM/dd').format('M') - 1 //these two should come from sidebar dateRange
            ? month <= moment(state.cashCropData.dateRange.endDate, 'MM/dd').format('M') - 1
              ? `growthWindowCell ${id} cashCropLegendContainer linear`
              : `growthWindowCell ${id}`
            : `growthWindowCell ${id}`
          : `growthWindowCell ${id}`
      }
    >
      <div className="legendContainer legendColor d-flex flex-direction-row w-100">
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, EARLY</Typography>
              {cropLegendObj.Early.map((v, i) => (
                <Typography variant="body1" key={i} gutterBottom>
                  {v}
                </Typography>
              ))}
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Early.toString().split(',').join(' ')}`}
            style={{ height: '20px', width: '50%' }}
          ></div>
        </Tooltip>
        <Tooltip
          arrow
          title={
            <Fragment>
              <Typography color="secondary">{fullMonth[month].toUpperCase()}, MID</Typography>
              {cropLegendObj.Mid.map((v, i) => (
                <Typography variant="body1" key={i} gutterBottom>
                  {v}
                </Typography>
              ))}
            </Fragment>
          }
        >
          <div
            className={`earlyPart ${cropLegendObj.Mid.toString().split(',').join(' ')}`}
            style={{ height: '20px', width: '50%' }}
          ></div>
        </Tooltip>
      </div>
    </td>
  );
};

export default GrowthWindowComponent;
