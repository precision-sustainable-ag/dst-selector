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
import React, { Fragment } from 'react';
const RenderGoals = ({
  goals = [],
  setGoals = () => {},
  goalsOpen,
  setGoalsOpen = () => {},
  classes = {},
  comparisonKeys = [],
  dispatch = () => {},
}) => {
  return (
    <Fragment>
      <ListItem
        button
        // className={classes.nested}
        className={goalsOpen ? 'filterOpen' : 'filterClose'}
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
                    control={
                      <Checkbox
                        //   checked={checkIfSelected(val.name)}
                        checked={comparisonKeys.includes(goal.name)}
                        //   onChange={handleChange}
                        onChange={() => {
                          // check if value exists, add else remove if exists
                          let comparisonKeysCopy = comparisonKeys;
                          let indexOfValue = comparisonKeysCopy.indexOf(goal.name);
                          if (indexOfValue === -1) {
                            // doesn't exist
                            comparisonKeysCopy.push(goal.name);
                          } else {
                            comparisonKeysCopy.splice(indexOfValue, 1);
                          }

                          dispatch({
                            type: 'UPDATE_COMPARISON_KEYS',
                            data: {
                              comparisonKeys: comparisonKeysCopy,
                            },
                          });
                        }}
                        name={goal.name}
                        color="primary"
                      />
                    }
                    label={<small>{goal.name}</small>}
                  />
                </Grid>
              ))}
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
};

export default RenderGoals;
