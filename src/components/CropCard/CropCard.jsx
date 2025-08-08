import React, {
  useEffect, useState,
} from 'react';
import { PSACropCard } from 'shared-react-components/src';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addCropToBasket } from '../../shared/constants';
import InformationSheetContent from '../InformationSheet/InformationSheetContent/InformationSheetContent';
import { InfoSheetTitle } from '../InformationSheet/InformationSheet';
import useIsMobile from '../../hooks/useIsMobile';

const CropCard = ({
  crop, dispatchRedux,
}) => {
  const isMobile = useIsMobile('sm');

  // redux vars
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const historyStateRedux = useSelector((stateRedux) => stateRedux.userData.historyState);
  const soilDrainageFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.soilDrainageFilter);

  // useState vars
  const [selectedBtns, setSelectedBtns] = useState(selectedCropIdsRedux);

  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar,
      selectedCropIdsRedux,
      historyStateRedux,
      'explorer',
    );
    await updateBtns();
  }

  const needsRotation = (c) => {
    const rotatedCropIds = ['Beans, Faba', 'Millet, Proso', 'Sudangrass'];
    return rotatedCropIds.includes(c.label);
  };

  const hasExcessiveDrainage = crop.soilDrainage?.includes('Excessively drained');
  const shouldHighlightRed = hasExcessiveDrainage && soilDrainageFilterRedux;

  const placeHolderImg = 'https://placehold.co/260x140?text=Placeholder';

  return (
    <PSACropCard
      species={crop.label}
      scientific={crop.scientificName}
      details={<InformationSheetContent crop={crop} />}
      title={<InfoSheetTitle crop={crop} />}
      thumbnail={crop.thumbnailWide ?? placeHolderImg}
      fullsize={crop.thumbnail}
      portrait
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
        img: {
          top: 0,
          left: 0,
          height: '100%',
          transform: needsRotation(crop) ? 'rotate(90deg) scale(1.9)' : 'none',
          border: shouldHighlightRed ? '4px solid red' : 'none',
        },
        minHeight: isMobile ? '160px' : '260px',
      }}
      infoSheetProps={{ fullScreen: isMobile }}
    />
  );
};

export default CropCard;
