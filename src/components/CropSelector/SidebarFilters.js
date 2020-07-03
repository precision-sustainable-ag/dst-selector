// DEPRECATED
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
import Taxonomy from "./Filters/Taxonomy";
import EnvironmentalTolerances from "./Filters/EnvironmentalTolerances";
import BasicAgronomics from "./Filters/BasicAgronomics";
import SoilConditions from "./Filters/SoilConditions";
import Growth from "./Filters/Growth";
import Termination from "./Filters/Termination";
import GrazersPollinators from "./Filters/GrazersPollinators";
import DiseaseNonWeedPests from "./Filters/DiseaseNonWeedPests";
import Weeds from "./Filters/Weeds";

const getObjectDataFromCategory = (categoryName) => {
  let sidebarDataObj = sidebarFilters.filter(
    (val) => val.category === categoryName
  );
  return sidebarDataObj[0].data;
};

const SidebarFilters = (props) => {
  const filterType = props.type;
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(getObjectDataFromCategory(filterType));
    return () => {
      setFilterData([]);
    };
  }, []);

  switch (filterType) {
    case "Taxonomy": {
      return <Taxonomy />;
    }
    case "Environmental Tolerances":
      return <EnvironmentalTolerances />;
    case "Basic Agronomics":
      return <BasicAgronomics />;
    case "Soil Conditions":
      return <SoilConditions />;
    case "Growth":
      return <Growth />;
    case "Termination":
      return <Termination />;
    case "Grazers & Pollinators":
      return <GrazersPollinators />;
    case "Weeds":
      return <Weeds />;
    case "Disease & Non-Weed Pests":
      return <DiseaseNonWeedPests />;

    //   unhandled case would just return the name for now
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
