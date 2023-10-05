/*
  Contains the comparison tool for my cover crop list
  removeCrop handles removing a crop from the list
  TopBar contains the blue bar for adding crops
  RenderRelevantData updates the filtered values
  RenderSeedingData updates seeding data
  GetAverageGoalRating calculates the average of all the scores
  styled using ../../styles/cropComparisonView.scss
*/

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataTooltip,
  callCoverCropApi,
  getRating,
} from '../../../shared/constants';
import '../../../styles/cropComparisonView.scss';
import '../../../styles/MyCoverCropComparisonComponent.scss';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import CropCard from '../../../components/CropCard/CropCard';
import { setAjaxInProgress } from '../../../reduxStore/sharedSlice';

const lightBorder = {
  border: '1px solid #35999b',
  padding: '5px',
  marginBottom: '5px',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  width: 'calc(100%)',
};
const lightBG = {
  border: '1px solid white',
  backgroundColor: '#f1f7eb',
  padding: '5px',
  marginBottom: '5px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
  minHeight: '36px',
};

const GetAverageGoalRating = ({ crop }) => {
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  let goalRating = 0;
  selectedGoalsRedux.forEach((goal) => {
    if (crop.data.Goals[goal]) {
      goalRating = +crop.data.Goals[goal].values[0] + goalRating;
    }
  });
  return getRating(goalRating / selectedGoalsRedux.length);
};

const MyCoverCropComparison = ({ selectedCrops }) => {
  const dispatchRedux = useDispatch();

  // redux vars
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const zoneRedux = useSelector((stateRedux) => stateRedux.addressData.zone);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [loading, setLoading] = useState(false);
  const [sidebarDefs, setSidebarDefs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [dataDictionary, setDataDictionary] = useState([]);

  // TODO: Update SelectedCropsRedux

  const allData = [];
  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  selectedCrops = selectedCrops || selectedCropsRedux;

  useEffect(() => {
    if (stateIdRedux && regionIdRedux) {
      dispatchRedux(setAjaxInProgress(true));

      setLoading(true);
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/dictionary?${query}`).then((data) => {
        setDataDictionary(data.data);
      });
    }
  }, [stateIdRedux, regionIdRedux]);

  const setDataDict = async () => {
    await dataDictionary.forEach((item) => {
      item.attributes.map((i) => allData.push(i));
    });
  };

  useEffect(() => {
    setDataDict()
      .then(() => { setLoading(false); })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err.message);
      });
    setSidebarDefs(allData);
  }, [zoneRedux, dataDictionary]);

  // const getTooltipData = (keyName = '') => {
  //   const exactObject = sidebarDefs.find((keys) => keys.label === keyName);

  //   if (exactObject) {
  //     return exactObject.description;
  //   }
  //   return 'No Data';
  // };

  const [rows, setRows] = useState([]);
  const [tableHeaderCells, setCropNames] = useState([]);
  const tempCropNames = [];
  const tempRows = [];

  const buildTable = async () => {
    console.log('building');
    await comparisonKeysRedux.forEach((key) => {
      console.log(key);
      const newRow = { comparisonKey: key };
      // let allData;

      activeCropDataRedux.filter((crop) => selectedCropsRedux.includes(crop.id)).forEach((crop, index) => {
      // rows[`crop${index}`] = crop
        console.log(comparisonKeysRedux, crop);
        if (!tempCropNames.includes(crop.label)) { tempCropNames.push(crop.label); }

        // iterate ove all crop.data keys
        Object.keys(crop.data).forEach((dataKey) => {
        // iterate over all crop.data.dataKey keys
          Object.keys(crop?.data?.[dataKey]).forEach((nestedKey) => {
            if (crop.data[dataKey][nestedKey].label === key) {
              console.log(crop.data[dataKey][nestedKey]);
              // allData.push(crop.data?.[key]?.[k].label);
              newRow[`crop${index}`] = crop.data[dataKey][nestedKey].values;
            }
          });
        });
      });

      tempRows.push(newRow);
      console.log(tempRows);
    });
    console.log('built');
  };

  const buildTableHeaders = () => activeCropDataRedux.filter((crop) => selectedCropsRedux.includes(crop.id)).map((crop, index) => (
    <TableCell align="center">
      <CropCard
        crop={crop}
        // handleModalOpen={handleModalOpen}
        index={index}
        type="cropList"
        // comparisonKeys={comparisonKeysRedux}
        lightBG={lightBG}
        // GetAverageGoalRating={GetAverageGoalRating}
        dispatchRedux={dispatchRedux}
      />
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </TableCell>

  ));

  const buildTableRows = (row) => {
    console.log(row);
    return Object.keys(row).map((key, i) => {
      console.log(i);
      return <TableCell align="center">{row[`crop${i}`]}</TableCell>;
    });
  };

  console.log(comparisonKeysRedux, tableHeaderCells);

  // console.log(buildTable());
  useEffect(() => {
    buildTable().then(() => { console.log(tempRows); setRows(tempRows); setCropNames(tempCropNames); });
  }, [comparisonKeysRedux, selectedCrops]);

  return (!loading) && (
  <TableContainer style={{ overflowX: 'initial' }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell />
          {buildTableHeaders()}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
          >
            <TableCell
              component="th"
              scope="row"
              sx={{
                position: 'sticky', left: 0, background: 'white',
              }}
            >
              <Typography variant="body1" sx={{ fontStyle: 'bold' }}>
                {row.comparisonKey}
              </Typography>
            </TableCell>
            {buildTableRows(row)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default MyCoverCropComparison;
