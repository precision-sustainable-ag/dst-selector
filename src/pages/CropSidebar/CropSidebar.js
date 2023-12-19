/* eslint-disable */
/* eslint-disable no-underscore-dangle */
/*
  This file contains the CropSidebar and its styles
  The CropSidebar is the sidebar which contains the filtering and calendar view components
*/

import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  // ListSubheader,
  Typography,
  Grid,
} from '@mui/material';
import {
  CalendarToday, Compare, ExpandLess, ExpandMore,
} from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  CustomStyles, LightButton, callCoverCropApi,
} from '../../shared/constants';
import ComparisonBar from '../MyCoverCropList/ComparisonBar/ComparisonBar';
import CoverCropSearch from './CoverCropSearch/CoverCropSearch';
import SidebarFilter from './SidebarFilter/SidebarFilter';
import CoverCropGoals from './CoverCropGoals/CoverCropGoals';
import PlantHardinessZone from './PlantHardinessZone/PlantHardinessZone';
import Legend from '../../components/Legend/Legend';
import { updateRegion } from '../../reduxStore/mapSlice';
import { clearFilters } from '../../reduxStore/filterSlice';
import { updateCropData, updateActiveCropIds } from '../../reduxStore/cropSlice';
import { setAjaxInProgress, regionToggleHandler } from '../../reduxStore/sharedSlice';
import arrayEquals from '../../shared/functions';

