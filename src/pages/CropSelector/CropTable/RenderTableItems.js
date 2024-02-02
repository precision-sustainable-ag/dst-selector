import React from 'react';
import { useSelector } from 'react-redux';
import {
  TableCell, Typography, TableRow, Button, Box, useMediaQuery,
} from '@mui/material';
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

  // theme vars
  const isLargeScreen = useMediaQuery('(min-width:1300px)');

  return cropDataRedux
    .sort((a, b) => a.inactive - b.inactive)
    .map((crop, index) => {
      if (
        !crop.inactive
          ? !hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
          : hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
      ) {
        const searchCategory = crop.data['Basic Agronomics'] ? 'Basic Agronomics' : 'Growth Traits';

        const duration = (crop.data[searchCategory]?.Duration.values[0].toString().toLowerCase()
          === 'short-lived perennial'
          ? 'Perennial'
          : crop.data[searchCategory]?.Duration.values[0]) || 'No Data';

        const maxN = crop.data[searchCategory]?.['Nitrogen Accumulation Min, Legumes (lbs/A/y)']?.values[0];
        const minN = crop.data[searchCategory]?.['Nitrogen Accumulation Max, Legumes (lbs/A/y)']?.values[0];
        const totalN = minN && maxN ? `${minN} - ${maxN}` : 'No Data';

        let dryMatter;

        if (crop.data[searchCategory]?.['Dry Matter']) {
          dryMatter = crop.data[searchCategory]?.['Dry Matter']?.values[0] || 'No Data';
        } else {
          const dryMatterMax = crop.data[searchCategory]?.['Dry Matter Max (lbs/A/y)']?.values[0];
          const dryMatterMin = crop.data[searchCategory]?.['Dry Matter Min (lbs/A/y)']?.values[0];

          dryMatter = dryMatterMin && dryMatterMax ? `${dryMatterMin} - ${dryMatterMax}` : 'No Data';
        }

        return (
          <TableRow
            key={`${crop.id} index`}
            id={crop.id}
            style={{
              opacity: hasGoalRatingTwoOrLess(selectedGoalsRedux, crop) && '0.3',
              outline: '2px solid #598344',
            }}
          >
            <TableCell size="small" sx={{ maxWidth: 150 }}>
              {/* <div className="container-fluid"> */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                {/* <div className="row"> */}
                <Box sx={{ display: 'flex', flexDirection: isLargeScreen ? 'row' : 'column' }}>
                  {/* <div className="col-auto pl-md-0"> */}
                  <Box sx={{ flexShrink: 0 }}>
                    <Button onClick={() => handleModalOpen(crop)}>
                      <CropImage
                        present={!!crop.thumbnail}
                        src={crop.thumbnail ? crop.thumbnail : 'https://placehold.it/100x100'}
                        alt={crop.label}
                      />
                    </Button>
                    {/* </div> */}
                  </Box>
                  {/* <div
                    className="col-auto pl-md-0 text-left"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <div> */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h7" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                      {flipCoverCropName(crop.label)}
                    </Typography>
                    {/* </div>
                    <div> */}
                    <Typography
                      variant="body1"
                      style={{
                        color: 'gray',
                        fontWeight: 'normal',
                        fontStyle: 'italic',
                        fontSize: 'small',
                        textAlign: 'left',
                      }}
                    >
                      {trimString(crop.family.scientific, 25)}
                    </Typography>
                    {/* </div> */}
                    {/* <div className="col-12 p-md-0"> */}
                    {/* <div> */}
                    <Typography variant="body1" style={{ color: 'gray', fontSize: 'small' }}>
                      {crop.group}
                    </Typography>
                    {/* </div> */}
                    {/* </div> */}
                  </Box>
                  {/* </div> */}
                </Box>
                {/* </div> */}
              </Box>
            </TableCell>
            <TableCell size="small" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
              <table>
                <tbody>
                  {crop.group.toLowerCase() === 'legume' && (
                    <tr>
                      <td>
                        <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                          Total N:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                          {totalN}
                          <span className="units">lbs/A/y</span>
                        </Typography>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td>
                      {' '}
                      <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                        Dry Matter:
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                        {dryMatter}
                        {/* -
                          {dryMatter} */}
                        <span className="units">lbs/A/y</span>
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                        Duration:
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body1" component="b" style={{ fontSize: 'small' }}>
                        {duration}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TableCell>
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
