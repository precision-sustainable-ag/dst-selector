export const SSURGO_API_URL = 'https://ssurgo.covercrop-data.org';
export const USDA_SDA_URL = 'https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest';

/**
 * Fetches soil data from the new SSURGO API.
 * @param {number} lat - Latitude in decimal degrees
 * @param {number} lon - Longitude in decimal degrees
 * @param {string[]} [categories=['mapunit', 'muaggatt']] - List of categories to fetch
 * @returns {Promise<Object>}
 */
export const fetchSSURGOData = async (lat, lon, categories = ['mapunit', 'muaggatt']) => {
  const categoryParam =
    categories.length > 0 ? `&categories=clear,${categories.map((c) => `+${c}`).join(',')}` : '';
  const url = `${SSURGO_API_URL}/?lat=${lat}&lon=${lon}${categoryParam}&output=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SSURGO API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

/**
 * Determines whether the land is considered farmable based on map units (checks for 'urban land').
 * @param {Array<Object>|Object} result - Response from fetchSSURGOData
 * @returns {boolean}
 */
export const isSoilFarmable = (result) => {
  const row = Array.isArray(result) ? result[0] : result;
  const isFarmable = !row?.muname?.toLowerCase().includes('urban land');

  console.log('[New SSURGO API] isFarmable:', isFarmable, result);

  return isFarmable;
};

/**
 * Formats the new SSURGO API response into the structure expected by the soil slice.
 * @param {Array<Object>|Object} result - Response from fetchSSURGOData
 * @param {Array<Object>} floodingOptions - List of flooding options from covercrop API
 * @param {{ lat: number, lon: number }} latLong - Coordinates
 * @returns {{ mapUnitName: string, drainageClass: string[], floodingFrequency: string[], latLong: { lat: number, lon: number } }}
 */
export const formatSSURGOData = (result, floodingOptions = [], latLong) => {
  const row = Array.isArray(result) ? result[0] : result;

  const mapUnitName = row?.muname?.split(',')[0]?.trim() || '';
  const drainageClass = row?.drclassdcd ? [row.drclassdcd] : [];

  let floodingFrequency = [];
  const floodingFreq = row?.flodfreqdcd;
  if (floodingFreq && !floodingFreq.toLowerCase().includes('water')) {
    const matchedOption = floodingOptions.find(
      (opt) => opt.label?.trim().toLowerCase() === floodingFreq.trim().toLowerCase(),
    );
    if (matchedOption) {
      floodingFrequency = [matchedOption.value];
    }
  }

  const payload = {
    mapUnitName,
    drainageClass,
    floodingFrequency,
    latLong,
  };

  console.log('[New SSURGO API] Result:', payload);

  return payload;
};

/**
 * Fetches data from legacy USDA SDA API using raw spatial query.
 * Kept for debugging and comparing results.
 * @param {Array<[number, number]>} markers - Array of [lat, lon] coordinates
 * @returns {Promise<Object>}
 */
export const fetchSSURGODataLegacy = async (markers) => {
  if (!markers || markers.length === 0) return null;
  const [lat, lon] = markers[0];

  let soilDataQuery = '';
  if (markers.length > 1) {
    let longLatString = '';
    markers.forEach((_val, i) => {
      if (i === markers.length - 1) {
        longLatString += `${markers[i][1]} ${markers[i][0]},${lon} ${lat}`;
      } else {
        longLatString += `${markers[i][1]} ${markers[i][0]},`;
      }
    });

    soilDataQuery = `SELECT mu.mukey AS MUKEY, mu.muname AS mapUnitName, muag.drclassdcd AS drainageClass, muag.flodfreqdcd AS floodingFrequency, mp.mupolygonkey as MPKEY
      FROM mapunit AS mu 
      INNER JOIN muaggatt AS muag ON muag.mukey = mu.mukey
      INNER JOIN mupolygon AS mp ON mp.mukey = mu.mukey
      WHERE mu.mukey IN (SELECT * from SDA_Get_Mukey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))
      AND
      mp.mupolygonkey IN  (SELECT * from SDA_Get_Mupolygonkey_from_intersection_with_WktWgs84('polygon ((${longLatString}))'))`;
  } else {
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

  const response = await fetch(USDA_SDA_URL, requestOptions);
  if (!response.ok) {
    throw new Error(`USDA SDA API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

/**
 * Executes the legacy USDA SDA fetch and logs the result for SoilCondition comparison.
 * @param {Array<[number, number]>} markers
 * @param {Array<Object>} floodingOptions
 */
export const logSSURGODataLegacySoil = (markers, floodingOptions = []) => {
  if (!markers || markers.length === 0) return;
  const [lat, lon] = markers[0];

  fetchSSURGODataLegacy(markers)
    .then((result) => {
      if (!result?.Table) {
        console.log('[Legacy USDA SSURGO] Result: No Table in response', result);
        return;
      }
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
      const floodingOptionsList = floodingOptions.map((option) => option.label);
      let selectedOption;
      floodingOptions.forEach((opt) => {
        if (opt.label === floodingClasses[0]) {
          selectedOption = [opt.value];
        }
      });
      const payload = {
        mapUnitName: mapUnitString,
        drainageClass: drainageClasses,
        floodingFrequency: floodingOptionsList.includes(floodingClasses[0]) ? selectedOption : [],
        latLong: { lat, lon },
      };

      console.log('[Legacy USDA SSURGO] Result:', payload);
    })
    .catch((error) => console.error('[Legacy USDA SSURGO] FETCH ERROR', error));
};

/**
 * Executes the legacy USDA SDA fetch and logs isFarmable for Location comparison.
 * @param {number} lat
 * @param {number} lon
 */
export const logSSURGODataLegacyLocation = (lat, lon) => {
  fetchSSURGODataLegacy([[lat, lon]])
    .then((result) => {
      if (!result?.Table) {
        console.log('[Legacy USDA SSURGO] isFarmable: No Table in response', result);
        return;
      }
      const stringSplit = [];

      result.Table.forEach((el, index) => {
        if (index !== 0) {
          if (stringSplit.indexOf(el[1].split(',')[0]) === -1) {
            stringSplit.push(el[1].split(',')[0]);
          }
        }
      });

      const isFarmableLegacy = !stringSplit.some((el) => el.toLowerCase().includes('urban land'));
      console.log('[Legacy USDA SSURGO] isFarmable:', isFarmableLegacy, stringSplit);
    })
    .catch((error) => console.error('[Legacy USDA SSURGO] FETCH ERROR', error));
};
