import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableCell, Box } from '@mui/material';
import { AddCircleOutline, DeleteForever } from '@mui/icons-material';
import { PSAButton } from 'shared-react-components/src';
import { addCropToBasket, getRating } from '../../../shared/constants';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import { updateSelectedCropIds } from '../../../reduxStore/cropSlice';
import { myCropListLocation, snackHandler } from '../../../reduxStore/sharedSlice';
import { setSaveHistory } from '../../../reduxStore/userSlice';
import PSATooltip from '../../../components/PSAComponents/PSATooltip';

const tooltipContent = (currCrop, goal, councilShorthandRedux) => (
  getRating(currCrop.goals.filter((a) => a.label === goal)[0].values[0].value, councilShorthandRedux)
);

const CropTableCard = ({ crop, indexKey, showGrowthWindow }) => {
  const dispatchRedux = useDispatch();
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  const selectedBtns = selectedCropIdsRedux;
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);

  return (
    <>
      {selectedGoalsRedux.length > 0
        && selectedGoalsRedux.map((goal, index) => (

          <TableCell
            size="small"
            style={{
              textAlign: 'center',
            }}
            key={index}
            className="goalCells"
          >
            <div>
              <PSATooltip
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
                tooltipContent={tooltipContent(crop, goal, councilShorthandRedux)}
              />
            </div>
          </TableCell>
        ))}

      {showGrowthWindow && (
        <TableCell size="small" style={{ maxWidth: 200 }}>
          <CropSelectorCalendarView data={crop} from="listView" />
        </TableCell>
      )}

      <TableCell
        size="small"
        style={{
          maxWidth: '150px',
          textAlign: 'center',
          backgroundColor: selectedCropIdsRedux.includes(crop.id) && '#EAEAEA',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <PSAButton
            id={`cartBtn${indexKey}`}
            style={{
              backgroundColor: selectedCropIdsRedux.includes(crop.id) ? '#EAEAEA' : 'white',
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
                historyStateRedux,
                'selector',
                setSaveHistory,
              );
            }}
            buttonType="LightButton"
            title={selectedBtns.includes(crop.id) ? <DeleteForever /> : <AddCircleOutline />}
          />
        </Box>
      </TableCell>
    </>
  );
};

export default CropTableCard;
