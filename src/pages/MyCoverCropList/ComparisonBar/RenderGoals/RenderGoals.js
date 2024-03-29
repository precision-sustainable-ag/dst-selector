/*
  Handles rendering the goals and updating them when selected
*/

import {
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateComparisonKeys } from '../../../../reduxStore/sharedSlice';

const RenderGoals = ({
  goals,
  goalsOpen,
  setGoalsOpen,
  comparisonKeys,
}) => {
  const dispatchRedux = useDispatch();
  return (
    <>
      <ListItem
        sx={{ backgroundColor: goalsOpen ? '#add08f' : 'white' }}
        component="div"
        onClick={() => setGoalsOpen(!goalsOpen)}
      >
        <ListItemText primary={<Typography variant="body2">COVER CROP GOALS</Typography>} />
        {goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={goalsOpen} timeout="auto">
        <List component="div" disablePadding>
          <ListItem component="div">
            <Grid container spacing={1}>
              {goals.map((goal, index) => (
                <Grid item xs={12} key={`goals-inner-${index}`}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={comparisonKeys.includes(goal.name)}
                        onChange={() => {
                        // check if value exists, add else remove if exists
                          const comparisonKeysCopy = comparisonKeys;
                          const indexOfValue = comparisonKeysCopy.indexOf(goal.name);
                          if (indexOfValue === -1) {
                          // doesn't exist
                            comparisonKeysCopy.push(goal.name);
                          } else {
                            comparisonKeysCopy.splice(indexOfValue, 1);
                          }

                          dispatchRedux(updateComparisonKeys(comparisonKeysCopy));
                        }}
                        name={goal.name}
                        color="primary"
                      />
                    )}
                    label={<small>{goal.name}</small>}
                  />
                </Grid>
              ))}
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default RenderGoals;
