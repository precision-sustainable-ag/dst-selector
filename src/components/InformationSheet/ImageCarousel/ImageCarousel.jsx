import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';

const ImageCarousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(images.length);
  const [imagesData, setImagesData] = useState([]);
  const [loaded, setLoaded] = useState([]);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
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
      makeImages(images.length);
    }
  }, [printing, images]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePauseToggle = () => {
    setPaused(!paused);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchStartX - e.changedTouches[0].clientX;
    const isRtl = theme.direction === 'rtl';
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) {
      if (isRtl) {
        if (activeStep > 0) handleBack();
      } else if (activeStep < maxSteps - 1) {
        handleNext();
      }
    } else if (deltaX < -swipeThreshold) {
      if (isRtl) {
        if (activeStep < maxSteps - 1) handleNext();
      } else if (activeStep > 0) {
        handleBack();
      }
    }
  };

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    let nextStep = (activeStep + 1) % maxSteps;
    if (!loaded[nextStep]) {
      nextStep = activeStep;
    }
    const timer = setTimeout(() => {
      setActiveStep(nextStep);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeStep, maxSteps, loaded, paused]);

  return (
    maxSteps > 0 && (
      <Box>
        <Box
          sx={{ overflow: 'hidden', position: 'relative', width: '100%' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(${(theme.direction === 'rtl' ? 1 : -1) * activeStep * 100}%)`,
              width: '100%',
            }}
          >
            {imagesData.map((step, index) => (
              <Box key={step.imgPath} sx={{ width: '100%', flexShrink: 0 }}>
                <div
                  className="info-sheet-image-container"
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    height: '550px',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      maxWidth: 400,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      fontSize: '8pt',
                    }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      window.open(step.imgPath);
                    }}
                    onLoad={() => {
                      const l = [...loaded];
                      l[index] = true;
                      setLoaded(l);
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                </div>

                <Typography style={{ alignContent: 'center', fontSize: '8pt' }}>
                  {step.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <MobileStepper
          steps={maxSteps}
          position="static"
          className="no-print"
          activeStep={activeStep}
          nextButton={
            <PSAButton
              size="small"
              buttonType=""
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              title={
                <>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </>
              }
              sx={{ color: activeStep === maxSteps - 1 ? '#757575' : '#5C8136' }}
            />
          }
          backButton={
            <PSAButton
              size="small"
              buttonType=""
              onClick={handleBack}
              disabled={activeStep === 0}
              title={
                <>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </>
              }
              sx={{ color: activeStep === 0 ? '#757575' : '#5C8136' }}
            />
          }
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }} className="no-print">
          <PSAButton
            size="small"
            buttonType=""
            onClick={handlePauseToggle}
            title={paused ? 'Play' : 'Pause'}
            sx={{ color: '#5C8136' }}
          />
        </Box>
      </Box>
    )
  );
};

export default ImageCarousel;
