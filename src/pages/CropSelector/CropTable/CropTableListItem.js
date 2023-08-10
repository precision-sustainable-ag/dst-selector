import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { TableCell, Typography, TableRow } from '@mui/material';
import { CropImage, flipCoverCropName, trimString } from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropTableCard from './CropTableCard';

const CropTableListItem = ({
  activeCropData, matchGoals, showGrowthWindow, handleModalOpen,
}) => {
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const hasGoalRatingTwoOrLess = (crop = []) => crop.inactive || selectedGoalsRedux.every((rating) => crop[rating] <= 2);

  return (
    activeCropData.map((crop, index) => {
      if (
        ((matchGoals ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)))
      ) {
        const searchCategory = crop.data['Basic Agronomics'] ? 'Basic Agronomics' : 'Growth Traits';

        const duration = (crop.data[searchCategory]?.Duration.values[0].toString().toLowerCase()
                          === 'short-lived perennial' ? 'Perennial' : crop.data[searchCategory]?.Duration.values[0]) || 'No Data';

        const maxN = crop.data[searchCategory]?.['Nitrogen Accumulation Min, Legumes (lbs/A/y)']?.values[0];
        const minN = crop.data[searchCategory]?.['Nitrogen Accumulation Max, Legumes (lbs/A/y)']?.values[0];
        const totalN = (minN && maxN) ? `${minN} - ${maxN}` : 'No Data';

        let dryMatter;

        if (crop.data[searchCategory]?.['Dry Matter']) {
          dryMatter = crop.data[searchCategory]?.['Dry Matter']?.values[0] || 'No Data';
        } else {
          const dryMatterMax = crop.data[searchCategory]?.['Dry Matter Max (lbs/A/y)']?.values[0];
          const dryMatterMin = crop.data[searchCategory]?.['Dry Matter Min (lbs/A/y)']?.values[0];

          dryMatter = (dryMatterMin && dryMatterMax) ? `${dryMatterMin} - ${dryMatterMax}` : 'No Data';
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
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-auto pl-md-0">
                      <CropImage
                        present={!!crop.thumbnail}
                        src={
                          crop.thumbnail
                            ? crop.thumbnail
                            : 'https://placehold.it/100x100'
                        }
                        alt={crop.label}
                      />
                    </div>
                    <div className="col-auto pl-md-0">
                      <div className="col-12 p-md-0">
                        <Typography variant="h6">
                          {flipCoverCropName(crop.label)}
                        </Typography>
                      </div>
                      <div className="col-12 p-md-0">
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
                      </div>
                      <div className="col-12 p-md-0">
                        <Typography
                          variant="subtitle2"
                          className="text-uppercase"
                          style={{ color: 'gray' }}
                        >
                          {crop.group}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <table>
                  <tbody>
                    {crop.group.toLowerCase() === 'legume' && (
                    <tr>
                      <td>
                        <Typography variant="subtitle2" component="b" className="">
                          TOTAL N:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="subtitle2" component="b">
                          {totalN}
                          <span className="units">lbs/A/y</span>
                        </Typography>
                      </td>
                    </tr>
                    )}

                    <tr>
                      <td>
                        {' '}
                        <Typography variant="subtitle2" component="b" className="">
                          DRY MATTER:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="subtitle2" component="b">
                          {dryMatter}
                          {/* -
                          {dryMatter} */}
                          <span className="units">lbs/A/y</span>
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography variant="subtitle2" component="b" className="">
                          DURATION:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="subtitle2" component="b" className="text-uppercase">
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
          </Fragment>
        );
      }
      return (
        <>
        </>
      );
    })
  );
};

export default CropTableListItem;
