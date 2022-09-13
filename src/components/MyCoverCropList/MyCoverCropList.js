/* eslint-disable react/no-unstable-nested-components */
/*
  Contains the list of crops that the user selected
  redirectToExplorer is used to handle sending user back to the home page
  TopBar contains the blue bar for adding crops
*/

import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import MyCoverCropCardsComponent from './MyCoverCropCardsComponent';
import MyCoverCropComparisonComponent from './MyCoverCropComparisonComponent';

function MyCoverCropList(comparisonView, from) {
  const { state, dispatch } = useContext(Context);
  const comparison = comparisonView || false;
  const history = useHistory();

  const redirectToSpeciesSelector = () => {
    history.replace('/species-selector');
    dispatch({
      type: 'ACTIVATE_SPECIES_SELECTOR_TILE',
      data: {
        speciesSelectorActivationFlag: true,
        myCoverCropActivationFlag: false,
      },
    });
  };

  const redirectToExplorer = () => {
    history.replace('/');
  };

  useEffect(() => {
    if (state.consent === true) {
      ReactGA.initialize('UA-181903489-1');

      ReactGA.pageview('cover crop list');
    }
  }, [state.consent]);

  function TopBar({ view }) {
    return (
      <div className="row">
        <div
          className="col-12 myCoverCropsBlueBar"
          style={{
            backgroundColor: '#35999b',
            height: '40px',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          }}
        >
          <div className="row">
            {view ? (
              <div className="col-8">
                <Button
                  style={{ color: 'white' }}
                  onClick={
                    from === 'myCoverCropListStatic'
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
                >
                  <Add />
                  {' '}
                  <span className="pl-2">ADD A CROP</span>
                </Button>
              </div>
            ) : (
              <div className="col-8">
                <Button
                  style={{ color: 'white' }}
                  onClick={
                    from === 'myCoverCropListStatic'
                      ? redirectToExplorer
                      : redirectToSpeciesSelector
                  }
                >
                  <Add />
                  {' '}
                  <span className="pl-2">ADD A CROP</span>
                </Button>
              </div>
            )}

            <div className="col-6" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      {/* eslint-disable-next-line no-nested-ternary */}
      {state.selectedCrops.length === 0 ? (
        <Typography variant="body1">
          Your list is empty.
          {' '}
          <Button
            onClick={
              from === 'myCoverCropListStatic' ? redirectToExplorer : redirectToSpeciesSelector
            }
          >
            Add Crops
          </Button>
        </Typography>
      ) : comparison ? (
        <>
          <TopBar view={comparison} />
          <div className="row mt-2">
            <MyCoverCropComparisonComponent selectedCrops={state.selectedCrops} />
          </div>
        </>
      ) : (
        <>
          <TopBar view={comparison} />
          <div className="row">
            <div className="d-flex flex-wrap mt-2">
              {state.selectedCrops.map((crop, index) => (
                <MyCoverCropCardsComponent
                  key={index}
                  cardNo={index + 1}
                  data={crop.data}
                  btnId={crop.id}
                  itemNo={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCoverCropList;
