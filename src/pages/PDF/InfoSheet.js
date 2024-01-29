/* eslint-disable react/no-unescaped-entities */
/*
  This file contains the About component, helper functions, and styles
  The about page is a static pages that has information about the project
  RenderContent contains all the text listed in the about section
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { callCoverCropApi } from '../../shared/constants';
import InformationSheetContent from '../InformationSheetContent/InformationSheetContent';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function encodeParams(params) {
  const encode = (key, val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  return Object.keys(params)
    .map((key) => encode(key, params[key]))
    .join('&');
}

function buildApiRequestUrl(prefix, uri, params) {
  const baseUrl = `https://${prefix}.covercrop-selector.org`;

  if (!params) return `${baseUrl}${uri}`;

  const query = encodeParams(params);

  return `${baseUrl}${uri}?${query}`;
}

async function getStateDataFromApi(urlPrefix, state) {
  const uri = `/v2/regions/${state}`;
  const url = buildApiRequestUrl(urlPrefix, uri);
  return callCoverCropApi(url); // Assuming this returns a promise, else adjust accordingly
}

async function getRegionsDataFromApi(urlPrefix, regions) {
  const uri = `/v2/regions/${regions}`;
  const url = buildApiRequestUrl(urlPrefix, uri);
  return callCoverCropApi(url);
}

async function getCropDataFromApi(urlPrefix, state, crop, regions) {
  const uri = `/v1/states/${state}/crops/${crop}`;
  const url = buildApiRequestUrl(urlPrefix, uri, { regions });
  return callCoverCropApi(url);
}

const InfoSheet = () => {
  const [crop, setCrop] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [regionsData, setRegionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCrop, setLoadingCrop] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingRegion, setLoadingRegion] = useState(false);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);

  const query = useQuery();
  const CROP_ID = query.get('crop');
  const REGIONS_ID = query.get('regions');
  const STATE_ID = query.get('state');

  useEffect(() => {
    if (!stateData && !loadingState) {
      setLoadingState(true);
      getStateDataFromApi(apiBaseUrlRedux, STATE_ID).then((res) => {
        setStateData(res.data);
        setLoadingState(false);
      });
    }

    if (!regionsData && !loadingRegion) {
      setLoadingRegion(true);
      getRegionsDataFromApi(apiBaseUrlRedux, REGIONS_ID).then((res) => {
        setRegionsData(res.data);
        setLoadingRegion(false);
      });
    }

    if (!crop && !loadingCrop) {
      setLoadingCrop(true);
      getCropDataFromApi(apiBaseUrlRedux, STATE_ID, CROP_ID, REGIONS_ID).then((res) => {
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
    <div>
      <InformationSheetContent crop={crop} modalData={crop} region={regionsData} state={stateData} />
    </div>
  );
};

export default InfoSheet;
