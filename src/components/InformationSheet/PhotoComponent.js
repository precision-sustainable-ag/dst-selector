import React, { useState, useEffect, Fragment, Suspense } from "react";
import Axios from "axios";
import { CropImage } from "../../shared/constants";
// import Carousel, { Modal, ModalGateway } from "react-images";
import { LuminousGallery } from "luminous-lightbox";
import "../../../node_modules/luminous-lightbox/dist/luminous-basic.css";
const PhotoComponent = ({
  imageData = {
    Directory: "",
    Notes: null,
    "Key Thumbnail": "",
    "Cover Crop": "",
  },
}) => {
  const imagesApiUrl = imageData
    ? `//covercrop.tools/files.php?dir=${imageData.Directory}`
    : null;
  const [imageList, setImageList] = useState([]);

  const getImages = async () => {
    return await Axios({
      url: imagesApiUrl,
      method: "get",
    });
  };

  useEffect(() => {
    let imagePromise = getImages();
    imagePromise
      .then((response) => {
        if (response.data.result === "success") {
          if (response.data.data.length !== 0) {
            // response.data.data.forEach((url) => {});
          } else {
            setImageList([]);
          }
          setImageList(response.data.data);
        }
      })
      .then(() => {
        var galleryOpts = {
          // Whether pressing the arrow keys should move to the next/previous slide.
          arrowNavigation: true,
        };

        var luminousOpts = {
          // These options have the same defaults and potential values as the Luminous class.
        };
        new LuminousGallery(
          document.querySelectorAll(".Photo"),
          galleryOpts,
          luminousOpts
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return imageData !== null && imageList.length !== 0 ? (
    <Suspense fallback={<div className="col">Loading..</div>}>
      {imageList.map((url, index) => (
        <div className="p-2" key={`Photo${index}`}>
          <a className="Photo" href={`/${url}`}>
            <img
              alt={`Photo ${index}`}
              src={`/${url}`}
              height="250"
              width="250"
            />
          </a>
        </div>
      ))}
    </Suspense>
  ) : (
    ""
  );
};

export default PhotoComponent;
