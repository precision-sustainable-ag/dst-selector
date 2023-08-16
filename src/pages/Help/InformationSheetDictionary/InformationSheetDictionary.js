/*
  Static component listed in help page
  fetches data from DictionaryContent
*/

import { Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import React, {
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import DictionaryContent from './DictionaryContent';
import { callCoverCropApi } from '../../../shared/constants';

const InformationSheetDictionary = ({ zone, from }) => {
  // redux vars
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [dictionary, setDictionary] = useState([]);
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = filterStateRedux[section];

  const currentZone = zone || sfilters.zone;

  useEffect(() => {
    document.title = 'Data Dictionary';
    if (currentZone) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/legacy/data-dictionary?zone=zone${currentZone}`)
        .then((data) => { setDictionary(data); });
    }
  }, [zone]);

  return from === 'help' ? (
    <DictionaryContent dictData={dictionary} from="help" />
  ) : (
    <>
      <div
        style={{
          backgroundColor: 'rgb(43, 123, 121)',
          height: '50px',
          width: '100%',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
      />
      <Typography
        variant="h4"
        style={{ marginLeft: '1.5%', marginTop: '4%', width: '100%' }}
      >
        Information Sheet Dictionary
      </Typography>
      <Typography
        variant="body2"
        style={{ marginLeft: '1.5%' }}
      >
        <Info style={{ color: 'rgb(43, 123, 121)' }} />
        {' '}
        &nbsp; These terms and definitions are
        based on expert opinion
      </Typography>
      <hr />

      <DictionaryContent dictData={dictionary} />
    </>
  );
};

export default InformationSheetDictionary;
