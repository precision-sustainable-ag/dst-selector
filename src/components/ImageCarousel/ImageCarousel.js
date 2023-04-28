import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
// import { ucFirst } from '../../shared/constants';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageCarousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const [imagesData, setImagesData] = useState([]);

  // const baseName = (path = '') => {
  //   let separator = '/';
  //   const windowsSeparator = '\\';
  //   if (path.includes(windowsSeparator)) {
  //     separator = windowsSeparator;
  //   }
  //   return path.slice(path.lastIndexOf(separator) + 1);
  // };

  // const getPhotoCredits = (image = '') => {
  //   // get base file name
  //   const fileName = baseName(image.url);

  //   const fileNameArray = fileName.split('_');

  //   // get last value of array
  //   const {
  //     length,
  //     [length - 1]: last,
  //     [length - 2]: secondLast,
  //     [length - 3]: thirdLast,
  //   } = fileNameArray;
  //   const year = parseInt(last, 10) ? `[${parseInt(last, 10)}]` : '';
  //   if (thirdLast?.toLowerCase().includes('mirsky')) {
  //     const mirskyLabString = ucFirst(`${thirdLast} ${secondLast}`);
  //     return `Credit ${mirskyLabString} [${year}]`;
  //   }
  //   return `Credit ${secondLast ? `- ${secondLast}` : ''} ${year}`;
  // };

  useEffect(() => {
    const imgsData = [];
    async function makeImages() {
      await images.forEach((image) => {
        const imgData = { label: '', imgPath: '' };
        // imgData.label = getPhotoCredits(image);
        imgData.label = 'Need Source Data';
        imgData.imgPath = image.url;
        imgsData.push(imgData);
      });
      await setImagesData(imgsData);
    }

    makeImages();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: -25 }}>
      <AutoPlaySwipeableViews
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
              // <img src={step.imgPath} alt={step.label} style={{ width: '100px', height:  }} />
              <Box
                component="img"
                objectFit="contain"
                sx={{
                  // height: 1 / 2,
                  // display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                  fontSize: '8pt',
                }}
                style={{ cursor: 'pointer' }}
                onClick={() => { window.open(step.imgPath); }}
                src={step.imgPath}
                alt={step.label}
              />
              )}
            </div>

            <Typography style={{ paddingLeft: '35%', fontSize: '8pt' }}>{imagesData[activeStep]?.label}</Typography>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={(
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        )}
      />
    </Box>
  );
};

export default ImageCarousel;
