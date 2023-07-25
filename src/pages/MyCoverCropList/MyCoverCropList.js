/* eslint-disable react/no-unstable-nested-components */
/*
  Contains the list of crops that the user selected
  redirectToExplorer is used to handle sending user back to the home page
  TopBar contains the blue bar for adding crops
*/

import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Context } from '../../store/Store';
import MyCoverCropComparison from './MyCoverCropComparison/MyCoverCropComparison';
import MyCoverCropCards from './MyCoverCropCards/MyCoverCropCards';
import { useSelector } from 'react-redux';

const MyCoverCropList = ({ comparisonView, from }) => {
  const { state, dispatch } = useContext(Context);
  const comparison = comparisonView || false;
  const history = useHistory();
  const [updatedSelectedCrops, setUpdatedSelectedCrops] = useState([]);
  // const { selectedCrops } = state;
  const selectedCropsRedux = useSelector((state) => state.cropData.selectedCrops);

  useEffect(() => {
    setUpdatedSelectedCrops(selectedCropsRedux);
  }, [selectedCropsRedux]);

  useEffect(() => {
    if (state.state === '') {
      history.push('/');
    }
  }, [state.state]);

  const redirectToSpeciesSelector = () => {
    history.replace('/');
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

  const TopBar = ({ view }) => (
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
  return (
    <div className="container-fluid">
      {/* eslint-disable-next-line no-nested-ternary */}
      {updatedSelectedCrops.length > 0
       && updatedSelectedCrops.length === 0 ? (
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
              <MyCoverCropComparison selectedCrops={updatedSelectedCrops} />
            </div>
          </>
        ) : (
          <>
            <TopBar view={comparison} />
            <div className="row">
              <div className="d-flex flex-wrap mt-2">
                {updatedSelectedCrops.map((crop, index) => (
                  <MyCoverCropCards
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
};

export default MyCoverCropList;
