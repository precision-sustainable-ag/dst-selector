import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Chip, Grid } from "@material-ui/core";

const CoverCropType = forwardRef((props, ref) => {
  const [selected, setSelected] = useState({ "Cover Crop Group": [] });

  useEffect(() => {
    props.setSidebarFilterOptions({
      ...props.sidebarFilterOptions,
      ...selected,
    });
  }, [selected]);

  useImperativeHandle(ref, () => ({
    resetFilters() {
      setSelected({ "Cover Crop Group": [] });
    },
  }));

  const handleClick = (name, val) => {
    if (selected["Cover Crop Group"].includes(val)) {
      const removed = selected["Cover Crop Group"].filter(
        (chipVals) => chipVals !== val
      );
      setSelected({ ...selected, "Cover Crop Group": removed });
    } else {
      const added = selected["Cover Crop Group"];
      added.push(val);

      setSelected({ ...selected, "Cover Crop Group": added });
    }
  };

  return (
    <Grid container spacing={1}>
      {props.filters.values.map((val, index) => (
        <Grid item key={index}>
          <Chip
            onClick={() => handleClick(props.filters.name, val.name)}
            component="li"
            size="medium"
            label={val.name}
            color={
              props.sidebarFilterOptions["Cover Crop Group"].includes(val.name)
                ? "primary"
                : "secondary"
            }
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default CoverCropType;
