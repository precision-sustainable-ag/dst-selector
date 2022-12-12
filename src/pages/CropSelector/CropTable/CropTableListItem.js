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
        ((crop['Zone Decision'] === 'Include') && (matchGoals ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop)))
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
                        present={!!crop['Image Data']}
                        src={
                          crop['Image Data'] && crop['Image Data']['Key Thumbnail']
                            ? crop['Image Data']['Key Thumbnail']
                            : 'https://placehold.it/100x100'
                        }
                        alt={crop['Image Data'] && crop['Cover Crop Name']}
                      />
                    </div>
                    <div className="col-auto pl-md-0">
                      <div className="col-12 p-md-0">
                        <Typography variant="h6">
                          {flipCoverCropName(crop['Cover Crop Name'])}
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
                          {trimString(crop['Scientific Name'], 25)}
                        </Typography>
                      </div>
                      <div className="col-12 p-md-0">
                        <Typography
                          variant="subtitle2"
                          className="text-uppercase"
                          style={{ color: 'gray' }}
                        >
                          {crop['Cover Crop Group']}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <table>
                  <tbody>
                    {crop['Cover Crop Group'].toLowerCase() === 'legume' && (
                    <tr>
                      <td>
                        <Typography variant="subtitle2" component="b" className="">
                          TOTAL N:
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="subtitle2" component="b">
                          {crop['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}
                          -
                          {crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}
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
                          {crop['Dry Matter Min (lbs/A/y)']}
                          -
                          {crop['Dry Matter Max (lbs/A/y)']}
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
                          {crop.Duration.toString().toLowerCase()
                          === 'short-lived perennial'
                            ? 'Perennial'
                            : crop.Duration.toString()}
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
