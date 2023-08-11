/* eslint-disable max-len */
/*
  contains the popup for confirming or altering your soil conditions
  getDrainageText fetches the drainage info for the crop
  styled using ../../styles/soilConditions.scss
*/

import { Switch, Typography } from '@mui/material';
import { InvertColors } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReferenceTooltip } from '../../../shared/constants';
import '../../../styles/soilConditions.scss';
import SoilComposition from './SoilComposition/SoilComposition';
import SoilDrainage from './SoilDrainage/SoilDrainage';
import SoilFloodingFrequency from './SoilFloodingFrequency/SoilFloodingFrequency';
import { toggleSoilLoader, updateSoilData, updateSoilDataOriginal } from '../../../reduxStore/soilSlice';

const SoilCondition = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const markersRedux = useSelector((stateRedux) => stateRedux.addressData.markers);
  const soilDataRedux = useSelector((stateRedux) => stateRedux.soilData.soilData);
  const soilDataOriginalRedux = useSelector((stateRedux) => stateRedux.soilData.soilDataOriginal);

  // useState vars
  const [tilingCheck, setTilingCheck] = useState(false);
  const [showTiling, setShowTiling] = useState(false);

  useEffect(() => {
    const getSSURGOData = (lat, lon) => {
      const markersCopy = markersRedux;

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
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS mapUnitName, muag.drclassdcd AS drainageClass, muag.flodfreqdcd AS floodingFrequency, mp.mupolygonkey as MPKEY
      FROM mapunit AS mu 
      INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
      INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
      WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
      AND
      mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
      } else {
        // point
        soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS mapUnitName, muag.drclassdcd AS drainageClass, muag.flodfreqdcd AS floodingFrequency, mp.mupolygonkey as MPKEY
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

      dispatchRedux(toggleSoilLoader({
        isSoilDataLoading: true,
      }));

      fetch('https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result !== {}) {
            const pondingFrequency = result.Table[1][4];
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
              // eslint-disable-next-line no-empty
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

            dispatchRedux(updateSoilData({
              mapUnitName: mapUnitString,
              drainageClass: drainageClasses,
              floodingFrequency: floodingClasses,
              pondingFrequency,
              latLong: { lat, lon },
            }));
            dispatchRedux(updateSoilDataOriginal({
              mapUnitName: mapUnitString,
              drainageClass: drainageClasses,
              floodingFrequency: floodingClasses,
              pondingFrequency,
              latLong: { lat, lon },
            }));
          }

          dispatchRedux(toggleSoilLoader({
            isSoilDataLoading: false,
          }));
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error('SSURGO FETCH ERROR', error));
    };

    const lat = markersRedux[0][0];
    const lon = markersRedux[0][1];

    if (soilDataOriginalRedux?.latLong) {
      if (!(soilDataOriginalRedux.latLong?.lat === lat && soilDataOriginalRedux.latLong?.lon === lon)) {
        getSSURGOData(lat, lon);
      }
    } else {
      getSSURGOData(lat, lon);
    }
  }, [markersRedux, soilDataOriginalRedux?.latLong]);

  useEffect(() => {
    const checkArray = ['Very poorly drained', 'Poorly drained', 'Somewhat poorly drained'];
    if (checkArray.some((e) => soilDataRedux?.drainageClass.includes(e))) {
      setShowTiling(true);
    }
    window.localStorage.setItem('drainage', JSON.stringify(soilDataRedux?.drainageClass));
  }, [soilDataRedux?.drainageClass]);

  return (
    <div className="row">
      <div className="col-12">
        <Typography variant="h4" align="left">
          Soil Conditions?
        </Typography>
      </div>

      <SoilComposition />

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
                  const soilDrainCopy = soilDataRedux?.drainageClass;

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
                      JSON.stringify(soilDataOriginalRedux?.drainageClass),
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
