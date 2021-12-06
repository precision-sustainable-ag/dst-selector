/*
  Unused
*/
import React, { useEffect, useState } from "react";
import { sidebarFilters } from "../../shared/constants";
import BasicAgronomics from "./Filters/BasicAgronomics";
import DiseaseNonWeedPests from "./Filters/DiseaseNonWeedPests";
import EnvironmentalTolerances from "./Filters/EnvironmentalTolerances";
import GrazersPollinators from "./Filters/GrazersPollinators";
import Growth from "./Filters/Growth";
import SoilConditions from "./Filters/SoilConditions";
import Taxonomy from "./Filters/Taxonomy";
import Termination from "./Filters/Termination";
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
