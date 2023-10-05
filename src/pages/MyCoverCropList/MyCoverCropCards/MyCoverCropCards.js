/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
  Contains the individual crops in a component
  removeCrop handles removing a crop from the list
*/
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CropCard from '../../../components/CropCard/CropCard';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const MyCoverCropCards = ({ crop, cardNo }) => {
  // const dispatchRedux = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatchRedux = useDispatch();

  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleModalOpen = () => {
    setModalData(crop);
    setModalOpen(true);
  };

  return (
    <>
      <CropCard
        crop={crop}
        index={cardNo}
        type="cropList"
        handleModalOpen={handleModalOpen}
        dispatchRedux={dispatchRedux}
      />

      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </>
  );
};

export default MyCoverCropCards;
