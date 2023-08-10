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
import React, {
  useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomStyles, callCoverCropApi } from '../../shared/constants';
import { Context, cropDataFormatter } from '../../store/Store';
import '../../styles/cropSidebar.scss';
import ComparisonBar from '../MyCoverCropList/ComparisonBar/ComparisonBar';
import CoverCropSearch from './CoverCropSearch/CoverCropSearch';
import SidebarFilter from './SidebarFilter/SidebarFilter';
import CoverCropGoals from './CoverCropGoals/CoverCropGoals';
import PreviousCashCrop from './PreviousCashCrop/PreviousCashCrop';
import PlantHardinessZone from './PlantHardinessZone/PlantHardinessZone';
import Legend from '../../components/Legend/Legend';
import { updateZone as updateZoneRedux } from '../../reduxStore/addressSlice';
import { pullCropData, updateActiveCropData, updateDateRange } from '../../reduxStore/cropSlice';

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
  const dispatchRedux = useDispatch();
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const [loading, setLoading] = useState(false);
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
  // const dictionary = [];

  const legendData = [
    { className: 'sideBar', label: '0 = Least, 5 = Most' },
  ];

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(state.regionId)}`;

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

    let cropData = cropDataRedux?.filter((crop) => crop['Zone Decision'] === 'Include');

    const search = sfilters.cropSearch?.toLowerCase().match(/\w+/g);

    cropData = cropDataRedux?.filter((crop) => {
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

    const nonZeroKeys2 = Object.keys(sfo).map((key) => {
      if (sfo[key]?.length !== 0) {
        return { [key]: sfo[key] };
      }
      return '';
    });

    // const booleanKeys = ['Aerial Seeding', 'Frost Seeding'];
    const filtered = cropData?.filter((crop, n, cd) => {
      const totalActiveFilters = Object.keys(nonZeroKeys2)?.length;
      let i = 0;
      nonZeroKeys2.forEach((keyObject) => {
        const key = Object.keys(keyObject);
        const vals = keyObject[key];
        // if (areCommonElements(arrayKeys, key)) {
        // Handle array type havlues
        Object.keys(crop.data).forEach((category) => {
          if (Object.keys(crop.data[category]).includes(key[0])) {
            if (crop.data[category][key].values[0] !== undefined) {
              const intersection = (arrays = [vals, crop.data[category][key].values[0]]) => arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

              if (intersection()?.length > 0) {
                i += 1;
              }
            // } else if (areCommonElements(booleanKeys, key)) {
            // //  Handle boolean types
            //   if (crop.data[category][key].values[0]) {
            //     i += 1;
            //   }
            } else if (vals.includes(crop.data[category][key].values[0])) {
              i += 1;
            }
          }
        });
      });

      cd[n].inactive = (i !== totalActiveFilters);

      return true;
    });
    dispatchRedux(updateActiveCropData(filtered));
    // dispatch({
    //   type: 'UPDATE_ACTIVE_CROP_DATA',
    //   data: {
    //     value: filtered,
    //   },
    // });
  }, [state.changedFilters, sfilters.cropSearch, cropDataRedux, dispatch, dispatchRedux, sfilters]);

  const filtersSelected = Object.keys(sfilters)?.filter((key) => sfilters[key])?.length > 1;

  const resetAllFilters = () => {
    dispatch({
      type: 'CLEAR_FILTERS',
    });
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

          // createObject(obj, dataDictionary, filter);

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
    if (state.stateId && state.regionId) {
      dispatch({
        type: 'SET_AJAX_IN_PROGRESS',
        data: true,
      });

      setLoading(true);
      callCoverCropApi(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/dictionary?${query}`).then((data) => {
        dispatch({
          type: 'PULL_DICTIONARY_DATA',
          data: data.data,
        });
      });

      callCoverCropApi(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/filters?${query}`).then((data) => {
        const allFilters = [];
        data.data.forEach((category) => {
          allFilters.push(category.attributes);
        });
        setSidebarFiltersData(allFilters);
        setSidebarCategoriesData(data.data);
      });

      callCoverCropApi(`https://${state.apiBaseURL}.covercrop-selector.org/v1/states/${state.stateId}/crops?${query}`).then((data) => {
        cropDataFormatter(data.data);
        dispatchRedux(pullCropData(data.data));
        dispatch({
          type: 'SET_AJAX_IN_PROGRESS',
          data: false,
        });
      });
    }
  }, [
    state.regionId,
  ]);

  useEffect(() => {
    if (from === 'table') {
      if (dateRange.startDate !== null && dateRange.endDate !== null) {
        dispatchRedux(updateDateRange({
          startDate: dateRange.startDate.toISOString().substring(0, 10),
          endDate: dateRange.endDate.toISOString().substring(0, 10),
        }));
        // dispatch({
        //   type: 'UPDATE_DATE_RANGE',
        //   data: {
        //     startDate: dateRange.startDate.toISOString().substring(0, 10),
        //     endDate: dateRange.endDate.toISOString().substring(0, 10),
        //   },
        // });
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
    if (cashCropDataRedux.dateRange.startDate) {
      window.localStorage.setItem(
        'cashCropDateRange',
        JSON.stringify(cashCropDataRedux.dateRange),
      );
    }
  }, [cashCropDataRedux.dateRange]);

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

  const updateZone = (region) => {
    if (region !== undefined) {
      dispatchRedux(updateZoneRedux({
        zoneText: region.label,
        zone: region.shorthand,
        zoneId: region.id,
      }));
      // dispatch({
      //   type: 'UPDATE_ZONE',
      //   data: {
      //     zoneText: region.label,
      //     zone: region.shorthand,
      //     zoneId: region.id,
      //   },
      // });
      dispatch({
        type: 'UPDATE_REGION',
        data: {
          regionId: region.id ?? '',
          regionLabel: region.label ?? '',
          regionShorthand: region.shorthand ?? '',
        },
      });
    }
  };

  return !loading && (from === 'myCoverCropListStatic') ? (
    <div className="row">
      <div className="col-12 mb-3">{comparisonButton}</div>
      {comparisonView && (
        <div className="col-12">
          <ComparisonBar
            filterData={sidebarFilters}
            goals={selectedGoalsRedux?.length > 0 ? selectedGoalsRedux : []}
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
                    <List component="div" disablePadding>
                      <ListItem button onClick={() => handleToggle(!state.zoneToggle, 'ZONE_TOGGLE')}>
                        <ListItemText
                          primary={(
                            <Typography variant="body2" className="text-uppercase">
                              Plant Hardiness Zone
                            </Typography>
            )}
                        />
                        {state.zoneToggle ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    </List>
                    <PlantHardinessZone updateZone={updateZone} />
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
            goals={selectedGoalsRedux?.length > 0 ? selectedGoalsRedux : []}
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
