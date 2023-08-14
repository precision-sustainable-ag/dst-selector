/*
  This file contains the Profile component, helper functions
  The profile page allows logged user to check their personal informations.
*/

import { Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import Header from '../Header/Header';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const getFields = async (accessToken = null) => {
  const url = `${apiServerUrl}fields?page=1&perPage=200`;
  const config = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      mode: 'no-cors',
    },
  };
  // console.log(url, config);

  return fetch(url, config)
    .then((res) => res.json())
    .then((data) => console.log('test', data))
    .catch((err) => console.error(err));
};

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessTokenSilently();
      const res = await getFields(accessToken);
      console.log(res);
    };
    getData();
  }, [getAccessTokenSilently]);

  return (
    <div className="contentWrapper" id="mainContentWrapper">
      <Header />
      <Box sx={{ border: 0.5, borderColor: 'grey.300' }} ml={2} mr={2} mt={5}>
        {isAuthenticated ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: '16px',
          }}
          >
            <img
              src={user.picture}
              alt="Profile"
              style={{
                borderRadius: '50%',
                height: '80px',
                width: '80px',
              }}
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            >
              <h2 style={{
                marginTop: 0,
                marginBottom: 0,
              }}
              >
                {user.name}
              </h2>
              <span style={{
                fontSize: '1.3rem',
              }}
              >
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          <div>You have not been logged in !</div>
        )}
      </Box>
    </div>

  );
};

export default Profile;
