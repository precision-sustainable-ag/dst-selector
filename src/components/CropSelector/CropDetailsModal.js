/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
  Styles are created using makeStyles
*/

import { Backdrop, Button, Fade, makeStyles, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { CropImage, zoneIcon } from "../../shared/constants";
import "../../styles/cropDetailsModal.scss";
import InformationSheetContent from "../InformationSheet/InformationSheetContent";

const useStyles = makeStyles((theme) => ({
  modal: {
    height: "100%",
    display: "block",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "0px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  AccordionSummaryIcon: {
    "& div.MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(45deg)",
    },
  },
}));

const CropDetailsModalComponent = (props) => {
  let crop = props.crop;
  const classes = useStyles();
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setModalData(crop);
  }, [crop]);

  const handleModalClose = () => {
    props.setModalOpen(!props.modalOpen);
  };

  return (
    <Modal
      aria-labelledby="coover-crop-modal-title"
      aria-describedby="cover-crop-modal-description"
      className={classes.modal}
      open={props.modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <Fade in={props.modalOpen}>
        {modalData.fields ? (
          <div className="modalParentWrapper">
            <div
              className={`cropTableModal modalContainer ${classes.paper}`}
              id={`cropDetailModal-${modalData.fields["id"]}`}
            >
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-12"
                    style={{
                      background: "#2D7B7B",
                      color: "white",
                      height: "auto",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
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
                <div className="row" id="coverCropModalPrimary">
                  <div className="col-12">
                    <div className="row">
                      <div className="col mt-2">
                        <div>{modalData.fields["Cover Crop Group"]}</div>
                        <div
                          className="font-weight-bold"
                          id="cover-crop-modal-title"
                        >
                          {modalData.fields["Cover Crop Name"]}
                        </div>
                        <div>{modalData.fields["Scientific Name"]}</div>
                      </div>
                      <div
                        className="col"
                        style={{
                          textAlign: "right",
                          paddingRight: "0px",
                          paddingLeft: "0px",
                        }}
                      >
                        {crop.fields["Image Data"] ? (
                          <CropImage
                            present={true}
                            src={
                              crop.fields["Image Data"]["Key Thumbnail"]
                                ? `/images/Cover Crop Photos/100x100/${crop.fields["Image Data"]["Directory"]}/${crop.fields["Image Data"]["Key Thumbnail"]}`
                                : "https://placehold.it/100x100"
                            }
                            alt={crop.fields["Cover Crop Name"]}
                          />
                        ) : (
                          <CropImage present={false} />
                        )}
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
                        <Button
                          style={{ color: "white" }}
                          className="dataDict"
                          onClick={() => {
                            window.open("/data-dictionary", "_blank");
                          }}
                        >
                          {zoneIcon(20, 20)}
                          <span className="pl-2">
                            Plant Hardiness Zone {crop.fields.Zone} Dataset
                          </span>
                        </Button>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-4"></div>
                      <div className="col-2 text-right"></div>
                    </div>
                  </div>
                </div>
                <div className="" id="cover-crop-modal-description">
                  <InformationSheetContent crop={crop.fields} from="modal" />
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
