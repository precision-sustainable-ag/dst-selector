import React, { useContext } from 'react';
import { Button, TableCell, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CustomStyles, getRating, LightButton } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropCalendarViewComponent.scss';
import '../../styles/cropTable.scss';
import CropSelectorCalendarView from './CropSelectorCalendarView';

export const CropTableCard = ({ crop, indexKey, showGrowthWindow, handleModalOpen }) => {
  const { state, dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  let goalsLength = state.selectedGoals.length;

  const selectedBtns = state.selectedCrops.map((crop) => {
    return crop.id;
  });

  const addCropToBasket = (cropId, cropName, btnId, cropData) => {
    let selectedCrops = {};
    let cropArray = [];
    selectedCrops.id = cropId;
    selectedCrops.cropName = cropName;
    selectedCrops.btnId = btnId;
    selectedCrops.data = cropData;
    cropArray = selectedCrops;
    // // check if crop id exists inside state, if yes then remove it

    if (state.selectedCrops.length > 0) {
      let removeIndex = state.selectedCrops
        .map(function (item) {
          return item.id;
        })
        .indexOf(`${cropId}`);
      if (removeIndex === -1) {
        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: [...state.selectedCrops, selectedCrops],
            snackOpen: false,
            snackMessage: `${cropName} Added`,
          },
        });
        enqueueSnackbar(`${cropName} Added`);
      } else {
        // element exists, remove
        let selectedCropsCopy = state.selectedCrops;

        selectedCropsCopy.splice(removeIndex, 1);

        dispatch({
          type: 'SELECTED_CROPS_MODIFIER',
          data: {
            selectedCrops: selectedCropsCopy,
            snackOpen: false,
            snackMessage: `${cropName} Removed`,
          },
        });
        enqueueSnackbar(`${cropName} Removed`);
      }
    } else {
      dispatch({
        type: 'SELECTED_CROPS_MODIFIER',
        data: {
          selectedCrops: [cropArray],
          snackOpen: false,
          snackMessage: `${cropName} Added`,
        },
      });
      enqueueSnackbar(`${cropName} Added`);
    }
  };

  return (
    <>
      {goalsLength > 0 &&
        state.selectedGoals.map((goal, index) => (
          <TableCell style={{ textAlign: 'center' }} key={index} className="goalCells">
            <div>
              <Tooltip
                arrow
                placement="bottom"
                title={
                  <div className="filterTooltip text-capitalize">
                    <p>
                      {`Goal ${index + 1}`}
                      {': '}
                      {goal}
                    </p>
                  </div>
                }
              >
                {getRating(crop.fields[goal])}
              </Tooltip>
            </div>
          </TableCell>
        ))}

      {showGrowthWindow && (
        <TableCell style={{ width: goalsLength === 0 && '50%' }}>
          <CropSelectorCalendarView data={crop} from={'listView'} />
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
            className={selectedBtns.includes(crop.fields.id) ? 'activeCartBtn' : 'inactiveCartBtn'}
            onClick={() => {
              addCropToBasket(
                crop.fields['id'],
                crop.fields['Cover Crop Name'],
                `cartBtn${indexKey}`,
                crop.fields,
              );
            }}
          >
            {selectedBtns.includes(crop.fields.id) ? 'ADDED' : 'ADD TO LIST'}
          </LightButton>{' '}
          <Button size="small" onClick={() => handleModalOpen(crop)}>
            View Details
          </Button>
        </div>
      </TableCell>
    </>
  );
};
