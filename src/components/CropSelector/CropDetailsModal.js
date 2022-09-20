/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
  Styles are created using makeStyles
*/

import { Backdrop, Button, Fade, Modal, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Close, Print } from '@mui/icons-material';
import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga';
import { CropImage, zoneIcon } from '../../shared/constants';
import '../../styles/cropDetailsModal.scss';
import InformationSheetContent from '../InformationSheet/InformationSheetContent/InformationSheetContent';
import { Context } from '../../store/Store';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '100%',
    display: 'block',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '0px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  AccordionSummaryIcon: {
    '& div.MuiAccordionSummary-expandIcon.Mui-expanded': {
      transform: 'rotate(45deg)',
    },
  },
}));

const CropDetailsModalComponent = ({ crop, setModalOpen, modalOpen }) => {
  const { state } = useContext(Context);
  const classes = useStyles();
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setModalData(crop);
  }, [crop]);

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');
      ReactGA.pageview('information sheet');
    }
  }, [state.consent]);

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

  const print = () => {
    if (state.consent === true) {
      ReactGA.event({
        category: 'Information Sheet',
        action: 'Print',
        label: document.title,
      });
    }

    document.querySelector('#PDF').contentWindow.print();
  }; // print

  return (
    <Modal // `disableBackdropClick` is removed by codemod.
      // You can find more details about this breaking change in
      // [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal)
      aria-labelledby="cover-crop-modal-title"
      aria-describedby="cover-crop-modal-description"
      className={classes.modal}
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableEscapeKeyDown={false}
    >
      <Fade in={modalOpen}>
        {modalData.fields ? (
          <div className="modalParentWrapper">
            <div
              className={`cropTableModal modalContainer ${classes.paper}`}
              id={`cropDetailModal-${modalData.fields.id}`}
            >
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-12"
                    style={{
                      background: '#2D7B7B',
                      color: 'white',
                      height: 'auto',
                      borderTopLeftRadius: '5px',
                      borderTopRightRadius: '5px',
                    }}
                  >
                    <div className="row doclose">
                      <div className="col-2 offset-10 text-right">
                        {' '}
                        <Button style={{ color: 'white' }} onClick={handleModalClose}>
                          <Close />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className="row" id="coverCropModalPrimary">
                          <div className="col-12">
                            <div className="row">
                              <div className="col mt-2">
                                <div>{modalData.fields['Cover Crop Group']}</div>
                                <div className="font-weight-bold" id="cover-crop-modal-title">
                                  {modalData.fields['Cover Crop Name']}
                                </div>
                                <div>{modalData.fields['Scientific Name']}</div>
                              </div>
                              <div
                                className="col"
                                style={{
                                  textAlign: 'right',
                                  paddingRight: '0px',
                                  paddingLeft: '0px',
                                }}
                              >
                                {crop.fields['Image Data'] ? (
                                  <CropImage
                                    present
                                    src={
                                      crop.fields['Image Data']['Key Thumbnail']
                                        ? // eslint-disable-next-line max-len
                                          `/images/Cover Crop Photos/100x100/${crop.fields['Image Data'].Directory}/${crop.fields['Image Data']['Key Thumbnail']}`
                                        : 'https://placehold.it/100x100'
                                    }
                                    alt={crop.fields['Cover Crop Name']}
                                  />
                                ) : (
                                  <CropImage present={false} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row zone" style={{ paddingBottom: '1em' }}>
                          <div className="col-12" style={{ background: '#2D7B7B', color: 'white' }}>
                            <div className="row">
                              <div className="col-12">
                                {zoneIcon(20, 20)}
                                <strong className="pl-2">
                                  PLANT HARDINESS ZONE {crop.fields.Zone} DATASET
                                  <span className="noprint">
                                    <Button
                                      style={{
                                        color: 'white',
                                        textTransform: 'none',
                                        marginLeft: '2em',
                                      }}
                                      className="dataDict"
                                      onClick={() => {
                                        window.open('/data-dictionary', '_blank');
                                      }}
                                    >
                                      Data Dictionary
                                    </Button>
                                  </span>
                                  <span className="noprint">
                                    <IconButton
                                      title="Print"
                                      style={{ color: 'white', marginLeft: '1em' }}
                                      onClick={print}
                                      size="large"
                                    >
                                      <Print />
                                    </IconButton>
                                  </span>
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div id="cover-crop-modal-description">
                          <InformationSheetContent crop={crop.fields} from="modal" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </Fade>
    </Modal>
  );
};

export default CropDetailsModalComponent;
