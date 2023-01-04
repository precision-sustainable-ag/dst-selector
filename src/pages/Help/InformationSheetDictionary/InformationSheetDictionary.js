/*
  Static component listed in help page
  fetches data from DictionaryContent
*/

import { Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { Context } from '../../../store/Store';
import DictionaryContent from './DictionaryContent';

const InformationSheetDictionary = ({ zone, from }) => {
  const [dictionary, setDictionary] = useState([]);
  const { state } = useContext(Context);
  const section = window.location.href.includes('selector') ? 'selector' : 'explorer';
  const sfilters = state[section];

  const currentZone = zone || sfilters.zone;

  useEffect(() => {
    document.title = 'Data Dictionary';

    async function getDictData() {
      await fetch(`https://api.covercrop-selector.org/legacy/data-dictionary?zone=zone${currentZone}`)
        .then((res) => res.json())
        .then((data) => { setDictionary(data); })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }

    getDictData();
  }, [zone]);

  return from === 'help' ? (
    <DictionaryContent dictData={dictionary} from="help" />
  ) : (
    <>
      <div className="row pt-4">
        <div
          className="col-12"
          style={{
            backgroundColor: 'rgb(43, 123, 121)',
            height: '50px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        />
      </div>
      <div className="row mt-4 p-3">
        <div className=" col-12">
          <Typography variant="h4">Information Sheet Dictionary</Typography>
        </div>
        <div className="col-12">
          <Typography variant="body2">
            <Info style={{ color: 'rgb(43, 123, 121)' }} />
            {' '}
&nbsp; These terms and definitions are
            based on expert opinion
          </Typography>
        </div>
      </div>
      <hr />

      <DictionaryContent dictData={dictionary} />
    </>
  );
};

export default InformationSheetDictionary;
