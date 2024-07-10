import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import RenderFloodingOptions from './RenderFloodingOptions';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<RenderFloodingOptions />', () => {
  let reduxStore;
  const floodingOptions = {
    floodingOptions:
    [
      { label: 'None' },
      { label: 'Very rare' },
    ],
  };
  const flooding = [''];

  beforeEach(() => {
    reduxStore = configureStore({});
  });

  it('should render the chips accoding to flooding options passed', () => {
    const props = { floodingOptions, flooding };
    mount(
      <Provider store={reduxStore}>
        <RenderFloodingOptions {...props} />
      </Provider>,
    );
  });
});
