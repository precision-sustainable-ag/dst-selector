import { Tooltip, Typography, Grid, Box } from '@mui/material';
import { AcUnit, Info } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherFrostDates = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);

  return (
    <Grid
      container
      direction="row"
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.8rem',
        width: 'auto',
        border: '2px solid #598445',
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Box
          style={{
            backgroundColor: 'rgba(176, 236, 130, 0.8)',
            padding: '1rem',
            borderRadius: '15px',
            marginRight: '10px',
          }}
        >
          <AcUnit />
        </Box>
      </Grid>

      <Grid item direction="column">
        <Grid item>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Average Frost Dates</span>
            &nbsp;{' '}
            <Tooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={
                <div>
                  Average dates of the first and last frosts for your location, based on frost dates
                  for the last five years from the Precision Sustainable Agriculture Weather API
                  powered by{' '}
                  <a
                    href="https://www.nssl.noaa.gov/projects/mrms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSSL MRMS{' '}
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://ldas.gsfc.nasa.gov/nldas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NASA NLDAS-2
                  </a>{' '}
                  weather data; you may manually change this input.
                </div>
              }
            >
              <Info fontSize="small" />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid
          item
          direction="row"
          display="flex"
          justifyContent="space-between"
          sx={{ mt: ' 5px' }}
        >
          <Grid item direction="column">
            <Grid item>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
              >
                First Frost Date
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {`${weatherDataRedux?.averageFrost?.firstFrostDate?.month} ${weatherDataRedux?.averageFrost?.firstFrostDate?.day}`}
              </Typography>
            </Grid>
          </Grid>

          <Grid item direction="column">
            <Grid item>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '0.6rem', color: '#abaeb4' }}
              >
                Last Frost Date
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {`${weatherDataRedux?.averageFrost?.lastFrostDate?.month} ${weatherDataRedux?.averageFrost?.lastFrostDate?.day}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherFrostDates;
