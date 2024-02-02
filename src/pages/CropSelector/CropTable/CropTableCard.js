import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell, Tooltip, Box } from '@mui/material';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { addCropToBasket, getRating, LightButton } from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import { updateSelectedCropIds } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';

const CropTableCard = ({ crop, indexKey, showGrowthWindow }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  const selectedBtns = selectedCropIdsRedux;

  // TODO: Update SelectedCropsRedux

  return (
    <>
      {selectedGoalsRedux.length > 0
        && selectedGoalsRedux.map((goal, index) => (
          <TableCell size="small" style={{ textAlign: 'center' }} key={index} className="goalCells">
            <div>
              <Tooltip
                arrow
                placement="bottom"
                enterTouchDelay={0}
                title={(
                  <p>
                    {`Goal ${index + 1}`}
                    {': '}
                    {goal}
                  </p>
                )}
              >
                {getRating(crop.data.Goals[goal]?.values[0])}
              </Tooltip>
            </div>
          </TableCell>
        ))}

      {showGrowthWindow && (
        <TableCell size="small" style={{ width: 200 }}>
          <CropSelectorCalendarView data={crop} from="listView" />
        </TableCell>
      )}

      <TableCell size="small" style={{ maxWidth: '150px', textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <LightButton
            id={`cartBtn${indexKey}`}
            style={{
              backgroundColor: 'white',
              color: selectedBtns.includes(crop.id) ? '#d32f2f' : '#2d7b7b',
            }}
            className={selectedBtns.includes(crop.id) ? 'activeCartBtn' : 'inactiveCartBtn'}
            onClick={() => {
              addCropToBasket(
                crop.id,
                crop.label,
                dispatchRedux,
                snackHandler,
                updateSelectedCropIds,
                selectedCropIdsRedux,
                myCropListLocation,
              );
            }}
          >
            {selectedBtns.includes(crop.id) ? <DeleteForever /> : <AddCircleOutline />}
          </LightButton>
        </Box>
      </TableCell>
    </>
  );
};

export default CropTableCard;
