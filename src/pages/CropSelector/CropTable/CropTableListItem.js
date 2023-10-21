import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { TableCell, Typography, TableRow, TableContainer, Table, TableBody } from '@mui/material';
import { CropImage, flipCoverCropName, trimString } from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropTableCard from './CropTableCard';

const CropTableListItem = ({ activeCropData, matchGoals, showGrowthWindow, handleModalOpen }) => {
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const hasGoalRatingTwoOrLess = (crop = []) =>
    crop.inactive || selectedGoalsRedux.every((rating) => crop[rating] <= 2);

  return activeCropData.map((crop, index) => {
    if (matchGoals ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)) {
      const searchCategory = crop.data['Basic Agronomics'] ? 'Basic Agronomics' : 'Growth Traits';

      const duration =
        (crop.data[searchCategory]?.Duration.values[0].toString().toLowerCase() ===
        'short-lived perennial'
          ? 'Perennial'
          : crop.data[searchCategory]?.Duration.values[0]) || 'No Data';

      const maxN =
        crop.data[searchCategory]?.['Nitrogen Accumulation Min, Legumes (lbs/A/y)']?.values[0];
      const minN =
        crop.data[searchCategory]?.['Nitrogen Accumulation Max, Legumes (lbs/A/y)']?.values[0];
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
        <Fragment key={index}>
          <TableRow
            className={hasGoalRatingTwoOrLess(crop) && 'inactiveCropRow'}
            key={`croprow${index}`}
            id={crop.id}
            style={{ opacity: hasGoalRatingTwoOrLess(crop) && '0.2' }}
          >
            <TableCell style={{ height: 'auto' }}>
              <Grid container direction="row">
                <Grid item sx={{ paddingLeft: { xs: 0, md: 0 } }}>
                  <CropImage
                    present={!!crop.thumbnail}
                    src={crop.thumbnail ? crop.thumbnail : 'https://placehold.it/100x100'}
                    alt={crop.label}
                  />
                </Grid>
                <Grid item sx={{ paddingLeft: { md: 0 } }}>
                  <Box sx={{ padding: { xs: 0, md: 0 } }}>
                    <Typography variant="h6">{flipCoverCropName(crop.label)}</Typography>
                  </Box>

                  <Box sx={{ padding: { xs: 0, md: 0 } }}>
                    <Typography
                      variant="body1"
                      style={{
                        color: 'gray',
                        fontWeight: 'normal',
                        fontStyle: 'italic',
                        fontSize: 'small',
                      }}
                    >
                      {trimString(crop.family.scientific, 25)}
                    </Typography>
                  </Box>
                  <Box sx={{ padding: { xs: 0, md: 0 } }}>
                    <Typography
                      variant="subtitle2"
                      className="text-uppercase"
                      style={{ color: 'gray' }}
                    >
                      {crop.group}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell style={{ textAlign: 'left', verticalAlign: 'middle' }}>
              <TableContainer>
                <Table>
                  <TableBody>
                    {crop.group.toLowerCase() === 'legume' && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" component="b" className="">
                            TOTAL N:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" component="b">
                            {totalN}
                            <span className="units">lbs/A/y</span>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell>
                        {' '}
                        <Typography variant="subtitle2" component="b" className="">
                          DRY MATTER:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" component="b">
                          {dryMatter}
                          {/* -
                          {dryMatter} */}
                          <span className="units">lbs/A/y</span>
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" component="b" className="">
                          DURATION:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" component="b" className="text-uppercase">
                          {duration}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
            <CropTableCard
              crop={crop}
              indexKey={index}
              showGrowthWindow={showGrowthWindow}
              handleModalOpen={handleModalOpen}
            />
          </TableRow>
        </Fragment>
      );
    }
    return <></>;
  });
};

export default CropTableListItem;
