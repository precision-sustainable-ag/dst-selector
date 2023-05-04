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
  ListItemText,
  // ListSubheader,
  Typography,
} from '@mui/material';
import {
  CalendarToday, Compare, ExpandLess, ExpandMore,
} from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import moment from 'moment';
import React, {
  useContext, useEffect, useState,
} from 'react';
import { CustomStyles } from '../../shared/constants';
import { Context } from '../../store/Store';
import '../../styles/cropSidebar.scss';
import ComparisonBar from '../MyCoverCropList/ComparisonBar/ComparisonBar';
import CoverCropSearch from './CoverCropSearch/CoverCropSearch';
import SidebarFilter from './SidebarFilter/SidebarFilter';
import CoverCropGoals from './CoverCropGoals/CoverCropGoals';
import PreviousCashCrop from './PreviousCashCrop/PreviousCashCrop';
import PlantHardinessZone from './PlantHardinessZone/PlantHardinessZone';

const CropSidebar = ({
  comparisonView,
  isListView,
  from,
  setGrowthWindow,
  toggleComparisonView,
  toggleListView,
  style,
}) => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [sidebarFilters, setSidebarFilters] = useState([]);
  const [showFilters, setShowFilters] = useState('');
  const [sidebarCategoriesData, setSidebarCategoriesData] = useState([]);
  const [sidebarFiltersData, setSidebarFiltersData] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq
  const [sidebarFilterOptions, setSidebarFilterOptions] = useState(() => {
    const sidebarStarter = {};
    sidebarFiltersData.forEach((row) => {
      sidebarStarter[row.name] = [];
    });
    return sidebarStarter;
  });

  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  const sfilters = state[section];
  const dictionary = [];

  async function getAllFilters() {
    if (state.regionId) {
      const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;
      await fetch(`https://developapi.covercrop-selector.org/v1/states/${state.stateId}/filters?${query}`)
        .then((res) => res.json())
        .then((data) => {
          const allFilters = [];
          data.data.forEach((category) => {
            allFilters.push(category.attributes);
          });
          setSidebarFiltersData(allFilters);
          setSidebarCategoriesData(data.data);
        })
        .catch((err) => {
        // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }

  // // TODO: When is showFilters false?
  // NOTE: verify below when show filter is false.
  useEffect(() => {
    const value = !(window.location.pathname === '/'
      && from === 'table'
      && !state.speciesSelectorActivationFlag
      && !comparisonView);
    setShowFilters(value);
  }, [state.speciesSelectorActivationFlag, from, comparisonView]);

  const handleToggle = (value, type = 'TOGGLE') => {
    dispatch({
      type,
      data: {
        value,
      },
    });
  };

  const areCommonElements = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    return arr1.some((el) => arr2Set.has(el));
  }; // areCommonElements

  useEffect(() => {
    const sfo = {};

    Object.keys(sfilters).forEach((key) => {
      if (sfilters[key]) {
        const [k, value] = key.split(': ');
        if (value) {
          sfo[k] = sfo[k] || [];
          sfo[k].push(+value || value);
        }
      }
    });

    let cropData = state?.cropData?.filter((crop) => crop['Zone Decision'] === 'Include');

    const search = sfilters.cropSearch?.toLowerCase().match(/\w+/g);

    cropData = state?.cropData?.filter((crop) => {
      const match = (parm) => {
        const m = crop[parm]?.toLowerCase().match(/\w+/g);

        return !search || search.every((s) => m.some((t) => t.includes(s)));
      };

      return match('Cover Crop Name') || match('Scientific Name');
    });

    const nonZeroKeys2 = Object.keys(sfo).map((key) => {
      if (sfo[key]?.length !== 0) {
        return { [key]: sfo[key] };
      }
      return '';
    });

    const growthArray = [];

    if (sfilters['Active Growth Period: Fall']) {
      growthArray.push('Sep', 'Oct', 'Nov');
    }
    if (sfilters['Active Growth Period: Winter']) {
      growthArray.push('Dec', 'Jan', 'Feb');
    }
    if (sfilters['Active Growth Period: Spring']) {
      growthArray.push('Mar', 'Apr', 'May');
    }
    if (sfilters['Active Growth Period: Summer']) {
      growthArray.push('Jun', 'Jul', 'Aug');
    }

    const arrayKeys = [
      'Duration',
      'Active Growth Period',
      'Winter Survival',
      'Flowering Trigger',
      'Root Architecture',
    ];
    const booleanKeys = ['Aerial Seeding', 'Frost Seeding'];

    const filtered = cropData?.filter((crop, n, cd) => {
      const totalActiveFilters = Object.keys(nonZeroKeys2)?.length;
      let i = 0;
      nonZeroKeys2.forEach((keyObject) => {
        const key = Object.keys(keyObject);
        const vals = keyObject[key];

        if (areCommonElements(arrayKeys, key)) {
          // Handle array type havlues
          if (crop[key] !== undefined) {
            const intersection = (arrays = [vals, crop[key]]) => arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

            if (intersection()?.length > 0) {
              i += 1;
            }
          } else if (areCommonElements(booleanKeys, key)) {
          //  Handle boolean types
            if (crop[key]) {
              i += 1;
            }
          } else if (vals.includes(crop[key])) {
            i += 1;
          }
        }
      });

      cd[n].inactive = (i !== totalActiveFilters);

      return true;
    });

    dispatch({
      type: 'UPDATE_ACTIVE_CROP_DATA',
      data: {
        value: filtered,
      },
    });
  }, [state.changedFilters, sfilters.cropSearch, state?.cropData, dispatch, sfilters]);

  const filtersSelected = Object.keys(sfilters)?.filter((key) => sfilters[key])?.length > 1;

  const resetAllFilters = () => {
    dispatch({
      type: 'CLEAR_FILTERS',
    });
  };

  const createObject = (obj, dataDictionary, data) => {
    const field = dataDictionary?.filter((item) => item.Variable === data.label);
    if (field[0] !== undefined) {
      obj.description = field[0].Description > 0 ? field[0].Description : '';
    }
  };

  const generateSidebarObject = async (dataDictionary) => {
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
            description: filter.description,
            details: filter.details,
            units: filter.units,
          };
          if (type === 'number') {
            obj.values = filter.values;
            obj.maxSize = 5;
          } else {
            obj.values = filter.values;
          }

          createObject(obj, dataDictionary, filter);

          return obj;
        });
        dictionary.push(newCategory);
      }
    });
  };

  async function getSidebars(data) {
    const setData = (dict) => {
      setSidebarFilters(dict);
    };

    await generateSidebarObject(data)
      .then(() => setData(dictionary))
      .then(() => { setLoading(false); })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  async function getDictData() {
    if (state.regionId) {
      const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;
      await fetch(`https://developapi.covercrop-selector.org/v1/states/${state.stateId}/dictionary?${query}`)
        .then((res) => res.json())
        .then((data) => {
          getSidebars(data.data);
        })
        .catch((err) => {
        // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }

  useEffect(() => {
    setLoading(true);
    if (sidebarCategoriesData.length > 0 && state.regionId) {
      getDictData();
    }
  }, [
    sidebarCategoriesData,
    state.regionId,
  ]);

  useEffect(() => {
    if (from === 'table') {
      if (dateRange.startDate !== null && dateRange.endDate !== null) {
        dispatch({
          type: 'UPDATE_DATE_RANGE',
          data: {
            startDate: moment(new Date(dateRange.startDate).toISOString()).format('YYYY-MM-DD'),
            endDate: moment(new Date(dateRange.endDate).toISOString()).format('YYYY-MM-DD'),
          },
        });
      }

      setGrowthWindow(true);
    }
  }, [dateRange, from, setGrowthWindow, dispatch]);

  useEffect(() => {
    if (document.querySelector('.MuiTableRow-root.theadFirst.MuiTableRow-head')) {
      // TODO:  When is this true?
      // NOTE: could never get alert to show up.  can we delete?
      // alert('Its true');
      const totalHt = document
        .querySelector('.MuiTableRow-root.theadFirst.MuiTableRow-head')
        .getBoundingClientRect().height;
      const btnHt = document.querySelector('.dynamicToggleBtn').getBoundingClientRect().height;

      const ht = totalHt - btnHt;

      setTableHeight(ht);
    }
  }, []);

  // TODO: Can we use Reducer instead of localStorage?
  useEffect(() => {
    if (state.cashCropData.dateRange.startDate) {
      window.localStorage.setItem(
        'cashCropDateRange',
        JSON.stringify(state.cashCropData.dateRange),
      );
    }
  }, [state.cashCropData.dateRange]);

  const filters = () => sidebarFilters.map((filter, index) => {
    const sectionFilter = `${section}${filter.name}`;
    return (
      <SidebarFilter
        key={index}
        filter={filter}
        index={index}
        sidebarFilterOptions={sidebarFilterOptions}
        setSidebarFilterOptions={setSidebarFilterOptions}
        resetAllFilters={resetAllFilters}
        sectionFilter={sectionFilter}
        handleToggle={handleToggle}
      />
    );
  }); // filters

  const filtersList = () => (
    <List component="div" disablePadding className="cropFilters">
      {filtersSelected && (
        <ListItem>
          <ListItemText
            primary={(
              <Typography
                variant="button"
                className="text-uppercase text-left text-danger font-weight-bold"
                onClick={resetAllFilters}
                style={{ cursor: 'pointer' }}
              >
                Clear Filters
              </Typography>
            )}
          />
        </ListItem>
      )}
      {filters()}
    </List>
  ); // filterList

  useEffect(() => {
    getAllFilters();
  }, [state.regionId]);

  useEffect(() => {
    filtersList();
  }, [sidebarFilters]);

  const comparisonButton = (
    <Button
      className="dynamicToggleBtn"
      fullWidth
      variant="contained"
      onClick={toggleComparisonView}
      size="large"
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
    </Button>
  );

  return !loading && (from === 'myCoverCropListStatic') ? (
    <div className="row">
      <div className="col-12 mb-3">{comparisonButton}</div>
      {comparisonView && (
        <div className="col-12">
          <ComparisonBar
            filterData={sidebarFilters}
            goals={state.selectedGoals?.length > 0 ? state.selectedGoals : []}
            comparisonKeys={state.comparisonKeys}
            dispatch={dispatch}
            comparisonView={comparisonView}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="row">
      {from === 'table' && (
        <div
          className="col-12"
          style={{
            paddingBottom: tableHeight,
          }}
        >
          <Button
            className="dynamicToggleBtn"
            fullWidth
            variant="contained"
            onClick={toggleListView}
            size="large"
            color="secondary"
            style={{ marginBottom: '15px' }}
            startIcon={
              isListView ? (
                <ListIcon style={{ fontSize: 'larger' }} />
              ) : (
                <CalendarToday style={{ fontSize: 'larger' }} />
              )
            }
          >
            {isListView ? 'LIST VIEW' : 'CALENDAR VIEW'}
          </Button>
        </div>
      )}

      {state.speciesSelectorActivationFlag || from === 'explorer' ? (
        <Box
          // className="col-"
          sx={{
            width: {
              lg: '280px',
              xl: '280px',
            },
          }}
          id="Filters"
        >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={(
            //   <ListSubheader
            //     sx={{
            //       backgroundColor: '#add08f',
            //       color: 'black',
            //       textAlign: 'center',
            //       height: '50px',
            //     }}
            //     style={{ marginBottom: '15px' }}
            //     component="div"
            //     id="nested-list-subheader"
            //   >
            //     FILTERS
            //   </ListSubheader>
            // )}
          >
            {from === 'table' && (
              <>
                {showFilters && state.speciesSelectorActivationFlag && !isListView && (
                  <CoverCropSearch sfilters={sfilters} dispatch={dispatch} />
                )}

                {!isListView && (
                  <CoverCropGoals style={style} handleToggle={handleToggle} />
                )}

                <PreviousCashCrop
                  handleToggle={handleToggle}
                  setDateRange={setDateRange}
                />
              </>
            )}

            {showFilters && (
              <>
                {from === 'explorer' && (
                  <>
                    <PlantHardinessZone handleToggle={handleToggle} dispatch={dispatch} sfilters={sfilters} />
                    <CoverCropSearch sfilters={sfilters} dispatch={dispatch} />
                  </>
                )}
                <ListItem
                  button
                  onClick={() => handleToggle('cropFiltersOpen')}
                  style={{
                    marginBottom: '15px',
                    backgroundColor:
                      from === 'table' && !state.cropFiltersOpen
                        ? 'inherit'
                        : CustomStyles().lightGreen,
                  }}
                >
                  <ListItemText primary="COVER CROP PROPERTIES" />

                  {state.cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={state.cropFiltersOpen} timeout="auto">
                  {filtersList()}
                </Collapse>
              </>
            )}
          </List>
        </Box>
      ) : (
        <div className="col-12">
          <ComparisonBar
            filterData={sidebarFilters}
            goals={state.selectedGoals?.length > 0 ? state.selectedGoals : []}
            comparisonKeys={state.comparisonKeys}
            dispatch={dispatch}
            comparisonView={comparisonView}
          />
        </div>
      )}
    </div>
  );
};

export default CropSidebar;
