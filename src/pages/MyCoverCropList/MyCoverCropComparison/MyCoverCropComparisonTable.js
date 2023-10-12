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
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataTooltip,
  RenderSeedPriceIcons,
  callCoverCropApi,
  getRating,
} from '../../../shared/constants';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import CropCard from '../../../components/CropCard/CropCard';
import { setAjaxInProgress } from '../../../reduxStore/sharedSlice';

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

  // const getTooltipData = (data) => {
  //   if (data) {
  //     return exactObject.description;
  //   }
  //   return 'No Data';
  // };

  const [rows, setRows] = useState([]);
  const tempRows = [];

  const buildTable = async () => {
    // console.log('building');
    await comparisonKeysRedux.forEach((key) => {
      // console.log(key);
      const newRow = { comparisonKey: key };
      // let allData;

      activeCropDataRedux.filter((crop) => selectedCropsRedux.includes(crop.id)).forEach((crop, index) => {
      // rows[`crop${index}`] = crop
        // console.log(comparisonKeysRedux, crop);

        // iterate ove all crop.data keys
        Object.keys(crop.data).forEach((dataKey) => {
        // iterate over all crop.data.dataKey keys
          Object.keys(crop?.data?.[dataKey]).forEach((nestedKey) => {
            if (crop.data[dataKey][nestedKey]?.label === key) {
              // console.log(crop.data[dataKey][nestedKey]);
              // allData.push(crop.data?.[key]?.[k].label);
              newRow[`crop${index}`] = crop.data[dataKey][nestedKey];
            }
          });
        });
      });

      tempRows.push(newRow);
      // console.log(tempRows);
    });
    // console.log('built');
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

  // const buildTableCell = (key, attribute) => {

  // };

  const buildTableRows = (row) => Object.keys(row).map((key, i) => {
    // <TableCell align="center">{buildTableCell(key, row[`crop${i}`])}</TableCell>;

    console.log(row);

    const attribute = row[`crop${i - 1}`];

    // handles the key name
    if (key === 'comparisonKey') {
      return (
        <TableCell
          component="th"
          scope="row"
          sx={{
            position: 'sticky', left: 0, background: 'white',
          }}
        >
          <DataTooltip
            data={row?.crop0?.description ? row?.crop0?.description : 'No Data'}
            disableInteractive
            placement="top-start"
          />
          <Typography variant="body1" sx={{ fontStyle: 'bold' }}>
            {row.comparisonKey}
          </Typography>
        </TableCell>
      );
    }

    // handles no data
    if (!attribute) {
      return (
        <TableCell align="center">
          <Typography variant="body2">No Data</Typography>
        </TableCell>

      );
    }

    // handles pillbox data
    if (attribute?.values?.length > 0 && attribute?.dataType === 'pillbox') {
      return (
        <TableCell align="center">
          {getRating(attribute.values[0])}
        </TableCell>
      );
    }

    // handle currency
    if (attribute?.values?.length > 0 && attribute?.dataType === 'currency') {
      return (
        <TableCell align="center">
          <RenderSeedPriceIcons val={attribute.values[0]} />
        </TableCell>
      );
    }

    // handles the true false keys
    if ((attribute.label === 'Frost Seeding' || (attribute.label === 'Can Aerial Seed?' || attribute.label === 'Aerial Seeding'))) {
      return (
        <TableCell align="center">
          <Typography variant="body2">
            {attribute?.values[0] ? 'Yes' : 'N/A'}
          </Typography>
        </TableCell>
      );
    }

    return (
      <TableCell align="center">
        <Typography variant="body2">{attribute.values[0].toString()}</Typography>
      </TableCell>
    );
  });

  // console.log(comparisonKeysRedux, tableHeaderCells);

  // console.log(buildTable());
  useEffect(() => {
    buildTable().then(() => { console.log(tempRows); setRows(tempRows); });
  }, [comparisonKeysRedux, selectedCrops]);

  console.log(rows);

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
            {buildTableRows(row)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default MyCoverCropComparison;
