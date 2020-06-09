import React from "react";
import { sidebarFilters } from "../../shared/constants";
import { ListItem, List } from "@material-ui/core";

const SidebarFilters = (props) => {
  const filterType = props.type;

  switch (filterType) {
    case "Taxonomy": {
      return (
        <ListItem>
          <List>{filterType}</List>
        </ListItem>
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
