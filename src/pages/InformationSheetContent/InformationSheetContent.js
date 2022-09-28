/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  MonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
  styled using makeStyles and withStyles
*/

import React, {
  useContext, useEffect, useState,
} from 'react';
import { Context } from '../../store/Store';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import sources from '../../shared/json/sources/sources.json';
import InformationSheetGoals from './InformationSheetGoals/InformationSheetGoals';
import InformationSheetWeeds from './InformationSheetWeeds/InformationSheetWeeds';
import InformationSheetEnvironment from './InformationSheetEnvironment/InformationSheetEnvironment';
import GrowthTraits from './GrowthTraits/GrowthTraits';
import SoilDrainageInfoContent from './SoilDrainageInfoContent/SoilDrainageInfoContent';
import TerminationInfo from './TerminationInfo/TerminationInfo';
import InformationSheetPlanting from './InformationSheetPlanting/InformationSheetPlanting';
import PlantingAndGrowthWindows from './PlantingAndGrowthWindows/PlantingAndGrowthWindows';
import ExtendedComments from './ExtendedComments/EntendedComments';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';

const InformationSheetContent = (props) => {
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const { zone } = state[section];
  const { crop } = props;
  const [currentSources, setCurrentSources] = useState([{}]);

  const [pdf, setPDF] = useState(false);

  useEffect(() => {
    document.title = `${crop['Cover Crop Name']} Zone ${zone}`;
    fetch(`/pdf/${document.title}.pdf`)
      .then((response) => response.text())
      .then((data) => {
        if (data.includes('PDF')) {
          setPDF(true);
        }
      });

    const regex = /(?!\B"[^"]*),(?![^"]*"\B)/g;
    const removeDoubleQuotes = /^"(.+(?="$))"$/;
    const relevantZones = sources.filter((source) => {
      const zones = source.Zone.split(',').map((item) => item.trim());
      const coverCrops = source['Cover Crops']
        .split(regex)
        .map((item) => item.replace(removeDoubleQuotes, '$1'))
        .map((item) => item.trim());

      return zones.includes(`Zone ${zone}`) && coverCrops.includes(crop['Cover Crop Name']);
    });

    setCurrentSources(relevantZones);
    document.body.classList.add('InfoSheet');

    return () => {
      document.title = 'Cover Crop Explorer';
      document.body.classList.remove('InfoSheet');
    };
  }, [crop, zone]);

  return Object.keys(crop).length > 0 ? (
    <>
      {pdf && <iframe id="PDF" title="pdf" src={`/pdf/${document.title}.pdf`} />}

      <CoverCropInformation
        cropImage={crop['Image Data'] || null}
        cropDescription={
          crop['Cover Crop Description'] ? crop['Cover Crop Description'] : crop['Crop Description']
        }
      />

      <InformationSheetGoals
        crop={crop}
        cropZone={crop.Zone}
        cropGrowingWindow={crop['Growing Window']}
      />

      <div className="row otherRows mb-4 avoidPage">
        <InformationSheetWeeds crop={crop} />
        <InformationSheetEnvironment crop={crop} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <GrowthTraits crop={crop} />
        <SoilDrainageInfoContent crop={crop} />
      </div>

      <div className="row otherRows mb-4 avoidPage">
        <InformationSheetPlanting crop={crop} />
        <TerminationInfo crop={crop} />
      </div>

      <PlantingAndGrowthWindows crop={crop} />

      <ExtendedComments crop={crop} />

      <InformationSheetReferences currentSources={currentSources} />
    </>
  ) : (
    ''
  );
};

export default InformationSheetContent;
