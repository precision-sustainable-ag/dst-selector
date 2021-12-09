/*
  This file contains the CropSidebarFilters component
  The CropSidebarFilters is the sidebar which contains functions used to filter the crops
  RenderSidebarFilterElements renders the sidebar 
  Styles are created using makeStyles
*/

import React, { Fragment, useEffect, useContext } from "react";
import {
  FormGroup,
  FormControlLabel,
  Typography,
  makeStyles,
  Checkbox,
  Grid,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Slider,
  Radio,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Context } from "../../store/Store";

const CropSidebarFilters = (props) => {
  const formClass = props.classes;

  const [state, dispatch] = useContext(Context);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCheckboxItems, setSeletedCheckboxItems] = React.useState([]);
  const [modalData, setModalData] = React.useState({
    title: "",
    text: "",
    checkboxesValues: [],
    type: "",
  });

  // useEffect(() => {
  //   // if (selectedCheckboxItems.length > 0) {
  //   // alert(selectedCheckboxItems);
  //   // }

  //   // console.log("selectedCheckboxItems: ", selectedCheckboxItems);
  //   props.filterByCheckboxValues(state.selectedCheckboxes);
  //   // console.log("huh");
  // }, [state.selectedCheckboxes]);

  let sidebarObj = props.sidebarObj;
  let keysArray = props.keysArray;
  let sidebarFiltersObj = props.sidebarFiltersObj;
  let index1 = props.index;
  let setSidebarFiltersObj = props.setSidebarFiltersObj;
  let setKeysArray = props.setKeysArray;
  let setKeysArrChanges = props.setKeysArrChanges;
  let keysArrChanged = props.keysArrChanged;

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleDataVariables = (type, data) => {
    console.log(data);
    if (type === "multiCheckboxPopup") {
      setModalData({
        title: data.Variable,
        type: "multi",
        checkboxes: true,
        checkboxesValues: data.valuesArray || [],
      });
    } else if (type === "singleCheckboxPopup") {
      setModalData({
        title: data.Variable,
        type: "single",
        checkboxes: true,
        checkboxesValues: data.valuesArray || [],
      });
    } else {
    }

    setOpenModal(true);
  };
  const RenderSidebarFilterElements = (prop) => {
    let data = prop.data;
    // console.log("data:: ", data);

    if (data.Type === "string") {
      // select one or many
      if (data["Units/Details"] === "select one") {
        //   disabled others if one is selected
        let values = data.Values.slice(1, -1).split(",");
        let tempArr = [];
        values.forEach((v, i) => {
          //   console.log(`Value: ${v} and v.indexof(" ") = ${v.indexOf(" ")}`);

          if (v.indexOf(" ") === 0) tempArr.push(v.substr(1));
          else tempArr.push(v);
        });
        data.valuesArray = tempArr;
        data.valuesArray = data.valuesArray.map((val) => {
          return `${val}~${data.Variable}`;
        });
        return (
          <Grid item sm={12}>
            <Button
              size="small"
              onClick={() => handleDataVariables("singleCheckboxPopup", data)}
            >
              {data.Variable}
            </Button>
          </Grid>
        );
      } else if (data["Units/Details"] === "select many") {
        let values = data.Values.slice(1, -1).split(",");
        let tempArr = [];
        values.forEach((v, i) => {
          //   console.log(`Value: ${v} and v.indexof(" ") = ${v.indexOf(" ")}`);

          if (v.indexOf(" ") === 0) tempArr.push(v.substr(1));
          else tempArr.push(v);
        });
        data.valuesArray = tempArr;
        data.valuesArray = data.valuesArray.map((val) => {
          return `${val}~${data.Variable}`;
        });
        return (
          <Grid item sm={12}>
            <Button
              size="small"
              onClick={() => handleDataVariables("multiCheckboxPopup", data)}
            >
              {data.Variable}
            </Button>
          </Grid>
        );
      } else {
        //   unhandled case -- do nothing
        return (
          <Grid item sm={12}>
            <Typography variant="body2">{data.Variable}</Typography>
          </Grid>
        );
      }
    } else if (data.Type === "integer") {
      // star rating
      return (
        <Grid item sm={12}>
          <Typography variant="body2">{data.Variable}</Typography>
          <Rating
            value={state.selectedStars[data.Variable] || 0}
            name={data.Variable}
            size="large"
            onChange={(e, val) => {
              //   console.log(val);
              //   console.log(state.selectedStars);
              //   let data = data.Variable;
              //   check if star for this exists
              //   console.log(data.Variable, val);
              //   if (data.Variable in state.selectedStars) {
              // get its value and update the star
              dispatch({
                type: "UPDATE_SELECTED_STARS",
                data: {
                  selectedStars: {
                    ...state.selectedStars,
                    [data.Variable]: val,
                  },
                },
              });
              //   } else {
              // add the key and value

              //     dispatch({
              //       type: "UPDATE_SELECTED_STARS",
              //       data: {
              //         selectedStars: {
              //           ...state.selectedStars,
              //           [data.Variable]: val,
              //         },
              //       },
              //     });
              //   }
            }}
          />
          {/* <Typography variant=""></Typography> */}
        </Grid>
      );
    } else if (data.Type === "boolean") {
      // console.log("bool data", data);
      let values = data.Values.split(",");
      let tempArr = [];
      values.forEach((v, i) => {
        //   console.log(`Value: ${v} and v.indexof(" ") = ${v.indexOf(" ")}`);

        if (v.indexOf(" ") === 0) tempArr.push(v.substr(1));
        else tempArr.push(v);
      });
      data.valuesArray = tempArr;
      let choice = true;
      data.valuesArray = data.valuesArray.map((val) => {
        if (val === "Yes") {
          choice = true;
          return `${true}~${data.Variable}`;
        } else if (val === "No") {
          choice = false;
          return `${false}~${data.Variable}`;
        } else return `${val}~${data.Variable}`;
      });
      // console.log(data.valuesArray);
      return (
        <Grid item sm={12}>
          <FormControlLabel
            value={`${data.Variable}`}
            control={
              <Checkbox
                checked={
                  state.selectedCheckboxes.includes(`${data.Variable}`)
                    ? true
                    : false
                }
                onChange={(e) => {
                  console.log(e.target.value);
                  if (state.selectedCheckboxes.includes(e.target.value)) {
                    // value exists, remove it
                    let newSelectedItems = state.selectedCheckboxes.filter(
                      (el) => {
                        return el !== e.target.value;
                      }
                    );
                    //   setSeletedCheckboxItems(newSelectedItems);
                    dispatch({
                      type: "UPDATE_SELCTED_CHECKBOXES",
                      data: {
                        selectedCheckboxes: newSelectedItems,
                      },
                    });
                  } else {
                    let joined = state.selectedCheckboxes.concat(
                      e.target.value
                    );
                    //   setSeletedCheckboxItems(joined);
                    dispatch({
                      type: "UPDATE_SELCTED_CHECKBOXES",
                      data: {
                        selectedCheckboxes: joined,
                      },
                    });
                  }
                }}
                color="secondary"
              />
            }
            // checked={
            //state.selectedCheckboxes.includes(data.Variable) ? true : false
            // }
            label={<Typography variant="body2"> {data.Variable}</Typography>}
            labelPlacement={"end"}
          />
          {/* <FormControlLabel
                      value={val}
                      control={
                        <Checkbox
                          
                          checked={
                            state.selectedCheckboxes.includes(val)
                              ? true
                              : false
                          }
                          color="secondary"
                          onChange={(e) => {
                            console.log(e.target.value);
                            if (
                              state.selectedCheckboxes.includes(e.target.value)
                            ) {
                              // value exists, remove it
                              let newSelectedItems = state.selectedCheckboxes.filter(
                                (el) => {
                                  return el !== e.target.value;
                                }
                              );
                              //   setSeletedCheckboxItems(newSelectedItems);
                              dispatch({
                                type: "UPDATE_SELCTED_CHECKBOXES",
                                data: {
                                  selectedCheckboxes: newSelectedItems,
                                },
                              });
                            } else {
                              let joined = state.selectedCheckboxes.concat(
                                e.target.value
                              );
                              //   setSeletedCheckboxItems(joined);
                              dispatch({
                                type: "UPDATE_SELCTED_CHECKBOXES",
                                data: {
                                  selectedCheckboxes: joined,
                                },
                              });
                            }
                          }}
                        />
                      }
                      label={getCheckBoxVal(val)}
                      labelPlacement="end"
                      name="multiCheckboxes"
                    /> */}
        </Grid>
      );
    } else if (data.Type === "float") {
      return (
        <Grid item sm={12}>
          <Typography variant="body2">{data.Variable} float</Typography>
        </Grid>
      );
    } else {
      // most probably unhandled case e.g. "weeds"
      return (
        <Grid item sm={12}>
          <Typography variant="body2">{data.Variable}</Typography>
        </Grid>
      );
    }
  };

  return (
    <div>
      <FormGroup>
        <Grid container spacing={2}>
          {sidebarObj.data
            ? sidebarObj.data.map((data, key) => (
                <Fragment key={key}>
                  <RenderSidebarFilterElements data={data} />
                </Fragment>
              ))
            : ""}
        </Grid>
      </FormGroup>

      {/* Sidebar Filter Modal == Checkbox */}
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title">{modalData.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>{modalData.text}</DialogContentText> */}
          <Grid container spacing={4}>
            {modalData.checkboxes
              ? modalData.checkboxesValues.map((val, index) => (
                  <Grid item key={index} md={6}>
                    <FormControlLabel
                      value={val}
                      control={
                        <Checkbox
                          disabled={
                            state.selectedCheckboxes.includes(val)
                              ? false
                              : modalData.type === "single"
                              ? true
                              : false
                          }
                          checked={
                            state.selectedCheckboxes.includes(val)
                              ? true
                              : false
                          }
                          color="secondary"
                          onChange={(e) => {
                            console.log(e.target.value);
                            if (
                              state.selectedCheckboxes.includes(e.target.value)
                            ) {
                              // value exists, remove it
                              let newSelectedItems = state.selectedCheckboxes.filter(
                                (el) => {
                                  return el !== e.target.value;
                                }
                              );
                              //   setSeletedCheckboxItems(newSelectedItems);
                              dispatch({
                                type: "UPDATE_SELCTED_CHECKBOXES",
                                data: {
                                  selectedCheckboxes: newSelectedItems,
                                },
                              });
                            } else {
                              let joined = state.selectedCheckboxes.concat(
                                e.target.value
                              );
                              //   setSeletedCheckboxItems(joined);
                              dispatch({
                                type: "UPDATE_SELCTED_CHECKBOXES",
                                data: {
                                  selectedCheckboxes: joined,
                                },
                              });
                            }
                          }}
                        />
                      }
                      label={getCheckBoxVal(val)}
                      labelPlacement="end"
                      name="multiCheckboxes"
                    />
                  </Grid>
                ))
              : modalData.checkboxesValues.map((val, index) => (
                  <Grid item key={index} md={6}>
                    <FormControlLabel
                      value="end"
                      control={<Radio color="primary" />}
                      label="End"
                    />
                  </Grid>
                ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CropSidebarFilters;

const getCheckBoxVal = (val) => {
  // let str = val + '';
  val = val.split("~");
  return val[0];
};

// cehckbox

// {
//     <FormControlLabel
//     key={key}
//     classes={{ root: formClass }}
//     //   control={}
//     label={
//       <Typography variant="body2">{data.Variable}</Typography>
//     }
//   />

//    <Checkbox

//                       checked={keysArray.includes(data.Variable) ? true : false}
//                       onChange={(e) => {
//                         console.log(data.Variable);
//                         const newState = sidebarFiltersObj.map(
//                           (obj, index3) => {
//                             if (index3 === index1)
//                               return {
//                                 ...obj,
//                                 active: !obj.active,
//                               };
//                             else return { ...obj };
//                           }
//                         );
//                         setSidebarFiltersObj(newState);
//                         let keysArrayCopy = keysArray;
//                         if (keysArray.includes(e.target.value)) {
//                           // value exists, remove it
//                           keysArrayCopy = keysArray.filter(
//                             (e) => e !== data.Variable
//                           );
//                           setKeysArray(keysArrayCopy);
//                         } else {
//                           // new value, add it
//                           keysArrayCopy.push(e.target.value);
//                           setKeysArray(keysArrayCopy);
//                         }
//                         setKeysArrChanges(!keysArrChanged);
//                       }}
//                       value={data.Variable}
//                     />
// }
