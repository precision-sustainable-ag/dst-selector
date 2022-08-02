/*
  Contains photo component used to view crop photo
  styled using ../../styles/photoComponent.scss
*/

import { Typography } from '@mui/material';
import Axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import '../../../node_modules/luminous-lightbox/dist/luminous-basic.css';
import { ucFirst } from '../../shared/constants';
import '../../styles/photoComponent.scss';

const PhotoComponent = ({
  imageData = {
    Directory: '',
    Notes: null,
    'Key Thumbnail': '',
    'Cover Crop': '',
  },
}) => {
  const imagesApiUrl = imageData ? `//covercrop.tools/files.php?dir=${imageData.Directory}` : null;
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      return await Axios({
        url: imagesApiUrl,
        method: 'get',
      });
    };

    let imagePromise = getImages();
    imagePromise
      .then((response) => {
        if (response.data.result === 'success') {
          if (response.data.data.length === 0) {
            setImageList([]);
          }
          setImageList(response.data.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [imagesApiUrl]);

  return imageData !== null && imageList.length !== 0 ? (
    <Suspense fallback={<div className="col">Loading..</div>}>
      {imageList.map((url, index) => {
        let strippedUrl = '';
        if (url.startsWith('images/Cover Crop Photos')) {
          let strippedUrlArray = url.split('images/Cover Crop Photos');
          strippedUrl = '/images/Cover Crop Photos/200x125' + strippedUrlArray[1];
        }
        return (
          <div
            className="p-2 d-flex flex-column align-items-center justify-content-center"
            key={`Photo${index}`}
          >
            <a
              className="Photo rounded"
              href={`/${url}`}
              data-caption={getPhotoCredits(url, imageData['Cover Crop'])}
            >
              <img
                className="img rounded"
                alt={`${index}`}
                src={strippedUrl}
                style={{
                  height: '125px',
                  maxWidth: '200px',
                }}
              />
            </a>

            <div>
              <Typography variant="caption">
                {getPhotoCredits(url, imageData['Cover Crop'])}
              </Typography>
            </div>
          </div>
        );
      })}
    </Suspense>
  ) : (
    'Loading..'
  );
};

export default PhotoComponent;

const getPhotoCredits = (url = '', cropName = '') => {
  // get base file name
  let fileName = baseName(url);

  let fileNameArray = fileName.split('_');

  // get last value of array
  const {
    length,
    [length - 1]: last,
    [length - 2]: secondLast,
    [length - 3]: thirdLast,
  } = fileNameArray;
  const year = parseInt(last);
  if (thirdLast.toLowerCase().includes('mirsky')) {
    let mirskyLabString = ucFirst(thirdLast + ' ' + secondLast);
    return `${cropName} - ${mirskyLabString} [${year}]`;
  } else {
    return `${cropName} - ${secondLast} [${year}]`;
  }
};

const baseName = (path = '') => {
  let separator = '/';
  const windowsSeparator = '\\';
  if (path.includes(windowsSeparator)) {
    separator = windowsSeparator;
  }
  return path.slice(path.lastIndexOf(separator) + 1);
};
