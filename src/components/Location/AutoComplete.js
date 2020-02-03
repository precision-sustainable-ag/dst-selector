// TODO: Autocomplete feature is not yet implemented
// WHY: https://operations.osmfoundation.org/policies/nominatim/ Doesn't allow the API usage for building auto-complete
// Lancaster, Pennsylvania as default for PASA

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment
} from "react";

import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  makeStyles,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";
import { Context } from "../../store/Store";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const AutoCompleteComponent = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleToggle = () => {
    handleOpen();
    checkAddresses(address).then(data => {
      console.log(data);
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = event => {
    setAddress(event.target.value);
  };

  const checkAddresses = async query => {
    let url = `https://nominatim.openstreetmap.org/search?q=${query}&country=United%20States&format=json`;
    let response = await fetch(url);
    response = response.json();
    return response;
  };

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropProps={{
          timeout: 500
        }}
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Suggested Locations</h2>
            <div>
              <ul>
                <li>Address 1</li>
                <li>Address 2</li>
                <li>Address 3</li>
              </ul>
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
          aria-controls={open ? "menu-list-grow" : undefined}
          label="LOCATION"
          value={state.address !== "" ? state.address : address}
          onChange={handleChange}
          fullWidth
          aria-haspopup="true"
          variant="filled"
          InputProps={
            address.length > 5
              ? {
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleToggle}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              : ""
          }
        ></TextField>
      </FormControl>
    </Fragment>
  );
};

export default AutoCompleteComponent;
