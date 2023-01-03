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
import React, { useContext, Fragment } from 'react';
// import { arrayMove, List as ListMovable } from 'react-movable';
import { Context } from '../../../store/Store';
import { CustomStyles } from '../../../shared/constants';

const CoverCropGoals = ({ handleToggle }) => {
  const { state, dispatch } = useContext(Context);

  const changeProgress = () => {
    dispatch({
      type: 'UPDATE_PROGRESS',
      data: {
        type: 'DECREMENT',
      },
    });
  }; // changeProgress

  return (
    <>
      {' '}
      <ListItem
        button
        onClick={() => handleToggle('goalsOpen')}
        style={{
          backgroundColor: state.goalsOpen ? CustomStyles().lightGreen : 'inherit',
          borderTop: '4px solid white',
        }}
      >
        <ListItemText primary="COVER CROP GOALS" />
        {state.goalsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={state.goalsOpen} timeout="auto" unmountOnExit>
        {state.selectedGoals.length === 0 ? (
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
                      {state?.selectedGoals?.map((goal, index) => (
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 'normal', fontSize: '10pt', color: '#48a8ab' }}
                        >
                          <br />
                          {index}
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
                  className="text-uppercase text-left text-danger font-weight-bold"
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
