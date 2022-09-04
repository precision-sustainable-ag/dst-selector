import React, { Fragment, useContext } from 'react';
import { TableCell, Typography, TableRow } from '@mui/material';
import { CropImage, flipCoverCropName, trimString } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropCalendarViewComponent.scss';
import '../../styles/cropTable.scss';
import { CropTableCard } from './CropTableCard';

const CropTableListItem = ({ activeCropData, matchGoals, showGrowthWindow, handleModalOpen }) => {
  const { state } = useContext(Context);
  const activeCropPresent = () => {
    return activeCropData.length > 0;
  };

  const hasGoalRatingTwoOrLess = (crop = []) => {
    const { selectedGoals } = state;
    return crop.inactive || selectedGoals.every((rating) => crop.fields[rating] <= 2);
  };

  return (
    activeCropPresent &&
    activeCropData.map((crop, index) => {
      if (
        crop.fields['Zone Decision'] === 'Include' &&
        (matchGoals ? !hasGoalRatingTwoOrLess(crop) : hasGoalRatingTwoOrLess(crop))
      )
        return (
          <Fragment key={index}>
            <TableRow
              className={hasGoalRatingTwoOrLess(crop) && 'inactiveCropRow'}
              key={`croprow${index}`}
              id={crop.fields['id']}
              style={{ opacity: hasGoalRatingTwoOrLess(crop) && '0.2' }}
            >
              <TableCell style={{ height: 'auto' }}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-auto pl-md-0">
                      <CropImage
                        present={crop.fields['Image Data'] ? true : false}
                        src={
                          crop.fields['Image Data'] && crop.fields['Image Data']['Key Thumbnail']
                            ? `/images/Cover Crop Photos/100x100/${crop.fields['Image Data']['Directory']}/${crop.fields['Image Data']['Key Thumbnail']}`
                            : 'https://placehold.it/100x100'
                        }
                        alt={crop.fields['Image Data'] && crop.fields['Cover Crop Name']}
                      />
                    </div>
                    <div className="col-auto pl-md-0">
                      <div className="col-12 p-md-0">
                        <Typography variant="h6">
                          {flipCoverCropName(crop.fields['Cover Crop Name'])}
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
                          {trimString(crop.fields['Scientific Name'], 25)}
                        </Typography>
                      </div>
                      <div className="col-12 p-md-0">
                        <Typography
                          variant="subtitle2"
                          className="text-uppercase"
                          style={{ color: 'gray' }}
                        >
                          {crop.fields['Cover Crop Group']}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <table>
                  <tbody>
                    {crop.fields['Cover Crop Group'].toLowerCase() === 'legume' && (
                      <tr>
                        <td>
                          <Typography variant="subtitle2" component="b" className="">
                            TOTAL N:
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="subtitle2" component="b">
                            {crop.fields['Nitrogen Accumulation Min, Legumes (lbs/A/y)']}-
                            {crop.fields['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}
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
                          {crop.fields['Dry Matter Min (lbs/A/y)']}-
                          {crop.fields['Dry Matter Max (lbs/A/y)']}
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
                          {crop.fields['Duration'].toString().toLowerCase() ===
                          'short-lived perennial'
                            ? 'Perennial'
                            : crop.fields['Duration'].toString()}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </TableCell>
              {
                <CropTableCard
                  crop={crop}
                  indexKey={index}
                  showGrowthWindow={showGrowthWindow}
                  handleModalOpen={handleModalOpen}
                />
              }
            </TableRow>
          </Fragment>
        );
    })
  );
};

export default CropTableListItem;
