/* eslint-disable no-underscore-dangle */
/*
  This file contains the CropSidebar and its styles
  The CropSidebar is the sidebar which contains the filtering and calendar view (crop calendar) components
*/

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  // ListSubheader,
  Typography,
  Grid,
  Switch,
  Chip,
} from '@mui/material';
import {
  Compare, ExpandLess, ExpandMore,
} from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListIcon from '@mui/icons-material/List';
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { PSAButton } from 'shared-react-components/src';
import {
  callCoverCropApi, cropDataFormatter, getLegendDataBasedOnCouncil,
} from '../../shared/constants';
import ComparisonBar from '../MyCoverCropList/ComparisonBar/ComparisonBar';
import CoverCropSearch from './CoverCropSearch/CoverCropSearch';
import SidebarFilter from './SidebarFilter/SidebarFilter';
import CoverCropGoals from './CoverCropGoals/CoverCropGoals';
import PlantHardinessZone from './PlantHardinessZone/PlantHardinessZone';
import Legend from '../../components/Legend/Legend';
import {
  clearFilters, setSoilDrainageFilter, setIrrigationFilter, setCropGroupFilter,
} from '../../reduxStore/filterSlice';
import { updateCropData, updateActiveCropIds } from '../../reduxStore/cropSlice';
import { setAjaxInProgress, regionToggleHandler } from '../../reduxStore/sharedSlice';
import PSATooltip from '../../components/PSAComponents/PSATooltip';

const SoloFilter = styled(ListItem)({
  paddingLeft: '25px',
});

