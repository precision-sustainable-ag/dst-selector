import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../store/Store";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 230
  },
  media: {
    height: 140
  }
});

const MyCoverCropCardsComponent = props => {
  const [state, dispatch] = useContext(Context);
  const data = props.data;
  const btnId = props.btnId;
  const classes = useStyles();

  const removeCrop = () => {
    var removeIndex = state.selectedCrops
      .map(function(item) {
        return item.btnId;
      })
      .indexOf(`${btnId}`);

    if (removeIndex === -1) {
      // element not in array
      // not possible ?
    } else {
      // alert(removeIndex);
      let selectedCropsCopy = state.selectedCrops;

      selectedCropsCopy.splice(removeIndex, 1);
      // console.log(selectedCropsCopy);
      dispatch({
        type: "SELECTED_CROPS_MODIFIER",
        data: {
          selectedCrops: selectedCropsCopy,
          snackOpen: true,
          snackMessage: `Removed`
        }
      });

      // this.state.selectedCrops.splice(removeIndex, 1);
    }
  };
  return (
    //   {state.selectedCrops.length === 1 ? "<div>" : "<div className='pl-5'>"}
    <div className={props.itemNo > 0 ? "pl-5" : ""}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://placehold.it/230x140"
            title={data["Cover Crop Name"]}
          />
          <CardContent>
            <div
              className="font-weight-bold text-muted text-uppercase"
              style={{ fontSize: "10pt" }}
            >
              {data["Family Common Name"]}
            </div>
            <div className="font-weight-bold " style={{ fontSize: "16pt" }}>
              {data["Cover Crop Name"]}
            </div>
            <small className="font-italic text-muted">
              {data["Scientific Name"]}
            </small>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View Crop Details
          </Button>
          <Button size="small" color="primary" onClick={removeCrop}>
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MyCoverCropCardsComponent;
