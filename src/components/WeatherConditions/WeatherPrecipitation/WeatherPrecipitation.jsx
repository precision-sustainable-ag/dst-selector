import { Info, Opacity } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { PSATooltip } from 'shared-react-components/src';

const WeatherPrecipitation = () => {
  const weatherDataRedux = useSelector((stateRedux) => stateRedux.weatherData.weatherData);
  const { thisMonth, annual } = weatherDataRedux.averagePrecipitation;
  const currentMonthFull = moment().format('MMMM');

  return (
    <Grid
      container
      direction="column"
      style={{
        backgroundColor: 'rgba(176, 236, 130, 0.3)',
        padding: '1rem',
        borderRadius: '15px',
      }}
      data-test="precipitation-card"
    >
      <Grid sx={{ mb: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <Grid>
          <Typography variant="body1">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Precipitation</span>
            &nbsp;{' '}
            <PSATooltip
              arrow
              placement="right"
              enterTouchDelay={0}
              title={
                <div>
                  Average monthly (5-year) and annual (15-year) precipitation from the Precision
                  Sustainable Agriculture Weather API powered by{' '}
                  <a
                    href="https://www.nssl.noaa.gov/projects/mrms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSSL MRMS
                  </a>{' '}
                  and{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ldas.gsfc.nasa.gov/nldas/"
                  >
                    NASA NLDAS-2
                  </a>{' '}
                  weather data.
                </div>
              }
              tooltipContent={
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                  aria-label="Five-year average monthly and annual precipitation from the Precision Sustainable
                  Agriculture Weather API powered by NSSL MRMS and NASA NLDAS-2 weather data."
                >
                  <Info sx={{ fontSize: '1rem' }} tabIndex="0" />
                </button>
              }
            />
          </Typography>
        </Grid>
        <Grid>
          <Opacity />
        </Grid>
      </Grid>
      <Grid
        sx={{
          mb: '0.5rem',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Grid sx={{ mr: '1rem' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {currentMonthFull}
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {thisMonth ? (
              <>
                {thisMonth} <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
              </>
            ) : (
              'No Data'
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Grid sx={{ mr: '1rem' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            Annual
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {annual ? (
              <>
                {annual} <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>inches</span>
              </>
            ) : (
              'No Data'
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherPrecipitation;
