/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, {
  useContext, useEffect, useState,
} from 'react';
import { Context } from '../../store/Store';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetGoals from './InformationSheetGoals/InformationSheetGoals';
import InformationSheetWeeds from './InformationSheetWeeds/InformationSheetWeeds';
import InformationSheetEnvironment from './InformationSheetEnvironment/InformationSheetEnvironment';
import GrowthTraits from './GrowthTraits/GrowthTraits';
import SoilDrainageInfoContent from './SoilDrainageInfoContent/SoilDrainageInfoContent';
import TerminationInfo from './TerminationInfo/TerminationInfo';
import InformationSheetPlanting from './InformationSheetPlanting/InformationSheetPlanting';
import PlantingAndGrowthWindows from './PlantingAndGrowthWindows/PlantingAndGrowthWindows';
// import ExtendedComments from './ExtendedComments/ExtendedComments';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';

const InformationSheetContent = ({ crop }) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const { zone } = state[section];
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;

  async function getSourceData() {
    await fetch(`https://developapi.covercrop-selector.org/v1/crops/${crop.id}/resources?${query}`)
      .then((res) => res.json())
      .then((data) => setCurrentSources(data.data))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  async function getData() {
    await fetch(`https://developapi.covercrop-selector.org/v1/crops/${crop.id}/images?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setAllThumbs(data.data);
        setDataDone(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  useEffect(() => {
    document.title = `${crop.label} Zone ${zone}`;
    getSourceData();
    getData();
  }, [crop, zone]);

  return dataDone === true && Object.keys(crop.data).length > 0 ? (
    <>
      <CoverCropInformation
        allThumbs={allThumbs}
        cropDescription={
          crop.data['Taxonomy & Listing']['Cover Crop Description'].values[0]
            ? crop.data['Taxonomy & Listing']['Cover Crop Description'].values[0] : ''
        }
        crop={crop}
      />

      <InformationSheetGoals
        crop={crop}
        cropZone={state.zone}
        cropGrowingWindow={crop.data.Growth['Growing Window'].values[0]}
      />

      <div className="row otherRows mb-4 avoidPage">
        <InformationSheetWeeds crop={crop} zone={state.zone} />
        <InformationSheetEnvironment crop={crop.data['Environmental Tolerances']} zone={state.zone} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <GrowthTraits crop={crop} />
        <SoilDrainageInfoContent crop={crop.data['Soil Conditions']['Soil Drainage']} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <InformationSheetPlanting crop={crop} />
        <TerminationInfo crop={crop.data.Termination} />
      </div>

      <PlantingAndGrowthWindows crop={crop} />

      {/* <ExtendedComments crop={crop} /> Notes: section */}

      <InformationSheetReferences currentSources={currentSources} />
    </>
  ) : (
    ''
  );
};

export default InformationSheetContent;
