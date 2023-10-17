// eslint-disable react/jsx-one-expression-per-line
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomStyles } from '../../../shared/constants';
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
    <>
      {' '}
      <ListItem
        button
        onClick={() => setGoalsOpen(!goalsOpen)}
        style={{
          backgroundColor: goalsOpen ? CustomStyles().lightGreen : 'inherit',
          borderTop: '4px solid white',
        }}
      >
        <ListItemText primary="COVER CROP GOALS" />
        {goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={goalsOpen} timeout="auto" unmountOnExit>
        {selectedGoalsRedux.length === 0 ? (
          <List component="div" disablePadding>
            <ListItem button sx={{ paddingLeft: 3 }}>
              <ListItemText primary="No Goals Selected" />
            </ListItem>
            <ListItem sx={{ paddingLeft: 3 }}>
              <Button onClick={() => changeProgress()}>click to edit</Button>
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
                          sx={{ fontWeight: 'normal', fontSize: '10pt', color: '#48a8ab' }}
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
    </>
  );
};

export default CoverCropGoals;
