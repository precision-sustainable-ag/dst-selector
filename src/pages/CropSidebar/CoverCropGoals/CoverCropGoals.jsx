// eslint-disable react/jsx-one-expression-per-line
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PSAButton } from 'shared-react-components/src';
import { updateProgress } from '../../../reduxStore/sharedSlice';

const CoverCropGoals = () => {
  const dispatchRedux = useDispatch();

  // redux vars
  const selectedGoalsRedux = useSelector((stateRedux) => stateRedux.goalsData.selectedGoals);

  // useState vars
  const [goalsOpen, setGoalsOpen] = useState(false);

  const changeProgress = () => {
    dispatchRedux(updateProgress('DECREMENT'));
  }; // changeProgress

  return (
    <Box
      sx={{
        border: 0.5, borderRadius: 2, borderColor: 'black', mb: 2, overflow: 'hidden',
      }}
    >
      {' '}
      <ListItemButton onClick={() => setGoalsOpen(!goalsOpen)}>
        <ListItemText primary="GOALS" sx={{ fontWeight: 'bold' }} />
        {goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={goalsOpen} timeout="auto" unmountOnExit>
        {selectedGoalsRedux.length === 0 ? (
          <List component="div" disablePadding>
            <ListItemButton sx={{ paddingLeft: 3 }}>
              <ListItemText primary="No Goals Selected" />
            </ListItemButton>
            <ListItem sx={{ paddingLeft: 3 }}>
              <PSAButton onClick={() => changeProgress()} title="click to edit" buttonType="" />
            </ListItem>
          </List>
        ) : (
          <>
            <List component="div" disablePadding>
              <ListItem sx={{ paddingLeft: 3 }}>
                <ListItemText
                  primary={(
                    <>
                      <Typography variant="body1"> Goal Priority Order</Typography>
                      {selectedGoalsRedux?.map((goal, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{ fontWeight: 'normal', fontSize: '10pt', color: '#367F81' }}
                        >
                          <br />
                          {index + 1}
                          {': '}
                          {goal}
                        </Typography>
                      ))}
                    </>
                  )}
                />
              </ListItem>
            </List>
            <ListItem sx={{ paddingLeft: 3 }}>
              <ListItemText disableTypography>
                <Typography
                  variant="button"
                  sx={{ color: 'red' }}
                  onClick={() => changeProgress()}
                  style={{ cursor: 'pointer' }}
                >
                  &nbsp;Click Here to Edit Goals
                </Typography>
              </ListItemText>
            </ListItem>
          </>
        )}
      </Collapse>
    </Box>
  );
};

export default CoverCropGoals;
