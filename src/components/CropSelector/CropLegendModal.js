import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CloseRounded, FiberManualRecord } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "1em",
    width: "30%",
    // padding: theme.spacing(2, 4, 3)
  },
}));

const CropLegendModal = (props) => {
  const classes = useStyles();

  return (
    <Modal
      open={props.legendModal}
      onClose={props.handleLegendModal}
      BackdropComponent={Backdrop}
      disableBackdropClick={props.disableBackdropClick}
      className={classes.modal}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.legendModal}>
        <div className={`modalLegendPaper ${classes.paper}`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <Typography variant="h4">LEGEND</Typography>
              </div>
              <div className="col-6 text-right">
                <Button onClick={props.handleLegendModal}>
                  <CloseRounded />
                </Button>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 legendModalRow">
                <Typography variant="body1">
                  <FiberManualRecord className="reliable" />
                  <span className="pl-3">{"Reliable Establishment"}</span>
                </Typography>
              </div>
              <div className="col-12 legendModalRow">
                <Typography variant="body1">
                  <FiberManualRecord className="temperatureRisk" />
                  <span className="pl-3">
                    {"Temperature Risk To Establishment"}
                  </span>
                </Typography>
              </div>
              <div className="col-12 legendModalRow">
                <Typography variant="body1">
                  <FiberManualRecord className="frostPossible" />
                  <span className="pl-3">{"Frost Seeding Possible"}</span>
                </Typography>
              </div>
              <div className="col-12 legendModalRow">
                <Typography variant="body1">
                  <FiberManualRecord className="cashCrop" />
                  <span className="pl-3">{"Cash Crop Growth Window"}</span>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CropLegendModal;
