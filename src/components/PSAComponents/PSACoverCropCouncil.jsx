import React from 'react';
import PSAButton from './PSAButton';

const PSACoverCropCouncil = ({
  handleClick,
  src,
  alt,
  style,
}) => (
  <PSAButton type="button" onClick={handleClick}>
    <img
      ref={src}
      alt={alt}
      style={style}
    />
  </PSAButton>
);

export default PSACoverCropCouncil;
