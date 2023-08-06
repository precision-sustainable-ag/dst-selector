/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  Contains the individual crops in a component
  removeCrop handles removing a crop from the list
*/
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Context } from '../../../store/Store';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import { selectedCropsModifier } from '../../../reduxStore/cropSlice';
import { snackHandler } from '../../../reduxStore/sharedSlice';

const MyCoverCropCards = ({ data, cardNo }) => {
  const { state, dispatch } = useContext(Context);
  const dispatchRedux = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const removeCrop = (cropName, id) => {
    let removeIndex = -1;
    selectedCropsRedux.forEach((item, i) => {
      if (item.id === id) {
        removeIndex = i;
      }
    });

    if (removeIndex === -1) {
      // element not in array
      // not possible ?
    } else {
      const selectedCropsCopy = selectedCropsRedux;

      selectedCropsCopy.splice(removeIndex, 1);
      dispatchRedux(selectedCropsModifier(selectedCropsCopy));
      console.log('snack');
      dispatchRedux(snackHandler({ snackOpen: false, snackMessage: 'Removed' }));
      // dispatch({
      //   type: 'SELECTED_CROPS_MODIFIER',
      //   data: {
      //     selectedCrops: selectedCropsCopy,
      //     snackOpen: false,
      //     snackMessage: 'Removed',
      //   },
      // });
      enqueueSnackbar(`${cropName} Removed`);
    }
  };

  const handleModalOpen = () => {
    setModalData(data);
    setModalOpen(true);
  };

  return (
    <div className={`${cardNo === 1 ? 'pl-0 pr-2 pt-2 pb-2' : 'p-2'}`}>
      <CropCard
        crop={data}
        index={cardNo}
        type="cropList"
        handleModalOpen={handleModalOpen}
        removeCrop={removeCrop}
      />

      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </div>
  );
};

export default MyCoverCropCards;
