/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Backdrop, Button, Fade, Modal, Box,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Close, Print } from '@mui/icons-material';
import React, { useEffect, useContext } from 'react';
import ReactGA from 'react-ga';
import '../../styles/cropDetailsModal.scss';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import { Context } from '../../store/Store';

const CropDetailsModal = ({ crop, setModalOpen, modalOpen }) => {
  const { state } = useContext(Context);
  const modalData = crop;

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
    window.open(`https://selectorimages.blob.core.windows.net/selectorimages/pdf/${document.title}.pdf`, '_blank');
  }; // print

  return (
    <Modal // `disableBackdropClick` is removed by codemod.
      // You can find more details about this breaking change in
      // [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal)
      aria-labelledby="cover-crop-modal-title"
      aria-describedby="cover-crop-modal-description"
      sx={{
        height: '100%',
        display: 'block',
      }}
      open={modalOpen}
      style={{ maxWidth: '80%', marginLeft: '10%' }}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableEscapeKeyDown={false}
    >
      <Fade in={modalOpen}>
        {modalData ? (
          <div className="modalParentWrapper">
            <Box
              className="cropTableModal modalContainer"
              sx={{
                backgroundColor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 5,
                padding: '0px',
              }}
              id={`cropDetailModal-${modalData.id}`}
            >
              <div className="container-fluid">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className="row zone" style={{ paddingBottom: '1em' }}>
                          <div
                            className="col-12"
                            style={{
                              top: '-1px',
                              background: '#2D7B7B',
                              color: 'white',
                              borderTopLeftRadius: '5px',
                              borderTopRightRadius: '5px',
                            }}
                          >
                            <div className="row">
                              <div className="col-12">
                                <strong className="pl-2">
                                  PLANT HARDINESS ZONE
                                  {' '}
                                  {crop.Zone}
                                  {' '}
                                  DATASET
                                  <span className="noprint">
                                    <Button
                                      startIcon={<OpenInNewIcon />}
                                      style={{
                                        color: 'white',
                                        textTransform: 'none',
                                        marginLeft: '2em',
                                        textDecoration: 'underline',
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
                                    <Button
                                      startIcon={<Print />}
                                      style={{
                                        color: 'white',
                                        textTransform: 'none',
                                        marginLeft: '2em',
                                        textDecoration: 'underline',
                                      }}
                                      className="dataDict"
                                      onClick={print}
                                    >
                                      Print
                                    </Button>
                                    <Button style={{ color: 'white', float: 'right', paddingTop: '13px' }} onClick={handleModalClose}>
                                      <Close />
                                    </Button>
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
                          <InformationSheetContent crop={crop.fields ? crop.fields : modalData} from="modal" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Box>
          </div>
        ) : (
          <div />
        )}
      </Fade>
    </Modal>
  );
};

export default CropDetailsModal;
