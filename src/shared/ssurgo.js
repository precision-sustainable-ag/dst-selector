export const SSURGO_API_URL = 'https://ssurgo.covercrop-data.org';

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

  return {
    mapUnitName,
    drainageClass,
    floodingFrequency,
    latLong,
  };
};
