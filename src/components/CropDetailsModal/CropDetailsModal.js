/*
  Handles the popup on hovering over one of the goal rankings in the crop selector
*/

import {
  Button, Modal, Box, Grid, Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Close, Print } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useSelector } from 'react-redux';
import '../../styles/cropDetailsModal.scss';
import InformationSheetContent from '../../pages/InformationSheetContent/InformationSheetContent';
import { callCoverCropApi } from '../../shared/constants';

const CropDetailsModal = ({ crop, setModalOpen, modalOpen }) => {
  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const consentRedux = useSelector((stateRedux) => stateRedux.userData.consent);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  // useState vars
  const [dataDone, setDataDone] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const regionQuery = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;
    const url = `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states/${stateIdRedux}/crops/${crop?.id}?${regionQuery}`;
    if (crop.id !== undefined) {
      callCoverCropApi(url).then((data) => {
        setModalData(data);
      })
        .then(() => {
          setDataDone(true);
        });
    }
  }, [crop]);

  useEffect(() => {
    if (consentRedux === true) {
      ReactGA.initialize('UA-181903489-1');
      ReactGA.pageview('information sheet');
    }
  }, [consentRedux]);

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

  const print = () => {
    if (consentRedux === true) {
      ReactGA.event({
        category: 'Information Sheet',
        action: 'Print',
        label: document.title,
      });
    }
    window.open(`https://selectorimages.blob.core.windows.net/selectorimages/pdf/${document.title}.pdf`, '_blank');
  }; // print

  console.log(crop);

  return dataDone === true && (
    <Modal // `disableBackdropClick` is removed by codemod.
      // You can find more details about this breaking change in
      // [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal)
      aria-labelledby="cover-crop-modal-title"
      aria-describedby="cover-crop-modal-description"
      sx={{
        // height: '100%',
        // display: 'block',
        overflow: 'scroll',
        marginTop: '2%',
      }}
      open={modalOpen}
      style={{ maxWidth: '80%', marginLeft: '10%' }}
      onClose={handleModalClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
      disableEscapeKeyDown={false}
    >
      {/* <Fade in={modalOpen}> */}
        {/* {state.modalData.length > 0 && ( */}
        {/* <div className="modalParentWrapper"> */}
      <Box
          // className="cropTableModal modalContainer"
        sx={{
          backgroundColor: 'white',
          border: '2px solid #000',
          // boxShadow: 5,
          padding: '0px',
        }}
        id={`cropDetailModal-${modalData.id}`}
      >
        <Grid container>
          <Grid container item xs={12} sx={{ backgroundColor: '#2D7B7B' }}>
            <Grid container item xs={11}>
              <Grid item>
                <Typography color="white">
                  PLANT HARDINESS ZONE
                  {' '}
                  {crop.Zone}
                  {' '}
                  DATASET
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<OpenInNewIcon />}
                  style={{
                    color: 'white',
                    textTransform: 'none',
                    marginLeft: '2em',
                    textDecoration: 'underline',
                  }}
              // className="dataDict"
                  onClick={() => {
                    window.open('/data-dictionary', '_blank');
                  }}
                >
                  Data Dictionary
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<Print />}
                  style={{
                    color: 'white',
                    textTransform: 'none',
                    marginLeft: '2em',
                    textDecoration: 'underline',
                  }}
              // className="dataDict"
                  onClick={print}
                >
                  Print
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Button style={{ color: 'white', float: 'right', paddingTop: '13px' }} onClick={handleModalClose}>
                <Close />
              </Button>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <InformationSheetContent crop={crop} modalData={modalData.data} from="modal" />
          </Grid>
        </Grid>
        {/* <div className="container-fluid">
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
                      <InformationSheetContent crop={crop} modalData={modalData.data} from="modal" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
      </Box>
        {/* </div> */}
        {/* )} */}
      {/* </Fade> */}
    </Modal>
  );
};

export default CropDetailsModal;