const CropSidebar = ({
  comparisonView,
  listView,
  from,
  setGrowthWindow,
  setComparisonView,
  style,
}) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const cashCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cashCropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const regionToggleRedux = useSelector((stateRedux) => stateRedux.sharedData.regionToggle);
  const speciesSelectorActivationFlagRedux = useSelector((stateRedux) => stateRedux.sharedData.speciesSelectorActivationFlag);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const soilDrainageFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.soilDrainageFilter);
  const irrigationFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.irrigationFilter);
  const cropGroupFilterRedux = useSelector((stateRedux) => stateRedux.filterData.filters.cropGroupFilter);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const drainageClassRedux = useSelector((stateRedux) => stateRedux.soilData.soilData.drainageClass[0]);
  const floodingFrequencyRedux = useSelector((stateRedux) => stateRedux.soilData.soilData.floodingFrequency[0]);

  // useState vars
  const [loading, setLoading] = useState(true);
  const [sidebarFilters, setSidebarFilters] = useState([]);
  const [showFilters, setShowFilters] = useState('');
  const [sidebarCategoriesData, setSidebarCategoriesData] = useState([]);
  const [sidebarFiltersData, setSidebarFiltersData] = useState([]);
  const [cropFiltersOpen, setCropFiltersOpen] = useState(true);

  const coverCropGroup = [{ label: 'Brassica' }, { label: 'Legume' }, { label: 'Grass' }, { label: 'Broadleaf' }];

  // make an exhaustive array of all params in array e.g. cover crop group and use includes in linq
  const [sidebarFilterOptions, setSidebarFilterOptions] = useState(() => {
    const sidebarStarter = {};
    sidebarFiltersData.forEach((row) => {
      sidebarStarter[row.name] = [];
    });
    return sidebarStarter;
  });

  const legendData = getLegendDataBasedOnCouncil(councilShorthandRedux);

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  const tooltipContent = () => (
    <span>
      Cover Crop Group Filter
      <HelpOutlineIcon style={{ cursor: 'pointer', transform: 'scale(0.7)' }} />
    </span>
  );
  // // TODO: When is showFilters false?
  // NOTE: verify below when show filter is false.
  useEffect(() => {
    const value = !(window.location.pathname === '/'
      && from === 'table'
      && !speciesSelectorActivationFlagRedux
      && !comparisonView);
    setShowFilters(value);
  }, [speciesSelectorActivationFlagRedux, from, comparisonView]);

  const handleSoilDrainageFilter = () => {
    dispatchRedux(setSoilDrainageFilter(!soilDrainageFilterRedux));
  };

  const handleIrrigationFilter = () => {
    dispatchRedux(setIrrigationFilter(!irrigationFilterRedux));
  };

  const handleCropGroupFilter = (val) => {
    dispatchRedux(cropGroupFilterRedux === val ? setCropGroupFilter('') : setCropGroupFilter(val));
  };

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
    const cropData = cropDataRedux?.filter((crop, n, cd) => {
      let m;
      const match = (parm) => {
        if (parm === 'label') {
          m = crop[parm]?.toLowerCase().match(/\w+/g);
        } else if (parm === 'common') {
          m = crop.attributes.filter((c) => c.label === 'Cover Crop Group')[0].values[0]?.value.toLowerCase().match(/\w+/g);
        } else {
          m = crop[parm]?.toLowerCase().match(/\w+/g);
        }
        return !search || (m !== null && search.every((s) => m?.some((t) => t.includes(s))));
      };
      cd[n].inactive = true;
      return match('label') || match('scientificName') || match('common');
    });
    // transforms selectedFilterObject into an array
    const nonZeroKeys2 = Object.keys(selectedFilterObject).map((key) => {
      if (selectedFilterObject[key]?.length !== 0) {
        return { [key]: selectedFilterObject[key].map((item) => item.toString()) };
      }
      return '';
    });

    const filtered = cropData?.filter((crop, n, cd) => {
      const floodingFrequencyValue = crop.attributes.filter((a) => a.label === 'Flooding Frequency Tolerance')[0]?.values[0].value;
      let match = true;
      // iterate over all active filters
      nonZeroKeys2.forEach((keyObject) => {
        // get filter name ex. Drought Tolerance
        const key = Object.keys(keyObject)[0];
        // get filter values ex. [1,2,3]
        const vals = keyObject[key];
        if (crop.attributes.filter((att) => att.label === key)?.length > 0) {
          // if there is not an intersection, match = false
          if (!crop.attributes.filter((att) => att.label === key)[0]?.values.some((item) => vals.includes(item.value))) {
            match = false;
          }
        }
      });

      const matchesDrainageClass = (!drainageClassRedux ? true : crop.soilDrainage?.map((d) => d.toLowerCase())
        ?.includes(drainageClassRedux.toLowerCase()));

      const cropFloodingValueIsHigher = (!floodingFrequencyRedux ? true : floodingFrequencyRedux <= floodingFrequencyValue);

      cd[n].inactive = (!match)
      || !(matchesDrainageClass && cropFloodingValueIsHigher)
      || cropGroupFilterRedux?.length < 0 ? cd[n].inactive : !(crop?.group?.includes(cropGroupFilterRedux));

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
            unitRange: filter.unitRange,
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
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops?minimal=true&${query}`).then((data) => {
        const { startDate, endDate } = cashCropDataRedux.dateRange;

        const start = startDate ? moment(startDate).format('MM/DD') : '';
        const end = endDate ? moment(endDate).format('MM/DD') : '';
        cropDataFormatter(data.data, start, end);
        dispatchRedux(updateCropData(data.data));
        dispatchRedux(setAjaxInProgress(false));
      });
    }
  }, [
    cashCropDataRedux, regionIdRedux,
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
      <div>
        {filtersSelected && (
        <ListItem style={{
          textAlign: 'center',
        }}
        >
          <ListItemText
            primary={(
              <PSAButton
                onClick={resetAllFilters}
                style={{ cursor: 'pointer', color: 'red' }}
                data-test="crop-side-bar-clear-filters"
                title="Clear Filters"
              />
            )}
          />
        </ListItem>
        )}
      </div>
      <SoloFilter>
        <ListItemText>
          Soil Drainage Filter
        </ListItemText>
        <ListItemText
          display="block"
          primary={(
            <Grid item>
              <Typography variant="body1" display="inline">
                No
              </Typography>
              <Switch
                checked={soilDrainageFilterRedux}
                onChange={handleSoilDrainageFilter}
                name="soilDrainageFilter"
              />
              <Typography variant="body1" display="inline">
                Yes
              </Typography>
            </Grid>
                  )}
        />
      </SoloFilter>
      <SoloFilter>
        <ListItemText>
          Irrigation Dates Filter
        </ListItemText>
        <ListItemText
          display="block"
          primary={(
            <Grid item>
              <Typography variant="body1" display="inline">
                No
              </Typography>
              <Switch
                checked={irrigationFilterRedux}
                onChange={handleIrrigationFilter}
                name="checkedC"
              />
              <Typography variant="body1" display="inline">
                Yes
              </Typography>
            </Grid>
                  )}
        />
      </SoloFilter>
      <ListItem
        component="div"
      >
        <PSATooltip
          enterTouchDelay={0}
          title={(
            <p>Use the Cover Crop Group Filter to select specific cover crop groups to filter by.</p>
        )}
          tooltipContent={tooltipContent()}
        />
      </ListItem>
      <ListItem>
        {coverCropGroup.map((val) => {
          const selected = cropGroupFilterRedux === val.label;
          return (
            <Grid key={val.label} item>
              <Chip
                key={val.label}
                style={{
                  marginRight: 2,
                  marginBottom: 3,
                }}
                onClick={() => handleCropGroupFilter(val.label)}
                component="li"
                size="medium"
                label={val.label}
                color={selected ? 'primary' : 'secondary'}
              />
            </Grid>
          );
        })}
      </ListItem>
      {getFilters()}
    </List>
  ); // filterList

  useEffect(() => {
    // FIXME: this function returns a compoennt in useEffect, not sure why doing that
    filtersList();
  }, [sidebarFilters]);

  return !loading && (from === 'myCoverCropListStatic') ? (
    <Grid container spacing={3}>
      <Grid item>
        <PSAButton
          onClick={() => setComparisonView(false)}
          selected={!comparisonView}
          startIcon={<ListIcon style={{ fontSize: 'larger' }} />}
          buttonType="PillButton"
          title="CROP LIST"
        />
        <PSAButton
          onClick={() => setComparisonView(true)}
          selected={comparisonView}
          startIcon={<Compare style={{ fontSize: 'larger' }} />}
          buttonType="PillButton"
          data-test="comparison-view-btn"
          title="COMPARISON VIEW"
        />
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
                {showFilters && speciesSelectorActivationFlagRedux && !listView && (
                  <CoverCropSearch />
                )}

                {!listView && (
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
                    <PlantHardinessZone from="Browse Cover Crops" />
                    <CoverCropSearch />
                  </>
                )}
                <Box
                  sx={{
                    border: 0.5, borderRadius: 2, borderColor: 'black', mb: 2, overflow: 'hidden',
                  }}
                >
                  <ListItem
                    onClick={() => setCropFiltersOpen(!cropFiltersOpen)}
                    style={{
                      backgroundColor: 'inherit',

                    }}
                  >
                    <ListItemText primary="FILTERS" />

                    {cropFiltersOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={cropFiltersOpen} timeout="auto">
                    {filtersList()}
                  </Collapse>
                </Box>
                {from !== 'explorer'
                && (
                <Box
                  sx={{
                    border: 0.5, borderRadius: 2, borderColor: 'black', mb: 2, overflow: 'hidden',
                  }}
                >
                  <Legend legendData={legendData} modal />
                </Box>
                )}
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
