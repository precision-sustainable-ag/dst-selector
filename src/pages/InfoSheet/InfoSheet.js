/* eslint-disable react/no-unescaped-entities */
/*
  This file contains the About component, helper functions, and styles
  The about page is a static pages that has information about the project
  RenderContent contains all the text listed in the about section
*/
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { callCoverCropApi, getRating } from '../../shared/constants';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function encodeParams(params) {
  const encode = (key, val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  return Object.keys(params)
    .map((key) => encode(key, params[key]))
    .join('&');
}

function buildApiRequestUrl(uri, params) {
  const baseUrl = 'http://localhost:3001';

  if (!params) return `${baseUrl}${uri}`;

  const query = encodeParams(params);

  return `${baseUrl}${uri}?${query}`;
}

async function getStateDataFromApi(state) {
  const uri = `/v2/regions/${state}`;
  const url = buildApiRequestUrl(uri);
  return callCoverCropApi(url); // Assuming this returns a promise, else adjust accordingly
}

async function getRegionsDataFromApi(regions) {
  const uri = `/v2/regions/${regions}`;
  const url = buildApiRequestUrl(uri);
  return callCoverCropApi(url);
}

async function getCropDataFromApi(state, crop, regions) {
  const uri = `/v1/states/${state}/crops/${crop}`;
  const url = buildApiRequestUrl(uri, { regions });
  return callCoverCropApi(url);
}

const styles = {
  container: {
  },
  banner: {
    width: '100vw',
    padding: '16px',
    paddingLeft: '16px',
    backgroundColor: '#2D7B7B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '8px',
    fontSize: '24px',
    color: 'white',
    fontWeight: 'bold',
  },
  overview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '28px',
    marginTop: '28px',
    // backgroundColor: 'green',
    left: {
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      // backgroundColor: 'yellow',
      width: '50%',
      minWidth: '300px',
      group: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: '24px',
      },
      crop: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '28px',
        marginBottom: '16px',
      },
      description: {
        label: {
          color: 'black',
          fontSize: '24px',
          marginBottom: '18px',
        },
        content: {
          color: 'black',
          marginBottom: '18px',
        },
      },
    },
    right: {
      display: 'flex',
      justifyContent: 'center',
      padding: '24px',
      // backgroundColor: 'pink',
      width: '50%',
      minWidth: '300px',
      img: {
        borderRadius: '12px',
        maxwidth: '300px',
      },
    },
  },
  attributes: {
    container: {
      paddingLeft: '28px',
      paddingRight: '28px',
    },
    label: {
      color: 'black',
      // fontWeight: 'bold',
      fontSize: '24px',
      // marginBottom: '12px',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '24px',
      items: {

      },
    },
  },
  references: {
    container: {
      paddingLeft: '28px',
      paddingRight: '28px',
    },
    label: {
      color: 'black',
      // fontWeight: 'bold',
      fontSize: '24px',
      // marginBottom: '12px',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '24px',
      items: {

      },
    },
  },
};

const InfoSheet = () => {
  const [crop, setCrop] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [regionsData, setRegionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCrop, setLoadingCrop] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingRegion, setLoadingRegion] = useState(false);

  const query = useQuery();
  const CROP_ID = query.get('crop');
  const REGIONS_ID = query.get('regions');
  const STATE_ID = query.get('state');

  useEffect(() => {
    if (!stateData && !loadingState) {
      setLoadingState(true);
      getStateDataFromApi(STATE_ID).then((res) => {
        console.log('> State', res.data);
        setStateData(res.data);
        setLoadingState(false);
      });
    }

    if (!regionsData && !loadingRegion) {
      setLoadingRegion(true);
      getRegionsDataFromApi(REGIONS_ID).then((res) => {
        console.log('> region', res.data);
        setRegionsData(res.data);
        setLoadingRegion(false);
      });
    }

    if (!crop && !loadingCrop) {
      setLoadingCrop(true);
      getCropDataFromApi(STATE_ID, CROP_ID, REGIONS_ID).then((res) => {
        console.log('> crop', res.data);
        setCrop(res.data);
        setLoadingCrop(false);
      });
    }

    if (loading && crop && stateData && regionsData) {
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container} id="pdf-content-container">
      {/* head bar */}
      <div style={styles.banner}>
        <div>{stateData.label}</div>
        <div> - </div>
        <div>{regionsData.label}</div>
      </div>
      {/* end head bar */}

      {/* crop overview section */}
      <div style={styles.overview}>
        <div style={styles.overview.left}>
          <div style={styles.overview.left.group}>{crop?.group?.label}</div>
          <div style={styles.overview.left.crop}>{crop?.label}</div>
          {crop?.description
          && (
          <div>
            <div style={styles.overview.left.description.label}>COVER CROP DESCRIPTION</div>
            <div style={styles.overview.left.description.content}>{crop.description}</div>
          </div>
          )}
          {/* <div>{crop?.description}</div> */}
        </div>
        <div style={styles.overview.right}>
          <img style={styles.overview.right.img} src={crop.thumbnail} alt="crop" />
        </div>
      </div>
      {/* end crop overview section */}

      {/* crop attributes */}
      {crop.data.map((item, index) => (
        <div key={index} style={styles.attributes.container} id={`category-container-${index}`}>
          <div style={styles.attributes.label}>{item.label.toUpperCase()}</div>
          <div style={styles.attributes.content}>
            {item.attributes.map((attribute, aIndex) => (
              <div key={aIndex} className="col-6 mb-2 ml-1 row">
                <span className="col">
                  <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                    {attribute.label}
                  </Typography>
                </span>
                { attribute.values[0]?.dataType !== 'number' ? (
                  <Typography variant="body1">
                    <span>{attribute.values[0]?.value}</span>
                  </Typography>
                ) : (
                  <span>{getRating(attribute.values[0]?.value)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* end crop attributes */}

      {/* references */}
      <div>
        {crop.resources.length > 0
          && (
            <div style={styles.references.container}>
              <div style={styles.references.label}>References & Resources</div>
              <div style={styles.references.content}>
                {crop.resources.map((source, index) => (
                  <div key={index}>
                    <a
                      style={{
                        textDecoration: 'underline',
                        color: 'black',
                        fontWeight: 'bolder',
                      }}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                    {': '}
                    {source.source}
                    <br />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      {/* end references */}
    </div>
  );
};

export default InfoSheet;
