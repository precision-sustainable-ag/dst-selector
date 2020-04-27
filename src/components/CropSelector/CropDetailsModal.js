import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/Store";
import { zoneIcon } from "../../shared/constants";
import {
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress
} from "@material-ui/core";
import {
  PhotoLibrary,
  PictureAsPdf,
  FormatListBulleted,
  Print,
  Info,
  Close,
  ExpandMore
} from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "0px"
    // padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const CropDetailsModalComponent = props => {
  let crop = props.crop;
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  // const [modalOpen, setModalOpen] = useState(true);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setModalData(crop);
  }, [crop]);

  const handleModalClose = () => {
    props.setModalOpen(!props.modalOpen);
    // dispatch({
    //   type: "TOGGLE_CROP_DETAIL_MODAL",
    //   data: { cropDetailModal: false }
    // });
    // setModalOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="ransition-modal-description"
      className={classes.modal}
      open={props.modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      disableBackdropClick={true}
    >
      <Fade in={props.modalOpen}>
        {modalData.fields ? (
          <div className={`cropTableModal modalContainer ${classes.paper}`}>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-12"
                  style={{
                    background: "#2D7B7B",
                    color: "white",
                    height: "auto",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px"
                  }}
                >
                  <div className="row">
                    <div className="col-2 offset-10 text-right">
                      {" "}
                      <Button
                        style={{ color: "white" }}
                        onClick={handleModalClose}
                      >
                        <Close />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col mt-2">
                      <div>{modalData.fields["Cover Crop Group"]}</div>
                      <div className="font-weight-bold">
                        {modalData.fields["Cover Crop Name"]}
                      </div>
                      <div>{modalData.fields["Scientific Name"]}</div>
                    </div>
                    <div
                      className="col"
                      style={{
                        textAlign: "right",
                        paddingRight: "0px",
                        paddingLeft: "0px"
                      }}
                    >
                      <img src="//placehold.it/100x100" />
                      <img src="//placehold.it/100x100" />
                      <img src="//placehold.it/100x100" />
                      <img src="//placehold.it/100x100" />
                      <img src="//placehold.it/100x100" />
                      <img src="//placehold.it/100x100" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-12"
                  style={{ background: "#2D7B7B", color: "white" }}
                >
                  <div className="row">
                    <div className="col-4">
                      <Button style={{ color: "white" }}>
                        {zoneIcon(20, 20)}
                        <span className="pl-2">
                          Plant Hardiness Zone {state.zone} Dataset
                        </span>
                      </Button>
                    </div>
                    <div className="col-2">
                      <Button style={{ color: "white" }}>
                        <PhotoLibrary />{" "}
                        <span className="pl-2">View Photos</span>
                      </Button>
                    </div>
                    <div className="col-4">
                      <Button style={{ color: "white" }}>Download :</Button>
                      <Button style={{ color: "white" }}>
                        <PictureAsPdf />
                        <span className="pl-2">PDF</span>
                      </Button>
                      <Button style={{ color: "white" }}>
                        <FormatListBulleted />
                        <span className="pl-2">SPREADSHEET</span>
                      </Button>
                    </div>
                    <div className="col-2 text-right">
                      <Button style={{ color: "white" }}>
                        <Print /> <span className="pl-2">PRINT</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <Typography variant="h6">Cover Crop Uses</Typography>
                    </div>
                    <div className="col-6 text-right">
                      <small>
                        (Source: NRCS Plant Guide{" "}
                        <Info style={{ fontSize: "10pt" }} /> )
                      </small>
                    </div>

                    <div className="col-12 mt-2">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis eu interdum elit, nec convallis ex. Sed in posuere
                        ipsum. Vivamus eget scelerisque urna, at maximus mauris.
                        Suspendisse potenti. Nullam eget vulputate nulla. Morbi
                        eget suscipit libero. Phasellus eleifend velit vitae leo
                        efficitur luctus. Donec euismod odio et urna elementum
                        elementum. Curabitur quam nisi, blandit eu libero at,
                        efficitur dignissim dui. Aenean viverra consectetur odio
                        ac sodales. Nunc elit sem, tincidunt et ligula ac,
                        volutpat venenatis ex. Sed feugiat suscipit lorem vitae
                        efficitur. Morbi malesuada elit a urna ornare faucibus.
                        Curabitur id varius enim. Praesent dui erat, faucibus
                        quis consequat quis, condimentum eget diam. Phasellus
                        efficitur sapien ac ex suscipit pretium. Quisque ut nisi
                        fringilla, scelerisque purus sit amet, fermentum justo.
                        Maecenas dignissim ornare lectus, eget congue elit
                        vulputate vel. Quisque pellentesque quam eget ante
                        commodo, a porta dolor interdum. Donec ut nisi ligula.
                        Aenean eget cursus lectus, vel mattis enim. Nunc rutrum
                        pulvinar imperdiet. In finibus nunc eu mattis semper.
                        Nunc pharetra dui velit, eget pellentesque nulla
                        molestie in. Ut gravida ac leo sit amet blandit. Duis
                        sapien ipsum, volutpat quis nisl quis, ornare laoreet
                        diam. Nunc sit amet eros vel ante rutrum ullamcorper a
                        scelerisque magna. Etiam semper orci eget lorem dictum,
                        in varius est laoreet. Curabitur enim velit, pharetra ut
                        ullamcorper in, volutpat nec lacus. Cras sed nunc
                        iaculis, dignissim enim id, elementum lectus. Fusce
                        auctor turpis
                      </p>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">Agronomic</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">
                        Environmental Tolerance
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">Soil Conditions</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">Growth</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">
                        Planting &amp; Termination
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">
                        Grazers &amp; Pollinators
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    className="modalSideBar"
                    defaultExpanded={false}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="modal-side-panel-content"
                    >
                      <Typography variant="body1">
                        Pests &amp; Disease
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div></div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Fade>
    </Modal>
  );
};

export default CropDetailsModalComponent;
