import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React, {
  useEffect, useState,
} from 'react';
import { PSACropCard } from 'shared-react-components/src';
import { useSelector } from 'react-redux';
import { addCropToBasket } from '../../shared/constants';
import { myCropListLocation, snackHandler } from '../../reduxStore/sharedSlice';
import { updateSelectedCropIds } from '../../reduxStore/cropSlice';
import { setSaveHistory } from '../../reduxStore/userSlice';
// import CropDetailsModal from '../CropDetailsModal/CropDetailsModal';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import { InfoSheetTitle } from '../CropDetailsModal/CropDetailsModal';

const CropCard = ({
  crop, dispatchRedux,
}) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const soilDrainageFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.soilDrainageFilter);

  // useState vars
  const [selectedBtns, setSelectedBtns] = useState(selectedCropIdsRedux);

  async function updateBtns() {
    await setSelectedBtns(selectedCropIdsRedux);
  }

  useEffect(() => {
    updateBtns();
  }, [selectedCropIdsRedux]);

  async function addToBasket(cropId, name) {
    addCropToBasket(
      cropId,
      name,
      dispatchRedux,
      snackHandler,
      updateSelectedCropIds,
      selectedCropIdsRedux,
      myCropListLocation,
      historyStateRedux,
      'explorer',
      setSaveHistory,
    );
    await updateBtns();
  }

  const needsRotation = (c) => {
    const rotatedCropIds = ['Beans, Faba', 'Millet, Proso', 'Sudangrass'];
    return rotatedCropIds.includes(c.label);
  };

  const hasExcessiveDrainage = crop.soilDrainage?.includes('Excessively drained');
  const shouldHighlightRed = hasExcessiveDrainage && soilDrainageFilterRedux;

  return (
    <PSACropCard
      species={crop.label}
      scientific={crop.scientificName}
      details={<InformationSheetContent crop={crop} />}
      title={<InfoSheetTitle />}
      thumbnail={crop.thumbnailWide}
      fullsize={crop.thumbnail}
      portrait={crop.thumbnail}
      selected={selectedBtns.includes(crop.id)}
      onSelect={() => {
        addToBasket(
          crop.id,
          crop.label,
        );
      }}
      onRemove={() => {
        addToBasket(
          crop.id,
          crop.label,
        );
      }}
      sx={{
        minHeight: '',
        '.heading': {
          minHeight: '',
        },
        img: {
          left: 0,
          transform: needsRotation(crop) ? 'rotate(90deg) scale(1.9)' : 'none',
          border: shouldHighlightRed ? '4px solid red' : 'none',
        },
        marginBottom: '1rem',
      }}
      infoSheetProps={{ fullScreen: isMobile }}
    />
  );
};

export default CropCard;
