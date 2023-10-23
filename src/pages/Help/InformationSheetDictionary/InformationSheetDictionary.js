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
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [dictionary, setDictionary] = useState([]);
  const stateId = +localStorage.getItem('stateId');
  const region = +localStorage.getItem('region');

  useEffect(() => {
    document.title = 'Data Dictionary';
    if (stateId && region) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateId}/dictionary?regions=${region}`)
        .then((data) => {
          setDictionary(data.data);
        });
    }
  }, [region, stateId, zone]);

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
