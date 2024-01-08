import React from 'react';
import { useSelector } from 'react-redux';
import {
  TableCell, Typography, TableRow, Button,
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

const RenderTableItems = ({
  showGrowthWindow, handleModalOpen,
}) => {
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);

  return cropDataRedux.sort((a, b) => (a.inactive - b.inactive)).map((crop, index) => {
    if (
      !crop.inactive
        ? !hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
        : hasGoalRatingTwoOrLess(selectedGoalsRedux, crop)
    ) {
      // const duration = (crop.attributes?.filter((attr) => attr.label === 'Duration')[0]?.values[0]?.toString().toLowerCase()
      // === 'short-lived perennial'
      //   ? 'Perennial'
      //   : crop.attributes.filter((attr) => attr.label === 'Duration')[0]?.values[0]) || 'No Data';
      // const maxN = crop.attributes.filter((attr) => attr.label === 'Nitrogen Accumulation Min, Legumes (lbs/A/y)')[0]?.values[0];
      // const minN = crop.attributes.filter((attr) => attr.label === 'Nitrogen Accumulation Max, Legumes (lbs/A/y)')[0]?.values[0];
      // const totalN = minN && maxN ? `${minN} - ${maxN}` : 'No Data';
      // const dryMatterMax = crop.attributes.filter((attr) => attr.label === 'Dry Matter Max (lbs/A/y)')[0]?.values[0];
      // const dryMatterMin = crop.attributes.filter((attr) => attr.label === 'Dry Matter Min (lbs/A/y)')[0]?.values[0];
      // const dryMatter = crop.attributes.filter((attr) => attr.label === 'Dry Matter')[0]?.values[0]
      // || ((dryMatterMin && dryMatterMax) && `${dryMatterMin} - ${dryMatterMax}`)
      // || 'No Data';

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
            <div className="container-fluid">
              <div className="row">
                <div className="col-auto pl-md-0">
                  <Button onClick={() => handleModalOpen(crop)}>
                    <CropImage
                      present={!!crop.thumbnail}
                      src={crop.thumbnail ? crop.thumbnail : 'https://placehold.it/100x100'}
                      alt={crop.label}
                    />
                  </Button>
                </div>
                <div
                  className="col-auto pl-md-0 text-left"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <Typography variant="h7" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                      {flipCoverCropName(crop.label)}
                    </Typography>
                  </div>
                  <div>
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
                      {crop.scientificName && trimString(crop.scientificName, 25)}
                    </Typography>
                  </div>
                  {/* <div className="col-12 p-md-0"> */}
                  <div>
                    <Typography variant="body1" style={{ color: 'gray', fontSize: 'small' }}>
                      {crop.group}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </TableCell>
          {cropDataRedux[0].keyTraits.length > 0
              && (
              <TableCell size="small" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <table>
                  <tbody>
                    {console.log(crop)}
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
                            {trait.values.map((val) => (val))}
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
