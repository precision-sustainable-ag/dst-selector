import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/cropSelectorCalendarView.scss';
import CropPaintGrowthChart from './CropPaintGrowthChart/CropPaintGrowthChart';

const CropSelectorCalendarView = ({ from = 'calendar', data = [] }) => {
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);

  const isCashCropMonth = (month = '1') => {
    if (cashCropDataRedux.dateRange.startDate === null || cashCropDataRedux.dateRange.endDate === null) {
      return false;
    }
    const result = new Set();
    const start = moment(cashCropDataRedux.dateRange.startDate.$d);
    const end = moment(cashCropDataRedux.dateRange.endDate.$d);

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
