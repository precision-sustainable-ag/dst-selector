/*
  Handles rendering the goals and updating them when selected
*/

import {
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PSACheckbox } from 'shared-react-components/src';
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
      <ListItemButton
        sx={{ backgroundColor: goalsOpen ? '#add08f' : 'white' }}
        component="div"
        onClick={() => setGoalsOpen(!goalsOpen)}
      >
        <ListItemText primary={<Typography variant="body2">COVER CROP GOALS</Typography>} />
        {goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={goalsOpen} timeout="auto">
        <List component="div" disablePadding>
          <ListItem component="div">
            <Grid container spacing={1}>
              {goals.map((goal, index) => (
                <Grid item xs={12} key={`goals-inner-${index}`}>
                  <FormControlLabel
                    control={(
                      <PSACheckbox
                        checked={comparisonKeys.includes(goal.name)}
                        name={goal.name}
                        color="primary"
                        onChange={() => {
                          const comparisonKeysCopy = comparisonKeys;
                          const indexOfValue = comparisonKeysCopy.indexOf(goal.name);
                          if (indexOfValue === -1) {
                            comparisonKeysCopy.push(goal.name);
                          } else {
                            comparisonKeysCopy.splice(indexOfValue, 1);
                          }
                          dispatchRedux(updateComparisonKeys(comparisonKeysCopy));
                        }}
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
