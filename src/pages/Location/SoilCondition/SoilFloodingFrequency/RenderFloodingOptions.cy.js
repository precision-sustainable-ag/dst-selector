import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import RenderFloodingOptions from './RenderFloodingOptions';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<RenderFloodingOptions />', () => {
  let reduxStore;
  const floodingOptions = [
    {
      id: 35982,
      value: '0',
      label: 'None',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
    {
      id: 35983,
      value: '1',
      label: 'Very rare',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
    {
      id: 35984,
      value: '2',
      label: 'Rare',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
    {
      id: 35985,
      value: '3',
      label: 'Occasional',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
    {
      id: 35986,
      value: '4',
      label: 'Frequent',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
    {
      id: 35987,
      value: '5',
      label: 'Very frequent',
      dataType: 'string',
      attributeId: 950,
      order: 1,
      createdAt: '2024-02-20T20:22:03.911Z',
      updatedAt: '2024-02-20T20:22:03.911Z',
      deletedAt: null,
    },
  ];
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
