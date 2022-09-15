/* eslint-disable max-len */
/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import { Switch, Typography } from '@mui/material';
import { InvertColors } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { ReferenceTooltip } from '../../../shared/constants';
import { Context } from '../../../store/Store';
import '../../../styles/soilConditions.scss';
import SoilComposition from './SoilComposition';
import SoilDrainage from './SoilDrainage';
import SoilFloodingFrequency from './SoilFloodingFrequency';

const SoilCondition = () => {
  const { state, dispatch } = useContext(Context);
  const { soilData, soilDataOriginal, markers } = state;
  const [tilingCheck, setTilingCheck] = useState(false);
  const [showTiling, setShowTiling] = useState(false);

  useEffect(() => {
    const getSSURGOData = (lat, lon) => {
      const markersCopy = markers;

      let longLatString = '';

      markersCopy.forEach((val, i) => {
        // get long lat formatted as requested by SSURGO (long lat, long lat, ...)
        // saved as longLatString
        if (i === markersCopy.length - 1) {
          longLatString += `${markersCopy[i][1]} ${markersCopy[i][0]},${lon} ${lat}`;
        } else {
          longLatString += `${markersCopy[i][1]} ${markersCopy[i][0]},`;
        }
      });
      let soilDataQuery = '';

      if (markersCopy.length > 1) {
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, mp.mupolygonkey as MPKEY
      FROM mapunit AS mu 
      INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
      INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
      WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
      AND
      mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
      } else {
        // point
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS Map_Unit_Name, muag.drclassdcd AS Drainage_Class, muag.flodfreqdcd AS Flooding_Frequency, mp.mupolygonkey as MPKEY
        FROM mapunit AS mu 
        INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
        INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
        WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))
        AND
        mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('point (${lon} ${lat})'))`;
      }

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('query', soilDataQuery);
      urlencoded.append('format', 'json+columnname');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      };

      dispatch({
        type: 'TOGGLE_SOIL_LOADER',
        data: {
          isSoilDataLoading: true,
        },
      });

      fetch('https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result !== {}) {
            const PondingFrequency = result.Table[1][4];
            let mapUnitString = '';

            const stringSplit = [];

            result.Table.forEach((el, index) => {
              if (index !== 0) {
                if (stringSplit.indexOf(el[1].split(',')[0]) === -1) {
                  stringSplit.push(el[1].split(',')[0]);
                }
              }
            });

            const filteredArr = stringSplit.filter((elm) => elm);
            mapUnitString = filteredArr.join(', ');

            const floodingClasses = [];
            result.Table.forEach((el, index) => {
              if (index === 0 || el.indexOf('Water') === 1) {
              } else if (floodingClasses.indexOf(el[3]) === -1) {
                floodingClasses.push(el[3]);
              }
            });

            let drainageClasses = [];
            result.Table.forEach((el, index) => {
              if (index !== 0) {
                if (drainageClasses.indexOf(el[2]) === -1) {
                  drainageClasses.push(el[2]);
                }
              }
            });
            drainageClasses = drainageClasses.filter((el) => el != null);

            dispatch({
              type: 'UPDATE_SOIL_DATA',
              data: {
                Map_Unit_Name: mapUnitString,
                Drainage_Class: drainageClasses,
                Flooding_Frequency: floodingClasses,
                PondingFrequency,
                for: { lat, lon },
              },
            });
            dispatch({
              type: 'UPDATE_SOIL_DATA_ORIGINAL',
              data: {
                Map_Unit_Name: mapUnitString,
                Drainage_Class: drainageClasses,
                Flooding_Frequency: floodingClasses,
                PondingFrequency,
                for: { lat, lon },
              },
            });
          }

          dispatch({
            type: 'TOGGLE_SOIL_LOADER',
            data: {
              isSoilDataLoading: false,
            },
          });
        })
        .catch((error) => console.error('SSURGO FETCH ERROR', error));
    };

    const lat = markers[0][0];
    const lon = markers[0][1];

    if (soilDataOriginal.for) {
      if (!(soilDataOriginal.for.lat === lat && soilDataOriginal.for.lon === lon)) {
        getSSURGOData(lat, lon);
      }
    } else {
      getSSURGOData(lat, lon);
    }
  }, [dispatch, markers, soilDataOriginal.for]);

  useEffect(() => {
    const checkArray = ['Very poorly drained', 'Poorly drained', 'Somewhat poorly drained'];
    if (checkArray.some((e) => soilData.Drainage_Class.includes(e))) {
      setShowTiling(true);
    }
    window.localStorage.setItem('drainage', JSON.stringify(soilData.Drainage_Class));
  }, [soilData.Drainage_Class]);

  return (
    <div className="row">
      <div className="col-12">
        <Typography variant="h4" align="left">
          Soil Conditions?
        </Typography>
      </div>

      <SoilComposition soilData={soilData} />

      <SoilDrainage setTilingCheck={setTilingCheck} />

      {showTiling && (
        <div className="col-12 pt-2 mt-2 row">
          <div className="col-12">
            <Typography variant="body1" className="soilConditionSubHeader">
              <InvertColors />
              &nbsp;TILING &nbsp;
              <ReferenceTooltip
                type="text"
                content="Indicate if the field of interest has tile installed. If you have selected very poorly to somewhat poorly drained soils, selecting “yes” will increase your drainage class by one factor."
              />
            </Typography>
          </div>
          <div className="col-12 pt-2">
            <div className="pl-1 text-left">
              <Typography variant="body1" display="inline">
                NO
              </Typography>
              <Switch
                checked={tilingCheck}
                onChange={(e) => {
                  const soilDrainCopy = soilData.Drainage_Class;

                  const drainSet = new Set(soilDrainCopy);
                  if (e.target.checked) {
                    if (
                      drainSet.has('Very poorly drained')
                      && drainSet.has('Poorly drained')
                      && drainSet.has('Somewhat poorly drained')
                    ) {
                      drainSet.delete('Very poorly drained');
                      drainSet.add('Moderately well drained');
                    } else if (drainSet.has('Very poorly drained') && drainSet.has('Poorly drained')) {
                      drainSet.delete('Very poorly drained');
                      drainSet.add('Somewhat poorly drained');
                    } else if (
                      drainSet.has('Poorly drained')
                        && drainSet.has('Somewhat poorly drained')
                    ) {
                      drainSet.delete('Poorly drained');
                      drainSet.add('Moderately well drained');
                    } else if (
                      drainSet.has('Very poorly drained')
                        && drainSet.has('Somewhat poorly drained')
                    ) {
                      drainSet.delete('Very poorly drained');
                      drainSet.delete('Somewhat poorly drained');
                      drainSet.add('Poorly drained');
                      drainSet.add('Moderately well drained');
                    } else if (drainSet.has('Very poorly drained')) {
                      drainSet.delete('Very poorly drained');
                      drainSet.add('Poorly drained');
                    } else if (drainSet.has('Poorly drained')) {
                      drainSet.delete('Poorly drained');
                      drainSet.add('Somewhat poorly drained');
                    } else if (drainSet.has('Somewhat poorly drained')) {
                      drainSet.delete('Somewhat poorly drained');
                      drainSet.add('Moderately well drained');
                    } else {
                      drainSet.delete('Very poorly drained');
                      drainSet.delete('Poorly drained');
                      drainSet.delete('Somewhat poorly drained');
                      drainSet.add('Moderately well drained');
                    }
                    window.localStorage.setItem('drainage', JSON.stringify([...drainSet]));
                  } else {
                    window.localStorage.setItem(
                      'drainage',
                      JSON.stringify(soilDataOriginal.Drainage_Class),
                    );
                  }

                  setTilingCheck(!tilingCheck);
                }}
                name="checkedC"
              />
              <Typography variant="body1" display="inline">
                YES
              </Typography>
            </div>
          </div>
        </div>
      )}
      <SoilFloodingFrequency />
    </div>
  );
};

export default SoilCondition;
