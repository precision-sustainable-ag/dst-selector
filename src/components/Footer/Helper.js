/*
  Unused
*/

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import HelpIcon from "@material-ui/icons/Help";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" },
];

export default function Helper() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <div className={classes.root}>
    <div>
      {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<HelpIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
