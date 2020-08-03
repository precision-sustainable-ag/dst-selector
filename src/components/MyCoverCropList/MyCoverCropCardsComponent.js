import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../store/Store";
import CropDetailsModalComponent from "../CropSelector/CropDetailsModal";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: 230,
  },
  media: {
    height: 140,
  },
});

const MyCoverCropCardsComponent = (props) => {
  const [state, dispatch] = useContext(Context);
  const data = props.data;
  const btnId = props.btnId;
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleModalOpen = (crop) => {
    // setModalOpen(true);
    // put data inside modal
    // console.log(crop);
    // setModalData(crop);
    // setModalOpen(true);
  };

  const removeCrop = () => {
    var removeIndex = state.selectedCrops
      .map(function (item) {
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
          snackMessage: `Removed`,
        },
      });

      // this.state.selectedCrops.splice(removeIndex, 1);
    }
  };
  return (
    <div className="p-2">
      <Card className={classes.card}>
        <CardMedia
          image={
            data["Image Data"]["Key Thumbnail"]
              ? `/images/Cover Crop Photos/${data["Image Data"]["Directory"]}/${data["Image Data"]["Key Thumbnail"]}`
              : "https://placehold.it/100x100?text=Placeholder"
          }
          className={classes.media}
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
          <div>
            <small className="text-muted">
              <a
                style={{
                  textDecoration: "underline",
                  color: "rgb(53, 153, 155)",
                }}
                onClick={() => {}}
              >
                View Crop Details
              </a>
            </small>
          </div>
        </CardContent>

        <CardActionArea
          style={{
            backgroundColor: "#e3f2f4",
            textAlign: "center",
            padding: "0.5em",
          }}
          onClick={removeCrop}
        >
          <Typography
            variant="body2"
            className="text-uppercase"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            REMOVE
          </Typography>
        </CardActionArea>
      </Card>
      <CropDetailsModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crop={modalData}
      />
    </div>
  );
};

export default MyCoverCropCardsComponent;
