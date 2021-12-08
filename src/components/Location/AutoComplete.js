/*
  handles autocomplete for the location component
  setBoundingBoxAndAddress sets the polygon bounding box OR lat long and address, then close the modal
  styled using makeStyles
  checkAddresses fetches autocomplete data from API
*/

// TODO: Autocomplete feature is not yet implemented
// WHY: https://operations.osmfoundation.org/policies/nominatim/ Doesn't allow the API usage for building auto-complete
// Lancaster, Pennsylvania as default for PASA

import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";

import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Link,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { Context } from "../../store/Store";
import { Search } from "@material-ui/icons";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AutoCompleteComponent = ({ from }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(state.address);
  const [suggestedAddress, setSuggestedAddress] = useState({});
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
  const [restartAccept, setRestartAccept] = useState(false);

  useEffect(() => {
    if (state.zip === 0) {
      setAddress(state.address);
    } else setAddress(state.zip);
  }, [state.address, state.addressSearchPreference, state.zip]);
  const setBoundingBoxAndAddress = (val) => {
    // set the polygon bounding box? OR lat long and address, then close the modal
    dispatch({
      type: "UPDATE_MARKER",
      data: {
        markers: [[parseFloat(val.lat), parseFloat(val.lon)]],
      },
    });
    dispatch({
      type: "CHANGE_ADDRESS",
      data: {
        address: val.display_name,
        addressVerified: true,
      },
    });

    handleClose();
    console.log(val);
  };

  const handleToggle = () => {
    // check if zip or address

    if (from === "greenbar") {
      // addressSet();
      setShowRestartPrompt(true);
    } else {
      addressSet();
    }
  };

  const addressSet = () => {
    if (state.addressSearchPreference === "zip") {
      if (isNaN(address)) {
        alert("Invalid ZIP Code");
      } else {
        checkAddresses(address, "zip").then((data) => {
          console.log(data[0]);
          // let dataFloat = data[0].boundingbox.map((val) => {
          //   return parseFloat(val);
          // });

          dispatch({
            type: "UPDATE_ZIP_CODE",
            data: {
              zip: parseInt(address),
            },
          });
          dispatch({
            type: "UPDATE_MARKER",
            data: {
              markers: [[parseFloat(data[0].lat), parseFloat(data[0].lon)]],
            },
          });
        });
      }
    } else {
      if (address.length > 3) {
        handleOpen();
        // setOpen(true);
        checkAddresses(address, "address").then((addressData) => {
          setSuggestedAddress(addressData);
          console.log(addressData);
        });
      }
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const checkAddresses = async (query, type) => {
    let url = `https://nominatim.openstreetmap.org/search?q=${query}&country=United%20States&format=json&countrycodes=us,ca&limit=10`;
    let response = await fetch(url);
    response = response.json();
    return response;
  };

  useEffect(() => {
    if (restartAccept) {
      addressSet();
    }
  }, [restartAccept]);

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropProps={{
          timeout: 500,
        }}
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Suggested Locations</h2>
            <div>
              <p variant="body2">
                Server suggested {suggestedAddress.length}{" "}
                {suggestedAddress.length > 1 ? "addresses" : "address"}
              </p>
              {suggestedAddress.length > 0 ? (
                <ul>
                  {suggestedAddress.map((val, index) => (
                    <li key={index}>
                      {" "}
                      <Link
                        component="button"
                        variant="body2"
                        color="secondary"
                        onClick={() => setBoundingBoxAndAddress(val)}
                      >
                        {val.display_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}

              <em>
                If you don't find your location here, try typing a bit more
              </em>
            </div>
          </div>
        </Fade>
      </Modal>
      <FormControl
        variant="filled"
        style={{ width: "100%" }}
        className={classes.formControl}
      >
        <TextField
          label="LOCATION"
          value={address}
          onChange={handleChange}
          fullWidth
          aria-haspopup={true}
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleToggle}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FormControl>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={showRestartPrompt}
      >
        <DialogContent dividers>
          <Typography variant="body1">
            Restarting will remove all cover crops added to your list. Are you
            sure you want to restart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setShowRestartPrompt(false);
              setRestartAccept(false);
            }}
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              setShowRestartPrompt(false);
              setRestartAccept(true);
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AutoCompleteComponent;
