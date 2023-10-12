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
  getRating,
} from '../../../shared/constants';
import CropDetailsModal from '../../../components/CropDetailsModal/CropDetailsModal';
import CropCard from '../../../components/CropCard/CropCard';

const MyCoverCropComparison = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const activeCropDataRedux = useSelector((stateRedux) => stateRedux.cropData.activeCropData);
  const cropDataRedux = useSelector((stateRedux) => stateRedux.cropData.cropData);
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);
  const comparisonKeysRedux = useSelector((stateRedux) => stateRedux.sharedData.comparisonKeys);
  const selectedCropsRedux = useSelector((stateRedux) => stateRedux.cropData.selectedCrops);

  // useState vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [rows, setRows] = useState([]);
  const tempRows = [];

  // TODO: Update SelectedCropsRedux

  useEffect(() => {
    setSelectedCrops(cropDataRedux.filter((crop) => activeCropDataRedux.includes(crop.id)).filter((crop) => selectedCropsRedux.includes(crop.id)));
  }, [cropDataRedux, activeCropDataRedux, selectedCropsRedux]);

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
      groupRow[`crop${index}`].values.push(crop.group);

      // if selected goals > 1 calculate average goal rating
      if (selectedGoalsRedux.length > 0) {
        let goalRating = 0;
        selectedGoalsRedux.forEach((goal) => {
          if (crop.data.Goals[goal]) {
            goalRating = +crop.data.Goals[goal].values[0] + goalRating;
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

      selectedCrops.forEach((crop, index) => {
        // iterate ove all crop.data keys
        Object.keys(crop.data).forEach((dataKey) => {
          // iterate over all crop.data.dataKey keys
          Object.keys(crop?.data?.[dataKey]).forEach((nestedKey) => {
            if (crop.data[dataKey][nestedKey]?.label === key) {
              newRow[`crop${index}`] = crop.data[dataKey][nestedKey];
            }
          });
        });
      });

      tempRows.push(newRow);
    });
  };

  const buildTableHeaders = () => selectedCrops.map((crop, index) => (
    <TableCell key={index} align="center">
      <CropCard
        crop={crop}
        index={index}
        type="cropList"
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
        <TableCell key={index} align="center">
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

    // handles default
    return (
      <TableCell align="center">
        <Typography variant="body2">{attribute.values[0].toString()}</Typography>
      </TableCell>
    );
  });

  useEffect(() => {
    buildTable().then(() => { setRows(tempRows); });
  }, [comparisonKeysRedux, selectedCrops]);

  return (
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
