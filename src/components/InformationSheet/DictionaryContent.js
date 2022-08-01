/*
  Contains the data listed in InformationSheetContent
  RenderCats renders the categories
*/

import { Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState, Fragment } from 'react';

const DictionaryContent = ({ dictData = [{}], from = '' }) => {
  const [groupedCats, setGroupedCats] = useState({});

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };

  const allCats = useMemo(() => {
    return dictData.filter(
      (dict) => dict['Information Sheet'] === true || dict['Infromation Sheet'] === true,
    );
  }, [dictData]);

  useEffect(() => {
    const groupedCategories = groupBy(allCats, 'Category');
    setGroupedCats(groupedCategories);
  }, [allCats]);

  const RenderCats = () => {
    return Object.keys(groupedCats).map((key, index) => (
      <div className="row col-12" key={index}>
        <div className="col-12">
          <Typography
            variant="h6"
            style={from === 'help' ? { border: '0px', borderBottom: '1px solid gray' } : {}}
          >
            {key}
          </Typography>
        </div>
        {groupedCats[key].map((innerCat, index2) => {
          if (from === 'help') {
            if (!innerCat['Variable'].startsWith('Notes')) {
              return (
                <div className="col-6" key={index2}>
                  <Typography variant="body1" className="p-3">
                    <b>{innerCat['Variable']}:</b> {innerCat['Description']}
                  </Typography>
                </div>
              );
            } else return <Fragment />;
          } else {
            return (
              <div className="col-6" key={index2}>
                <Typography variant="body1" className="p-3">
                  <b>{innerCat['Variable']}:</b> {innerCat['Description']}
                </Typography>
              </div>
            );
          }
        })}
      </div>
    ));

    // return catOptions;
  };

  return (
    <div className={`row ${from === 'help' ? `` : `dictionaryContentWrapper p-4`}`}>
      {Object.keys(groupedCats).length > 0 ? <RenderCats /> : ''}
    </div>
  );
};

export default DictionaryContent;
