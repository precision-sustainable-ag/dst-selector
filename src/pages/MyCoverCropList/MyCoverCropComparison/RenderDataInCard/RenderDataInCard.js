import React, { } from 'react';
import '../../../../styles/cropComparisonView.scss';
import '../../../../styles/MyCoverCropComparisonComponent.scss';

const RenderDataInCard = ({ classNameProperty, styleProperty, data }) => (
  <div
    className={classNameProperty}
    style={styleProperty}
  >
    {`${data}`}
  </div>
);

export default RenderDataInCard;
