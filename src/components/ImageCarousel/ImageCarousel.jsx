import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { PSAButton } from 'shared-react-components/src';

const ImageCarousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(images.length);
  const [imagesData, setImagesData] = useState([]);
  const [loaded, setLoaded] = useState([]);
  const printing = useSelector((stateRedux) => stateRedux.sharedData.printing);

  useEffect(() => {
    async function makeImages(n) {
      const imgsData = [];
      await images.slice(0, n).forEach((image) => {
        const imgData = { label: '', imgPath: '' };
        imgData.label = `Source: ${image.source ? image.source : ''}, ${image.year_taken ? image.year_taken : ''}, CC BY-ND 4.0 License`;
        imgData.imgPath = image.url;
        imgsData.push(imgData);
      });
      setImagesData(imgsData);
      setActiveStep(0);
      setMaxSteps(imgsData.length);
    }

    if (printing) {
      makeImages(1);
    } else {
      makeImages(-1);
    }
  }, [printing]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const nextStep = (activeStep + 1) % imagesData.length;
  if (loaded[nextStep]) {
    setTimeout(() => {
      setActiveStep(nextStep);
    }, 2000);
  }

  return (
    maxSteps > 0 && (
    <Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {imagesData.map((step, index) => (
          <div key={step.label + index}>
            <div
              style={{
                justifyContent: 'center', display: 'flex', alignItems: 'center', height: '550px',
              }}
            >
              {Math.abs(activeStep - index) <= 2 && (
              <Box
                component="img"
                sx={{
                  maxWidth: 400,
                  width: '100%',
                  fontSize: '8pt',
                }}
                style={{ cursor: 'pointer' }}
                onClick={() => { window.open(step.imgPath); }}
                onLoad={() => {
                  const l = [...loaded];
                  l[index] = true;
                  setLoaded(l);
                }}
                src={step.imgPath}
                alt={step.label}
              />
              )}
            </div>

            <Typography style={{ alignContent: 'center', fontSize: '8pt' }}>{imagesData[activeStep]?.label}</Typography>
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        className="no-print"
        activeStep={activeStep}
        nextButton={(
          <PSAButton
            size="small"
            buttonType=""
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            title={(
              <>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </>
            )}
          />
        )}
        backButton={(
          <PSAButton
            size="small"
            buttonType=""
            onClick={handleBack}
            disabled={activeStep === 0}
            title={(
              <>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </>
            )}
          />
        )}
      />
    </Box>
    )
  );
};

export default ImageCarousel;
