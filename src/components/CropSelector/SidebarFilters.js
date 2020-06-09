import React, { useEffect, useState, Fragment } from "react";
import { sidebarFilters } from "../../shared/constants";
import {
  ListItem,
  List,
  ListItemText,
  Collapse,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const getObjectDataFromCategory = (categoryName) => {
  let sidebarDataObj = sidebarFilters.filter(
    (val) => val.category === categoryName
  );
  return sidebarDataObj[0].data;
};

const SidebarFilters = (props) => {
  const filterType = props.type;
  const [filterData, setFilterData] = useState([]);
  const [taxonomyOpen, setTaxonomyOpen] = useState({
    0: false,
    1: false,
  });

  useEffect(() => {
    setFilterData(getObjectDataFromCategory(filterType));
    return () => {
      setFilterData([]);
    };
  }, []);

  switch (filterType) {
    case "Taxonomy": {
      return (
        <Fragment>
          <ListItem
            button
            onClick={() =>
              setTaxonomyOpen({ ...taxonomyOpen, 0: !taxonomyOpen[0] })
            }
          >
            <ListItemText primary="Cover Crop Group" disableTypography />
            {taxonomyOpen[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={taxonomyOpen[0]}>
            <FormControlLabel
              //   classes={{ root: classes.formControlLabel }}
              control={<Checkbox value="Legume" />}
              label={<Typography variant="body2">Legume</Typography>}
            />
          </Collapse>
          <ListItem
            button
            onClick={() =>
              setTaxonomyOpen({ ...taxonomyOpen, 1: !taxonomyOpen[1] })
            }
          >
            <ListItemText primary="Family Common Name" disableTypography />
            {taxonomyOpen[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={taxonomyOpen[1]}>Family Common Name</Collapse>
        </Fragment>
      );

      break;
    }

    default:
      return (
        <div>
          <div>{filterType}</div>
        </div>
      );
  }
  //   return (
  //     <div>
  //       <div></div>
  //     </div>
  //   );
};

export default SidebarFilters;
