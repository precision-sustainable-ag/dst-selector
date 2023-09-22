/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  Contains the individual crops in a component
  removeCrop handles removing a crop from the list
*/
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const MyCoverCropCards = ({ crop, cardNo }) => {
  // const dispatchRedux = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatchRedux = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleModalOpen = () => {
    setModalData(crop.data);
    setModalOpen(true);
  };

  return (
    <div className={`${cardNo === 1 ? 'pl-0 pr-2 pt-2 pb-2' : 'p-2'}`}>
      <CropCard
        crop={crop}
        index={cardNo}
        type="cropList"
        handleModalOpen={handleModalOpen}
        dispatchRedux={dispatchRedux}
        enqueueSnackbar={enqueueSnackbar}
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
