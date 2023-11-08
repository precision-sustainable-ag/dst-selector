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
import {
  CustomStyles, LightButton, callCoverCropApi, cropDataFormatter,
} from '../../shared/constants';
import ComparisonBar from '../MyCoverCropList/ComparisonBar/ComparisonBar';
import CoverCropSearch from './CoverCropSearch/CoverCropSearch';
import SidebarFilter from './SidebarFilter/SidebarFilter';
import CoverCropGoals from './CoverCropGoals/CoverCropGoals';
import PlantHardinessZone from './PlantHardinessZone/PlantHardinessZone';
import Legend from '../../components/Legend/Legend';
import { updateRegion } from '../../reduxStore/mapSlice';
import { clearFilters } from '../../reduxStore/filterSlice';
import { pullCropData, updateActiveCropData } from '../../reduxStore/cropSlice';
import { setAjaxInProgress, regionToggleHandler } from '../../reduxStore/sharedSlice';

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

  // useState vars
  const [loading, setLoading] = useState(false);
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
  const { filters } = filterStateRedux;
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
    const sfo = {};

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        const [k, value] = key.split(': ');
        if (value) {
          sfo[k] = sfo[k] || [];
          sfo[k].push(+value || value);
        }
      }
    });

    let cropData = cropDataRedux?.filter((crop) => crop['Zone Decision'] === 'Include');

    const search = filters.cropSearch?.toLowerCase().match(/\w+/g);

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
            } else if (vals.includes(crop.data[category][key].values[0])) {
              i += 1;
            }
          }
        });
      });

      cd[n].inactive = (i !== totalActiveFilters);

      return true;
    });
    dispatchRedux(updateActiveCropData(filtered.map((filter) => filter.id)));
  }, [filters.cropSearch, cropDataRedux, dispatchRedux, filters]);

  const filtersSelected = Object.keys(filters)?.filter((key) => filters[key])?.length > 1;

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
            obj.maxSize = 5;
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
        cropDataFormatter(data.data);
        dispatchRedux(pullCropData(data.data));
        dispatchRedux(setAjaxInProgress(false));
      });
    }
  }, [
    regionIdRedux,
  ]);

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
