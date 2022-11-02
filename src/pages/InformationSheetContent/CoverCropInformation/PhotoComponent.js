/*
  Contains photo component used to view crop photo
  styled using ../../styles/photoComponent.scss
*/

import { Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { ucFirst } from '../../../shared/constants';
import '../../../styles/photoComponent.scss';

const PhotoComponent = ({
  imageData = {
    Directory: '',
    Notes: null,
    'Key Thumbnail': '',
    'Cover Crop': '',
  },
  allThumbs,
}) => {
  const baseName = (path = '') => {
    let separator = '/';
    const windowsSeparator = '\\';
    if (path.includes(windowsSeparator)) {
      separator = windowsSeparator;
    }
    return path.slice(path.lastIndexOf(separator) + 1);
  };

  const getPhotoCredits = (url = '', cropName = '') => {
    // get base file name
    const fileName = baseName(url);

    const fileNameArray = fileName.split('_');

    // get last value of array
    const {
      length,
      [length - 1]: last,
      [length - 2]: secondLast,
      [length - 3]: thirdLast,
    } = fileNameArray;
    const year = parseInt(last, 10) ? `[${parseInt(last, 10)}]` : '';
    if (thirdLast?.toLowerCase().includes('mirsky')) {
      const mirskyLabString = ucFirst(`${thirdLast} ${secondLast}`);
      return `${cropName} - ${mirskyLabString} [${year}]`;
    }
    return `${cropName} ${secondLast ? `- ${secondLast}` : ''} ${year}`;
  };

  return imageData !== null && allThumbs.length !== 0 ? (
    <Suspense fallback={<div className="col">Loading..</div>}>
      {allThumbs.map((url, index) => {
        let strippedUrl = url;
        if (url.startsWith('images/Cover Crop Photos')) {
          const strippedUrlArray = url.split('images/Cover Crop Photos');
          strippedUrl = `/images/Cover Crop Photos/200x125${strippedUrlArray[1]}`;
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
