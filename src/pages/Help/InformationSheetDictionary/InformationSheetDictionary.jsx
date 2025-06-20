/*
  Static component listed in help page
  fetches data from DictionaryContent
*/

import { Typography, Box } from '@mui/material';
import { Info } from '@mui/icons-material';
import React, {
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { PSALoadingSpinner } from 'shared-react-components/src';
import DictionaryContent from './DictionaryContent';
import { callCoverCropApi } from '../../../shared/constants';

const InformationSheetDictionary = ({ zone, from }) => {
  // redux vars
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [dictionary, setDictionary] = useState([]);
  const stateId = +localStorage.getItem('stateId');
  const regionId = +localStorage.getItem('regionId');
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionId)}`;

  useEffect(() => {
    document.title = 'Data Dictionary';
    if (stateId && regionId) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateId}/dictionary?${query}`)
        .then((data) => {
          setDictionary(data.data);
        });
    }
  }, [regionId, stateId, zone]);

  if (dictionary.length === 0) {
    return (
      <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <PSALoadingSpinner />
      </Box>
    );
  }

  if (from === 'help') {
    return <DictionaryContent dictData={dictionary} from="help" />;
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgb(43, 123, 121)',
          height: '50px',
          width: '100%',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
      />
      <Typography
        variant="h4"
        sx={{ ml: '1.5%', mt: '4%', width: '100%' }}
      >
        Terminology Definitions
      </Typography>
      <Typography
        variant="body2"
        sx={{ ml: '1.5%', display: 'flex', alignItems: 'center' }}
      >
        <Info sx={{ color: 'rgb(43, 123, 121)', mr: 1 }} />
        These terms and definitions are based on expert opinion
      </Typography>
      <hr />

      <DictionaryContent dictData={dictionary} from="help" />

      <Typography
        variant="body2"
        align="center"
        p="1rem"
      >
        If you didn&apos;t find what you were looking for it may be located
        {' '}
        <a
          href="https://www.nrcs.usda.gov/sites/default/files/2022-08/SSURGO-Metadata-Domains-Report.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </Typography>
    </>
  );
};

export default InformationSheetDictionary;
