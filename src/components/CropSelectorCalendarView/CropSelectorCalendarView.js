import moment from 'moment';
import React, { useContext } from 'react';
import { Context } from '../../store/Store';
import '../../styles/cropSelectorCalendarView.scss';
import CropPaintGrowthChart from './CropPaintGrowthChart/CropPaintGrowthChart';

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => {
  const { state } = useContext(Context);

  const isCashCropMonth = (month = '1') => {
    if (state.cashCropData.dateRange.startDate === null || state.cashCropData.dateRange.endDate === null) {
      return false;
    }
    const result = new Set();
    const start = moment(state.cashCropData.dateRange.startDate.$d);
    const end = moment(state.cashCropData.dateRange.endDate.$d);

    while (start.isBefore(end)) {
      result.add(start.format('M').toString());
      start.add(moment.duration(1, 'month'));
    }

    if (result.has(month)) {
      return true;
    }
    return false;
  };

  // eslint-disable-next-line no-nested-ternary
  return (
    <CropPaintGrowthChart
      data={data}
      from={from}
      isCashCropMonth={isCashCropMonth}
    />
  );
};

export default CropSelectorCalendarView;
