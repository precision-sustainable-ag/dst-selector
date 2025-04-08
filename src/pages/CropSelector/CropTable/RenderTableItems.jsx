import React from 'react';
import { useSelector } from 'react-redux';
import {
  TableCell, Typography, TableRow, Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PSAButton } from 'shared-react-components/src';
import {
  CropImage,
  flipCoverCropName,
  trimString,
  hasGoalRatingTwoOrLess,
} from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropTableCard from './CropTableCard';

const RenderTableItems = ({ showGrowthWindow, handleModalOpen }) => {
  // redux vars
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const soilDrainageFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.soilDrainageFilter);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) || /Mobi|Android/i.test(navigator.userAgent);

  return cropDataRedux
    .sort((a, b) => (a.inactive || false) - (b.inactive || false))
    .map((crop, index) => {
      const hasExcessiveDrainage = crop.soilDrainage?.includes('Excessively drained');
      const shouldHighlightRed = hasExcessiveDrainage && soilDrainageFilterRedux;
      const buttonStyle = { outlineOffset: '-8px' };

      if (shouldHighlightRed) {
        buttonStyle.outline = '4px solid red';
      }

      if (
        !crop.inactive
          ? !hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
          : hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
      ) {
        return (
          <TableRow
            key={`${crop.id} index`}
            id={crop.id}
            style={{
              opacity: hasGoalRatingTwoOrLess(selectedGoalsRedux, crop) && '0.55',
              outline: '2px solid #598344',
              backgroundColor: selectedCropIdsRedux.includes(crop.id) && '#EAEAEA',
            }}
            data-test="crop-list-tr"
          >
            <TableCell
              size="small"
              sx={{
                padding: 0,
                position: isMobile ? 'sticky' : 'static',
                left: isMobile ? 0 : 'auto',
                zIndex: isMobile ? 1 : 'auto',
                backgroundColor: isMobile ? 'white' : 'transparent',
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                spacing={0}
              >
                <Grid item xs={12}>
                  <PSAButton
                    buttonType=""
                    onClick={() => handleModalOpen(crop)}
                    style={buttonStyle}
                    title={(
                      <CropImage
                        view="table"
                        present
                        src={crop.thumbnailSmall ? crop.thumbnailSmall : 'https://placehold.co/50x50'}
                        alt={crop.label}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PSAButton
                    buttonType=""
                    variant="text"
                    sx={{
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      color: 'black',
                      fontSize: '0.rem',
                    }}
                    onClick={() => {
                      handleModalOpen(crop);
                    }}
                    data-test="crop-calendar-crop-name"
                    title={flipCoverCropName(crop.label)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    {crop.scientificName && trimString(crop.scientificName, 20)}
                  </Typography>
                  <Typography variant="body1" style={{ color: 'gray', fontSize: '0.9rem' }}>
                    {crop.group}
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
            {cropDataRedux[0].keyTraits.length > 0
              && (
              <TableCell size="small" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <table>
                  <tbody>
                    {crop.keyTraits.map((trait) => (
                      <tr>
                        <td>
                          {' '}
                          <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                            {`${trait.label}: `}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="body1" component="b" style={{ fontSize: 'small', paddingLeft: '2px' }}>
                            {trait.values.map((val) => (val.value))}
                            {' '}
                            <span className="units">{trait.units}</span>
                          </Typography>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </TableCell>
              )}
            <CropTableCard
              crop={crop}
              indexKey={index}
              showGrowthWindow={showGrowthWindow}
              handleModalOpen={handleModalOpen}
            />
          </TableRow>
        );
      }
      return null;
    });
};

export default RenderTableItems;
