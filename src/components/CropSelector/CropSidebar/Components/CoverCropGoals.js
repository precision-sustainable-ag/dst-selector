import { Button, Collapse, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';
import { arrayMove, List as ListMovable } from 'react-movable';
import { Context } from '../../../../store/Store';
import { CustomStyles } from '../../../../shared/constants';

const CoverCropGoals = (props) => {
  let { handleToggle, classes, changeProgress, style } = props;

  const { state, dispatch } = useContext(Context);

  const updateSelectedGoals = (newGoalArr, oldIndex, newIndex) => {
    let newGoals = arrayMove(newGoalArr, oldIndex, newIndex);

    dispatch({
      type: 'DRAG_GOALS',
      data: {
        selectedGoals: newGoals,
        snackOpen: true,
        snackMessage: 'Goal Priority Changed',
      },
    });
  }; // updateSelectedGoals

  const renderList = (children, props, isDragged) => (
    <ol
      className="goalsListFilter"
      {...props}
      style={{
        cursor: isDragged ? 'grabbing' : undefined,
      }}
    >
      {children}
    </ol>
  );

  const renderItem = (value, props, isDragged, isSelected, index) => (
    <li
      {...props}
      style={{
        ...style,
      }}
    >
      <div className="d-flex w-100 flex-row justify-content-between align-items-center">
        <div>
          <Typography
            variant="body1"
            style={{
              cursor: isDragged ? 'grabbing' : 'grab',
              fontSize: '10pt',
              fontWeight: isDragged || isSelected ? '700' : 'normal',
              color: '#48a8ab',
              width: '100%',
            }}
          >
            {`${index + 1}. ${value}`}
          </Typography>
        </div>
      </div>
    </li>
  );

  return (
    <Fragment>
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
            <ListItem button className={classes.nested}>
              <ListItemText primary="No Goals Selected" />
            </ListItem>
            <ListItem className={classes.nested}>
              <Button onClick={() => changeProgress('decrement')}>click to edit</Button>
            </ListItem>
          </List>
        ) : (
          <Fragment>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText
                  primary={
                    <div>
                      <div>
                        <Typography variant="body1"> Goal Priority Order</Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          style={{
                            fontWeight: 'normal',
                            fontSize: '10pt',
                          }}
                        >
                          Click & drag to reorder
                        </Typography>
                      </div>
                    </div>
                  }
                />
              </ListItem>
            </List>
            <ListMovable
              values={state.selectedGoals}
              onChange={({ oldIndex, newIndex }) =>
                updateSelectedGoals(state.selectedGoals, oldIndex, newIndex)
              }
              renderList={({ children, props, isDragged }) =>
                renderList(children, props, isDragged)
              }
              renderItem={({ value, props, isDragged, isSelected, index }) =>
                renderItem(value, props, isDragged, isSelected, index)
              }
            />

            <ListItem className={classes.nested}>
              <ListItemText disableTypography>
                <Typography
                  variant="button"
                  className="text-uppercase text-left text-danger font-weight-bold"
                  onClick={() => changeProgress('decrement')}
                  style={{ cursor: 'pointer' }}
                >
                  &nbsp;Click To Edit
                </Typography>
              </ListItemText>
            </ListItem>
          </Fragment>
        )}
      </Collapse>
    </Fragment>
  );
};

export default CoverCropGoals;
