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
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataTooltip,
  extractData,
} from '../../../shared/constants';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import CropCard from '../../../components/CropCard/CropCard';

const MyCoverCropComparisonTable = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const activeCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropIds);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const selectedCropIdsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCropIds);

  // useState vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [rows, setRows] = useState([]);
  const tempRows = [];

  // TODO: Update SelectedCropsRedux

  useEffect(() => {
    setSelectedCrops(cropDataRedux.filter((crop) => activeCropIdsRedux.includes(crop.id)).filter((crop) => selectedCropIdsRedux.includes(crop.id)));
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

    // iterate over each crop and get group and average goal rating if selectedgoals.length > 0
    selectedCrops.forEach((crop, index) => {
      // this is needed to format it like the other attributes
      groupRow[`crop${index}`] = { values: [] };
      // same thing here but it also specifies it should be a pillbox
      goalRow[`crop${index}`] = { values: [], dataType: 'pillbox' };
      // push crop group
      groupRow[`crop${index}`].values.push(crop.attributes.filter((a) => a.label === 'Cover Crop Group')[0]?.values[0]);

      // if selected goals > 1 calculate average goal rating
      if (selectedGoalsRedux.length > 0) {
        let goalRating = 0;
        selectedGoalsRedux.forEach((goal) => {
          if (crop.goals.filter((a) => a.label === goal)) {
            goalRating = +crop.goals.filter((a) => a.label === goal)[0].values[0] + goalRating;
          }
        });

        // push average goal rating
        goalRow[`crop${index}`].values.push(goalRating / selectedGoalsRedux.length);
      }
    });

    // push group
    tempRows.push(groupRow);

    // if selected goals > 1 push average goal rating
    if (selectedGoalsRedux.length > 0) {
      tempRows.push(goalRow);
    }

    await comparisonKeysRedux.forEach((key) => {
      const newRow = { comparisonKey: key };
      console.log('selectedCrops', selectedCrops);
      selectedCrops.forEach((crop, index) => {
        crop?.attributes?.forEach((attribute) => {
          if (attribute.label === key) {
            newRow[`crop${index}`] = attribute;
          }
        });
        // });
      });

      tempRows.push(newRow);
    });
  };

  const buildTableHeaders = () => selectedCrops.map((crop, index) => (
    <TableCell key={index} align="center">
      <CropCard
        crop={crop}
        index={index}
        dispatchRedux={dispatchRedux}
        handleModalOpen={handleModalOpen}
      />
      <CropDetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
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

    return (
      <TableCell align="center" key={index}>
        {extractData(attribute, 'comparisonTable')}
      </TableCell>
    );
  });

  useEffect(() => {
    buildTable().then(() => { setRows(tempRows); });
  }, [comparisonKeysRedux, selectedCrops]);

  return (
    // <TableContainer style={{ overflowX: 'initial' }}>
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell />
            {buildTableHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.comparisonKey} ${index}`}
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
