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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TableContainer,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataTooltip,
  extractData,
  trimString,
} from '../../../shared/constants';
import { setTableWidth } from '../../../reduxStore/pageSlice';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';

const MyCoverCropComparisonTable = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const activeCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropIds);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

  // useState vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [rows, setRows] = useState([]);
  const tempRows = [];

  // TODO: Update SelectedCropsRedux
  useEffect(() => {
    setSelectedCrops(cropDataRedux.filter((crop) => selectedCropIdsRedux.includes(crop.id)));
  }, [cropDataRedux, activeCropIdsRedux, selectedCropIdsRedux]);

  const handleModalOpen = (crop) => {
    // put data inside modal
    setModalData(crop);
    setModalOpen(true);
  };
  const buildTable = async () => {
    // used to add cover crop group
    const groupRow = { comparisonKey: 'Cover Crop Group' };
    // used to add average goal rating
    const goalRow = { comparisonKey: 'Average Goal Rating' };
    const sciNameRow = { comparisonKey: 'Scientific Name' };
    // iterate over each crop and get group and average goal rating if selectedgoals.length > 0
    selectedCrops.forEach((crop, index) => {
      // this is needed to format it like the other attributes
      groupRow[`crop${index}`] = { values: [] };
      sciNameRow[`crop${index}`] = { values: [] };
      // same thing here but it also specifies it should be a pillbox
      goalRow[`crop${index}`] = { values: [], dataType: 'pillbox' };
      // push crop group
      groupRow[`crop${index}`].values.push({ value: crop.group });
      // push crop scientific name
      sciNameRow[`crop${index}`].values.push({ value: crop?.scientificName ? trimString(crop?.scientificName, 25) : 'No Data' });
      // if selected goals > 1 calculate average goal rating
      if (selectedGoalsRedux.length > 0) {
        let goalRating = 0;
        selectedGoalsRedux.forEach((goal) => {
          if (crop.goals.filter((a) => a.label === goal)?.length > 0) {
            goalRating = +crop.goals.filter((a) => a.label === goal)[0].values[0].value + goalRating;
          }
        });

        // push average goal rating
        goalRow[`crop${index}`].values.push(goalRating / selectedGoalsRedux.length);
      }
    });

    // push group
    tempRows.push(groupRow);
    tempRows.push(sciNameRow);

    // if selected goals > 1 push average goal rating
    if (selectedGoalsRedux.length > 0) {
      tempRows.push(goalRow);
    }

    await comparisonKeysRedux.forEach((key) => {
      const newRow = { comparisonKey: key };
      selectedCrops.forEach((crop, index) => {
        crop?.attributes?.forEach((attribute) => {
          if (attribute.label === key) {
            newRow[`crop${index}`] = attribute;
          }
        });
        if (newRow[`crop${index}`] === undefined) newRow[`crop${index}`] = null;
      });

      tempRows.push(newRow);
    });
  };
  const tableRef = useRef(null);

  const buildTableHeaders = () => selectedCrops.map((crop, index) => (
    <TableCell key={index} align="center">
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          cursor: 'pointer',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: 'primary.dark',
          },
          transition: 'color 0.3s ease',
        }}
        onClick={() => handleModalOpen(crop)}
      >
        {crop.label}
      </Typography>
    </TableCell>
  ));

  const buildTableRows = (row) => Object.keys(row).map((key, index) => {
    const attribute = row[`crop${index - 1}`];
    // handles the key name
    if (key === 'comparisonKey') {
      return (
        <TableCell
          key={index}
          component="th"
          scope="row"
          sx={{
            position: 'sticky', left: 0, background: 'white',
          }}
        >
          <Grid container direction="row" spacing={1}>
            <Grid item>
              <DataTooltip
                data={row?.crop0?.description ? row?.crop0?.description : 'No Data'}
                disableInteractive
                placement="top-start"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ fontStyle: 'bold' }}>
                {row.comparisonKey}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
      );
    }

    const getAttributeData = () => {
      // handles no attribute
      if (!attribute) {
        return <Typography variant="body2">No Data</Typography>;
      }
      const attributeValues = [];
      for (let i = 0; i < attribute?.values.length; i++) {
        if (attribute?.values[i].value) {
          attributeValues.push(`${attribute?.values[i].value}${attribute?.units ? ` ${attribute?.units}` : ''}`);
        } else {
          attributeValues.push(attribute?.values[i]);
        }
      }
      const dataType = attribute?.dataType;
      return extractData(attributeValues, dataType, attribute, councilShorthandRedux);
    };

    return (
      <TableCell align="center" key={index}>
        {getAttributeData()}
      </TableCell>
    );
  });

  useEffect(() => {
    buildTable().then(() => { setRows(tempRows); });
  }, [comparisonKeysRedux, selectedCrops]);

  useEffect(() => {
    if (tableRef.current) {
      dispatchRedux(setTableWidth(tableRef.current.scrollWidth));
    }
  }, [rows, dispatchRedux, tableRef]);
  return (
    // <TableContainer style={{ overflowX: 'initial' }}>
    <TableContainer component="div" sx={{ overflowX: 'initial' }}>
      <Table stickyHeader aria-label="sticky table" ref={tableRef}>
        <TableHead>
          {modalOpen && (
            <CropDetailsModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              crop={modalData}
            />
          )}
          <TableRow>
            <TableCell />
            {buildTableHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.comparisonKey} ${index}`}
              data-test={`${row.comparisonKey}-row`}
            >
              {buildTableRows(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyCoverCropComparisonTable;