const CropSidebar = ({
  comparisonView,
  isListView,
  from,
  setGrowthWindow,
  toggleComparisonView,
  toggleListView,
  style,
}) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const regionShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.regionShorthand);
  const regionToggleRedux = useSelector((stateRedux) => stateRedux.sharedData.regionToggle);
  const speciesSelectorActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const regionsRedux = useSelector((stateRedux) => stateRedux.mapData.regions);
  const councilLabelRedux = useSelector((stateRedux) => stateRedux.mapData.councilLabel);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const drainageClassRedux = useSelector((stateRedux) => stateRedux.soilData.soilData.drainageClass[0]);

  // useState vars
  const [loading, setLoading] = useState(true);
  const [sidebarFilters, setSidebarFilters] = useState([]);
  const [showFilters, setShowFilters] = useState('');
  const [sidebarCategoriesData, setSidebarCategoriesData] = useState([]);
  const [sidebarFiltersData, setSidebarFiltersData] = useState([]);
  const [cropFiltersOpen, setCropFiltersOpen] = useState(true);

  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq
  const [sidebarFilterOptions, setSidebarFilterOptions] = useState(() => {
    const sidebarStarter = {};
    sidebarFiltersData.forEach((row) => {
      sidebarStarter[row.name] = [];
    });
    return sidebarStarter;
  });
  const legendData = [
    { className: 'sideBar', label: '0 = Least, 5 = Most' },
  ];

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  // // TODO: When is showFilters false?
  // NOTE: verify below when show filter is false.
  useEffect(() => {
    const value = !(window.location.pathname === '/'
      && from === 'table'
      && !speciesSelectorActivationFlagRedux
      && !comparisonView);
    setShowFilters(value);
  }, [speciesSelectorActivationFlagRedux, from, comparisonView]);

  useEffect(() => {
    // ex { "Heat Tolerance": [1,2,3,4,5] }
    const selectedFilterObject = {};

    Object.keys(filterStateRedux.filters).forEach((key) => {
      if (filterStateRedux.filters[key]) {
        const [k, value] = key.split(': ');
        if (value) {
          selectedFilterObject[k] = selectedFilterObject[k] || [];
          selectedFilterObject[k].push(+value || value);
        }
      }
    });

    // handles crop search
    const search = filterStateRedux.filters.cropSearch?.toLowerCase().match(/\w+/g);
    const cropData = cropDataRedux?.filter((crop) => {
      let m;

      const match = (parm) => {
        if (parm === 'label') {
          m = crop[parm]?.toLowerCase().match(/\w+/g);
        } else {
          m = crop.family[parm]?.toLowerCase().match(/\w+/g);
        }

        return !search || (m !== null && search.every((s) => m?.some((t) => t.includes(s))));
      };

      return match('label') || match('scientific') || match('common');
    });

    // transforms selectedFilterObject into an array
    const nonZeroKeys2 = Object.keys(selectedFilterObject).map((key) => {
      if (selectedFilterObject[key]?.length !== 0) {
        return { [key]: selectedFilterObject[key].map((item) => item.toString()) };
      }
      return '';
    });

    const filtered = cropData?.filter((crop, n, cd) => {
      let match = true;
      // iterate over all active filters
      nonZeroKeys2.forEach((keyObject) => {
        // get filter name ex. Drought Tolerance
        const key = Object.keys(keyObject)[0];
        // get filter values ex. [1,2,3]
        const vals = keyObject[key];

        // iterate over all crop.data categories
        Object.keys(crop.data).forEach((category) => {
          // check if crop.data[category] includes key
          if (Object.keys(crop.data[category]).includes(key)) {
            // make sure crop.data[category][key].values[0] exists
            if (crop.data[category][key].values[0] !== undefined) {
              // if there is not an intersection, match = false
              if (!crop.data[category][key].values.some((item) => vals.includes(item))) {
                match = false;
              }
            }
          }
        });
      });

      cd[n].inactive = (!match)
      || (drainageClassRedux && !crop?.data['Soil Conditions']['Soil Drainage']?.values?.includes(drainageClassRedux));

      return true;
    });

    dispatchRedux(updateActiveCropIds(filtered.filter((crop) => !crop.inactive).map((crop) => crop.id)));
  }, [cropDataRedux, dispatchRedux, filterStateRedux.filters]);

  const filtersSelected = Object.keys(filterStateRedux.filters)?.filter((key) => filterStateRedux.filters[key])?.length > 0;

  const resetAllFilters = () => {
    dispatchRedux(clearFilters());
  };

  const generateSidebarObject = async () => {
    const sidebars = [];
    await sidebarCategoriesData.forEach((category) => {
      if (category.label !== 'Goals') {
        const newCategory = {
          name: category.label,
          description: category.description,
        };
        newCategory.values = category?.attributes?.map((filter) => {
          const type = filter?.values[0]?.dataType;

          const obj = {
            name: filter.label,
            type,
            rating: !filter.isArray,
            maxSize: null,
            dataType: filter.dataType.label,
            description: filter.description,
            details: filter.details,
            units: filter.units,
          };
          if (type === 'number') {
            obj.values = filter.values;
            obj.maxSize = councilShorthandRedux === 'MCCC' ? 4 : 5;
          } else {
            obj.values = filter.values;
          }

          return obj;
        });
        sidebars.push(newCategory);
      }
    });

    return sidebars;
  };

  useEffect(() => {
    generateSidebarObject()
      .then((data) => setSidebarFilters(data))
      .then(() => { setLoading(false); })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, [sidebarCategoriesData]);

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      dispatchRedux(setAjaxInProgress(true));

      setLoading(true);
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/filters?${query}`).then((data) => {
        const allFilters = [];
        data.data.forEach((category) => {
          allFilters.push(category.attributes);
        });
        setSidebarFiltersData(allFilters);
        setSidebarCategoriesData(data.data);
      });

      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops?${query}`).then((data) => {
        const {startDate, endDate} = cashCropDataRedux.dateRange;
        console.log(startDate, endDate)
        const start = startDate ? moment(startDate.toISOString()).format('MM/DD') : '';
        const end = endDate ? moment(endDate.toISOString()).format('MM/DD') : '';
        cropDataFormatter(data.data, start, end);
        dispatchRedux(updateCropData(data.data));
        dispatchRedux(setAjaxInProgress(false));
      });
    }
  }, [
    cashCropDataRedux, regionIdRedux,
  ]);

  // console.log(moment().dayOfYear(1).format('MM/DD'))

  const cropDataFormatter = (cropData = [{}], cashCropStartDate, cashCropEndDate) => {
    const formatHalfMonthData = (halfMonthData = []) => {
      const result = [];
      let index = 0;
      while (index < halfMonthData.length) {
        const timePeriod = {
          startTime: '',
          endTime: '',
          months: [],
          info: [],
        };
        if (timePeriod.months.length === 0) {
          if (halfMonthData[index].start !== '') {
            timePeriod.startTime = halfMonthData[index].start;
            timePeriod.endTime = halfMonthData[index].end;
            timePeriod.info = [...halfMonthData[index].info];
          }
          timePeriod.months.push(halfMonthData[index].month);
          index += 1;
        }
        while (
          index > 0
          && index < halfMonthData.length
          && arrayEquals(halfMonthData[index].info, halfMonthData[index - 1].info)
        ) {
          timePeriod.months.push(halfMonthData[index].month);
          index += 1;
        }
        if (timePeriod.months.length > 0) result.push(timePeriod);
        else index += 1;
      }
      return result;
    };

    const formatYearArr = (yearArr = []) => {
      const result = [];
      let i = 0, j = 0;
      while (i < yearArr.length) {        
        while (j < yearArr.length && arrayEquals(yearArr[i].info, yearArr[j].info)) {
          j += 1;
        }
        result.push({
          startTime: moment().dayOfYear(i + 1).format('MM/DD'),
          endTime: moment().dayOfYear(j).format('MM/DD'),
          info: yearArr[i].info,
          length: j - i,
        })
        i = j;
      }
      return result;
    }

    const formatTimeToHalfMonthData = (
      startTime = '',
      endTime = '',
      param = '',
      halfMonthData = [],
    ) => {
      const startIndex = moment(startTime, 'MM/DD').month() * 2 + (moment(startTime, 'MM/DD').date() >= 15 ? 1 : 0);
      const endIndex = moment(endTime, 'MM/DD').month() * 2 + (moment(endTime, 'MM/DD').date() >= 15 ? 1 : 0);
      halfMonthData = halfMonthData.map((data, index) => {
        if (index >= startIndex && index <= endIndex) {
          const info = [...data.info, param];
          let start = '';
          let end = '';
          if (data.start === '') start = startTime;
          else {
            start = moment(data.start, 'MM/DD').isSameOrBefore(moment(startTime, 'MM/DD'))
              ? startTime
              : data.start;
          }
          if (data.end === '') end = endTime;
          else {
            end = moment(data.end, 'MM/DD').isSameOrBefore(moment(endTime, 'MM/DD'))
              ? data.end
              : endTime;
          }
          return {
            ...data,
            start,
            end,
            info,
          };
        }
        return data;
      });
      return halfMonthData;
    };

    const formatTimeToYearArr = (startTime, endTime, param, yearArr = []) => {
      const startIndex = moment(startTime, 'MM/DD').dayOfYear() - 1;
      const endIndex  = moment(endTime, 'MM/DD').dayOfYear() - 1;
      yearArr = yearArr.map((day, index) => {
        if (index >= startIndex && index <= endIndex) {
          return {info: [...day.info, param]};
        }
        return day;
      })
      return yearArr;
    }

    const monthStringBuilder = (crop) => {
      const params = [
        'Reliable Establishment',
        'Freeze/Moisture Risk to Establishment',
        'Frost Seeding',
        'Fall/Winter Seeding Rate',
        'Spring Seeding Rate',
        'Summer Seeding Rate',
        'Can Interseed',
        'Average Frost',
        'Hessian Fly Free Date',
      ];

      // create a 24 item array of half months ex: [{month: '1', info: [], start: '', end: ''}, ...]
      let halfMonthArr = Array.from({ length: 24 }, (_, i) => ({
        month: moment()
          .month(Math.floor(i / 2))
          .format('M'),
        info: [],
        start: '',
        end: '',
      }));

      let yearArr = Array.from({ length: 365 }, (_, i) => ({
        info: [],
      }));

      // iterate over each crop and create crop['Half Month Data']
      params.forEach((param) => {
        if (crop.data['Planting and Growth Windows']?.[`${param}`]) {
          crop.data['Planting and Growth Windows']?.[`${param}`].values.forEach((dateArray) => {
            // get start and end date of each param for each crop
            const datesArr = dateArray.split('-');
            let valStart;
            let valEnd;
            if (datesArr.length > 1) {
              valStart = moment(datesArr[0], 'MM/DD/YYYY').format('MM/DD');
              valEnd = moment(datesArr[1], 'MM/DD/YYYY').format('MM/DD');
            } else {
              // hessian fly dates are an exception to this condition because it has only one date and not a range
              valStart = moment(datesArr[0], 'MM/DD/YYYY').format('MM/DD');
              valEnd = valStart;
            }
            // Average Frost date should be divided into two years
            if (param === 'Average Frost') {
              const tempStart = '01/01';
              const tempEnd = '12/31';
              halfMonthArr = formatTimeToHalfMonthData(valStart, tempEnd, param, halfMonthArr);
              halfMonthArr = formatTimeToHalfMonthData(tempStart, valEnd, param, halfMonthArr);
              yearArr = formatTimeToYearArr(valStart, tempEnd, param, yearArr);
              yearArr = formatTimeToYearArr(tempStart, valEnd, param, yearArr);
            } else {
              halfMonthArr = formatTimeToHalfMonthData(valStart, valEnd, param, halfMonthArr);
              yearArr = formatTimeToYearArr(valStart, valEnd, param, yearArr);
            }
          });
        }
      });

      // add cash crop dates dates
      if (cashCropStartDate !== '' && cashCropEndDate !== '') {
        const start = moment(cashCropStartDate).format('MM/DD');
        const end = moment(cashCropEndDate).format('MM/DD');
        yearArr = formatTimeToYearArr(start, end, 'Cash Crop Growing', yearArr);
      }

      const halfMonthData = formatHalfMonthData(halfMonthArr);
      crop['Half Month Data'] = halfMonthData;
      const yearData = formatYearArr(yearArr);
      crop.cropGrowthWindow = yearData;
      console.log(crop.label, yearData, crop.data['Planting and Growth Windows']);

      // this is temporary, needs to be replaced with wither a fix to calendar growth window component or exporting of json from airtable
      Object.keys(crop).forEach((item) => {
        if (item.endsWith('Early') || item.endsWith('Mid')) {
          const uniq = [...new Set(crop[item])];
          const removedOldVals = uniq.filter((u) => !u.endsWith('growth'));
          crop[item] = removedOldVals;
        }
      });
      return crop;
    };

    return cropData.map((crop) => monthStringBuilder(crop));
  };

  // TODO: Can we use Reducer instead of localStorage?
  useEffect(() => {
    if (from === 'table') {
      if (cashCropDataRedux.dateRange.startDate) {
        window.localStorage.setItem(
          'cashCropDateRange',
          JSON.stringify(cashCropDataRedux.dateRange),
        );
      }
      setGrowthWindow(true);
    }
  }, [cashCropDataRedux.dateRange, setGrowthWindow]);

  const getFilters = () => sidebarFilters.map((filter, index) => {
    const sectionFilter = `${filter.name}`;
    return (
      <SidebarFilter
        key={index}
        filter={filter}
        index={index}
        sidebarFilterOptions={sidebarFilterOptions}
        setSidebarFilterOptions={setSidebarFilterOptions}
        resetAllFilters={resetAllFilters}
        sectionFilter={sectionFilter}
      />
    );
  }); // filters

  const filtersList = () => (
    <List component="div" disablePadding className="cropFilters">
      {filtersSelected && (
        <ListItem>
          <ListItemText
            primary={(
              <Button
                onClick={resetAllFilters}
                style={{ cursor: 'pointer', color: 'red' }}
              >
                Clear Filters
              </Button>
            )}
          />
        </ListItem>
      )}
      {getFilters()}
    </List>
  ); // filterList

  useEffect(() => {
    // FIXME: this function returns a compoennt in useEffect, not sure why doing that
    filtersList();
  }, [sidebarFilters]);

  const updateRegionRedux = (regionName) => {
    const selectedRegion = regionsRedux.filter((region) => region.shorthand === regionName)[0];
    localStorage.setItem('regionId', selectedRegion.id);
    dispatchRedux(updateRegion({
      regionId: selectedRegion.id ?? '',
      regionShorthand: selectedRegion.shorthand ?? '',
    }));
  };

  return !loading && (from === 'myCoverCropListStatic') ? (
    <Grid container spacing={3}>
      <Grid item>
        <LightButton
          onClick={toggleComparisonView}
          color="secondary"
          startIcon={
            comparisonView ? (
              <ListIcon style={{ fontSize: 'larger' }} />
            ) : (
              <Compare style={{ fontSize: 'larger' }} />
            )
          }
        >
          {comparisonView ? 'LIST VIEW' : 'COMPARISON VIEW'}
        </LightButton>
        <ComparisonBar
          filterData={sidebarFilters}
          goals={selectedGoalsRedux?.length > 0 ? selectedGoalsRedux : []}
          comparisonKeys={comparisonKeysRedux}
          comparisonView={comparisonView}
        />
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item>
        {from === 'table' && (
          <LightButton
            onClick={toggleListView}
            color="secondary"
            startIcon={
                isListView ? (
                  <ListIcon style={{ fontSize: 'larger' }} />
                ) : (
                  <CalendarToday style={{ fontSize: 'larger' }} />
                )
              }
          >
            {isListView ? 'LIST VIEW' : 'CALENDAR VIEW'}
          </LightButton>
        )}
        {speciesSelectorActivationFlagRedux || from === 'explorer' ? (
          <Box
            id="Filters"
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {from === 'table' && (
              <>
                {showFilters && speciesSelectorActivationFlagRedux && !isListView && (
                  <CoverCropSearch />
                )}

                {!isListView && (
                  <CoverCropGoals style={style} />
                )}

              </>
              )}
              {showFilters && (
              <>
                {from === 'explorer' && (
                  <>
                    <List component="div" disablePadding>
                      <ListItemButton onClick={() => dispatchRedux(regionToggleHandler())}>
                        <ListItemText
                          primary={(
                            <Typography variant="body2">
                              PLANT HARDINESS ZONE
                            </Typography>
            )}
                        />
                        {regionToggleRedux ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </List>
                    <PlantHardinessZone
                      regionShorthand={regionShorthandRedux}
                      setRegionShorthand={updateRegionRedux}
                      regionsRedux={regionsRedux}
                      councilLabelRedux={councilLabelRedux}
                      regionToggleRedux={regionToggleRedux}
                    />
                    <CoverCropSearch />
                  </>
                )}
                <ListItemButton
                  onClick={() => setCropFiltersOpen(!cropFiltersOpen)}
                  style={{
                    marginBottom: '15px',
                    backgroundColor:
                      from === 'table' && !cropFiltersOpen
                        ? 'inherit'
                        : CustomStyles().lightGreen,
                  }}
                >
                  <ListItemText primary="COVER CROP FILTERS" />

                  {cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
                  {' '}
                  {/* // why is this here */}
                </ListItemButton>
                <Collapse in={cropFiltersOpen} timeout="auto">
                  <Box
                    sx={{
                      backgroundColor: 'background.paper',
                      border: '1px solid lightgrey',
                      paddingLeft: '1em',
                      margin: '1em',

                    }}
                  >
                    <Legend
                      legendData={legendData}
                      modal={false}
                    />
                  </Box>
                  {filtersList()}
                </Collapse>
              </>
              )}
            </List>
          </Box>
        ) : (
          <Grid>
            <ComparisonBar
              filterData={sidebarFilters}
              goals={selectedGoalsRedux?.length > 0 ? selectedGoalsRedux : []}
              comparisonKeys={comparisonKeysRedux}
              comparisonView={comparisonView}
            />
          </Grid>
        )}
      </Grid>

    </Grid>
  );
};

export default CropSidebar;
