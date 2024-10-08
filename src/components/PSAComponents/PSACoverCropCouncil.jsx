import React, { useEffect, useRef } from 'react';
import PSAButton from './PSAButton';

const PSACoverCropCouncil = ({
  handleClick,
  councilShorthandRedux,
  alt,
  style,
}) => {
  const logoRef = useRef(null);
  const faviconRef = useRef(document.getElementById('favicon'));

  // useEffect to update favicon
  useEffect(() => {
    if (faviconRef.current) {
      switch (councilShorthandRedux) {
        case 'NECCC':
          faviconRef.current.href = '/favicons/neccc-favicon.ico';
          break;
        case 'SCCC':
          faviconRef.current.href = '/favicons/sccc-favicon.ico';
          break;
        case 'MCCC':
          faviconRef.current.href = '/favicons/mccc-favicon.ico';
          break;
        default:
          faviconRef.current.href = '/favicons/psa-favicon.ico';
          break;
      }
    }
  }, [councilShorthandRedux]);

  // useEffect to update logo image
  useEffect(() => {
    if (logoRef.current) {
      switch (councilShorthandRedux) {
        case 'NECCC':
          logoRef.current.src = '/images/neccc_wide_logo_color_web.jpg';
          break;
        case 'SCCC':
          logoRef.current.src = '/images/sccc_logo.png';
          break;
        case 'MCCC':
          logoRef.current.src = '/images/mwccc_logo.png';
          break;
        default:
          logoRef.current.src = '/images/PSAlogo-text.png';
          break;
      }
    }
  }, [councilShorthandRedux]);

  return (
    <PSAButton type="button" onClick={handleClick}>
      <img
        ref={logoRef}
        alt={alt}
        style={style}
      />
    </PSAButton>
  );
};

export default PSACoverCropCouncil;
