import { Chip, Collapse, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';
import { Context } from '../../../../store/Store';

const PlantHardinessZone = (props) => {
  let { handleToggle, dispatch, sfilters } = props;

  const { state } = useContext(Context);

  return (
    <Fragment>
      <List component="div" disablePadding>
        <ListItem button onClick={(e) => handleToggle(!state.zoneToggle, 'ZONE_TOGGLE')}>
          <ListItemText
            primary={
              <Typography variant="body2" className="text-uppercase">
                Plant Hardiness Zone
              </Typography>
            }
          />
          {state.zoneToggle ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Collapse in={state.zoneToggle}>
        <List component="div" disablePadding>
          <ListItem component="div">
            <Grid container spacing={1}>
              {[4, 5, 6, 7].map((zone, index) => (
                <Grid item key={index}>
                  <Chip
                    onClick={() => {
                      dispatch({
                        type: 'UPDATE_ZONE',
                        data: {
                          zoneText: `Zone ${zone}`,
                          zone: zone,
                        },
                      });
                    }}
                    component="li"
                    size="medium"
                    label={`Zone ${zone}`}
                    color={parseInt(sfilters.zone) === zone ? 'primary' : 'secondary'}
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

export default PlantHardinessZone;