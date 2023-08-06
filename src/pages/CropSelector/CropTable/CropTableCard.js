import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CustomStyles, getRating, LightButton } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/cropCalendarViewComponent.scss';
import '../../../styles/cropTable.scss';
import CropSelectorCalendarView from '../../../components/CropSelectorCalendarView/CropSelectorCalendarView';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { snackHandler } from '../../../reduxStore/sharedSlice';

const CropTableCard = ({
  crop, indexKey, showGrowthWindow, handleModalOpen,
}) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const goalsLength = state.selectedGoals.length;

  const selectedBtns = selectedCropsRedux.map((cropId) => cropId.id);

  const cropModifierAction = (selectedCrops, message) => {
    dispatchRedux(selectedCropsModifier(selectedCrops));
    dispatchRedux(snackHandler({ snackOpen: false, snackMessage: message }));
    // dispatch({
    //   type: 'SELECTED_CROPS_MODIFIER',
    //   data: {
    //     selectedCrops,
    //     snackOpen: false,
    //     snackMessage: message,
    //   },
    // });
    enqueueSnackbar(message);
  };

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    const selectedCrops = {};
    let cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.btnId = btnId;
    selectedCrops.data = cropData;
    cropArray = selectedCrops;

    // check if crop id exists inside state, if yes then remove it
    if (selectedCropsRedux.length > 0) {
      let removeIndex = -1;
      selectedCropsRedux.forEach((item, i) => {
        if (item.id === cropId) {
          removeIndex = i;
        }
      });
      if (removeIndex === -1) {
        cropModifierAction([...selectedCropsRedux, selectedCrops], `${cropName} Added`);
      } else {
        // element exists, remove
        const selectedCropsCopy = selectedCropsRedux;
        selectedCropsCopy.splice(removeIndex, 1);
        cropModifierAction(selectedCropsCopy, `${cropName} Removed`);
      }
    } else {
      dispatch({
        type: 'MY_CROP_LIST_LOCATION',
        data: { from: 'selector' },
      });

      cropModifierAction([cropArray], `${cropName} Added`);
    }
  };

  return (
    <>
      {goalsLength > 0
        && state.selectedGoals.map((goal, index) => (
          <TableCell style={{ textAlign: 'center' }} key={index} className="goalCells">
            <div>
              <Tooltip
                arrow
                placement="bottom"
                title={(
                  <div className="filterTooltip text-capitalize">
                    <p>
                      {`Goal ${index + 1}`}
                      {': '}
                      {goal}
                    </p>
                  </div>
                )}
              >
                {getRating(crop.data.Goals[goal]?.values[0])}
              </Tooltip>
            </div>
          </TableCell>
        ))}

      {showGrowthWindow && (
        <TableCell style={{ width: goalsLength === 0 && '50%' }}>
          <CropSelectorCalendarView data={crop} from="listView" />
        </TableCell>
      )}

      <TableCell style={{ maxWidth: '150px', textAlign: 'center' }}>
        <div className="d-flex w-100 justify-content-center align-items-center flex-column">
          <LightButton
            id={`cartBtn${indexKey}`}
            style={{
              borderRadius: CustomStyles().nonRoundedRadius,
              width: '150px',
            }}
            className={selectedBtns.includes(crop.id) ? 'activeCartBtn' : 'inactiveCartBtn'}
            onClick={() => {
              addCropToBasket(
                crop.id,
                crop.label,
                `cartBtn${indexKey}`,
                crop,
              );
            }}
          >
            {selectedBtns.includes(crop.id) ? 'REMOVE' : 'ADD TO LIST'}
          </LightButton>
          {' '}
          <Button size="small" onClick={() => handleModalOpen(crop)}>
            View Details
          </Button>
        </div>
      </TableCell>
    </>
  );
};

export default CropTableCard;
