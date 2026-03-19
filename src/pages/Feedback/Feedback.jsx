import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PSAForm } from 'shared-react-components/src';
import { callCoverCropApi } from '../../shared/constants';

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      marginTop: '5px',
    },
    sx: {
      '.MuiMenuItem-root': {
        '&.Mui-selected': {
          backgroundColor: '#598445',
          color: 'white',
        },
        '&:hover': {
          backgroundColor: 'rgba(176, 236, 130, 0.3)',
          color: 'black',
        },
      },
    },
  },
};

const getStateCodeFromLabel = (stateLabel, allStates) => {
  if (!stateLabel) return '';

  const match = allStates.find((s) => s.label.toLowerCase() === stateLabel.toLowerCase());

  return match?.shorthand || '';
};

const Feedback = () => {
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [counties, setCounties] = useState([]);
  const [prevState, setPrevState] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');

  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const stateLabelRedux = useSelector((stateRedux) => stateRedux.mapData.stateLabel);
  const addressDataRedux = useSelector((stateRedux) => stateRedux.addressData);

  useEffect(() => {
    callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/states`).then(
      (stateData) => {
        const productionCouncils = ['NECCC', 'SCCC', 'MCCC', 'WCCC'];
        const states = stateData.data.filter((state) =>
          productionCouncils.includes(state.council.shorthand),
        );
        setAllStates(states);
      },
    );
  }, []);

  useEffect(() => {
    const code = getStateCodeFromLabel(stateLabelRedux, allStates);
    setStateCode(code);
  }, [stateLabelRedux, allStates]);

  useEffect(() => {
    if (selectedState) {
      callCoverCropApi(`https://polygons.vegspec.org/counties?state=${selectedState}`).then(
        (countyData) => {
          setCounties(countyData);
        },
      );
    }
  }, [selectedState]);

  useEffect(() => {
    if (allStates.length > 0 && addressDataRedux?.markers?.length > 0) {
      callCoverCropApi(
        `https://polygons.vegspec.org/county?lat=${addressDataRedux.markers[0][0]}&lon=${addressDataRedux.markers[0][1]}`,
      ).then((addressData) => {
        setStateCode(addressData.state_code);
      });
    }
  }, [allStates, addressDataRedux]);

  useEffect(() => {
    if (stateCode) {
      callCoverCropApi(`https://polygons.vegspec.org/counties?state=${stateCode}`).then(
        (countyData) => {
          setCounties(countyData);
        },
      );
    }
  }, [stateCode]);

  useEffect(() => {
    if (
      counties.length > 0 &&
      addressDataRedux?.county &&
      counties.includes(addressDataRedux.county.replace(' County', ''))
    ) {
      setSelectedCounty(addressDataRedux?.county.replace(' County', ''));
    }
  }, [counties, addressDataRedux]);

  return (
    <PSAForm
      apiUrl="https://developfeedback.covercrop-data.org/v1/issues"
      submitMessage="Feedback submitted successfully"
      headerTitle="Cover Crop Species Selector Feedback"
      repository="dst-feedback"
      onFormChange={(data) => {
        if (data.state !== prevState) {
          setPrevState(data.state);
          data.county = '';
          setStateCode('');
          setSelectedCounty('');
        }
        setSelectedState(data.state);
      }}
      fields={[
        {
          type: 'text',
          label: 'Title',
          description: 'Give your feedback a short descriptive title.',
          props: {
            placeholder: 'Enter Your Title',
            variant: 'outlined',
            'data-test': 'feedback_title',
          },
          name: 'title',
          required: true,
        },
        {
          type: 'text',
          label: 'Message',
          description:
            'Explain your feedback as thoroughly as you can. Your feedback will help us improve the experience.',
          props: {
            placeholder: 'Enter Your Feedback',
            multiline: true,
            variant: 'outlined',
            fullWidth: true,
            minRows: 3,
            'data-test': 'feedback_message',
          },
          name: 'comments',
          required: true,
        },
        {
          type: 'checkbox',
          label: 'Topic',
          description: 'Select the type of feedback you are providing.',
          name: 'feedback_checkbox',
          required: true,
          options: [
            {
              label: 'About the Cover Crop Data',
              props: {
                name: 'About the Cover Crop Data',
                'data-test': 'feedback_data',
              },
            },
            {
              label: 'About the Website',
              props: {
                name: 'About the Website',
                'data-test': 'feedback_website',
              },
            },
            {
              label: 'Other',
              props: {
                name: 'Other',
                'data-test': 'feedback_other',
              },
            },
          ],
        },
        {
          type: 'text',
          label: 'Name',
          props: {
            placeholder: 'Enter Name',
            variant: 'outlined',
            'data-test': 'feedback_name',
          },
          name: 'name',
        },
        {
          type: 'text',
          label: 'Email',
          props: {
            placeholder: 'Enter Email',
            variant: 'outlined',
            'data-test': 'feedback_email',
          },
          name: 'email',
        },
        {
          name: 'state',
          label: 'For Western states please enter your state and county if you would like',
          type: 'dropdown',
          required: false,
          orientation: 'horizontal',
          description: 'Select your state',
          items: allStates.map((state) => ({
            value: state.shorthand,
            label: state.label.toUpperCase(),
          })),
          props: {
            label: 'STATE',
            value: stateCode,
            formSx: { minWidth: 120 },
            inputSx: {
              color: '#598445',
              '&.Mui-focused': {
                color: '#598445',
                fontWeight: 'medium',
              },
            },
            SelectProps: {
              variant: 'outlined',
              MenuProps: menuProps,
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '1px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '2px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '2.5px',
                },
              },
            },
          },
        },
        {
          name: 'county',
          label: 'County',
          type: 'dropdown',
          required: false,
          orientation: 'horizontal',
          description: 'Select your county',
          items: counties.map((county) => ({
            value: county,
            label: county.toUpperCase(),
          })),
          props: {
            label: 'COUNTY',
            value: selectedCounty,
            formSx: { minWidth: 120 },
            inputSx: {
              color: '#598445',
              '&.Mui-focused': {
                color: '#598445',
                fontWeight: 'medium',
              },
            },
            SelectProps: {
              variant: 'outlined',
              MenuProps: menuProps,
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '1px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '2px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#598445',
                  borderWidth: '2.5px',
                },
              },
            },
          },
        },
      ]}
      buttons={[
        {
          props: {
            title: 'Submit',
            variant: 'contained',
            color: 'primary',
            children: 'Submit',
          },
          action: 'submit',
        },
      ]}
    />
  );
};

export default Feedback;
