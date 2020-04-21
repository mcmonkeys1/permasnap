import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { IStoreState } from './redux/reducers';

describe('Test App.tsx', () => {
  const initialState: IStoreState = { todos: [], wallet: {}}
  const mockStore = configureStore()
  let store, wrapper;

  it('renders without crashing', () => {
    store = mockStore(initialState)

    const { baseElement } = render(<Provider store={store}><App /></Provider>);
    expect(baseElement).toBeDefined();
  });
})
