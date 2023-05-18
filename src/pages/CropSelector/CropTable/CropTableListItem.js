import React, { Fragment, useContext } from 'react';
import { TableCell, Typography, TableRow } from '@mui/material';
import { CropImage, flipCoverCropName, trimString } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropTableCard from './CropTableCard';

const CropTableListItem = ({
  activeCropData, matchGoals, showGrowthWindow, handleModalOpen,
}) => {
  const { state } = useContext(Context);
  const hasGoalRatingTwoOrLess = (crop = []) => {
    const { selectedGoals } = state;
    return crop.inactive || selectedGoals.every((rating) => crop[rating] <= 2);
  };

  return (
    activeCropData.map((crop, index) => {
      if (
        ((matchGoals ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)))
      ) {
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
                          {/* {crop['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}
                          -
                          {crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)']} */}
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
                          {crop.data['Basic Agronomics']?.['Dry Matter Min (lbs/A/y)']?.values[0]}
                          -
                          {crop.data['Basic Agronomics']?.['Dry Matter Max (lbs/A/y)']?.values[0]}
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
                          {
                          crop.data['Basic Agronomics']?.Duration.values[0].toString().toLowerCase()
                            === 'short-lived perennial' ? 'Perennial' : crop.data['Basic Agronomics']?.Duration.values[0]
                          }
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
