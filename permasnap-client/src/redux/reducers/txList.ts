import { Action, ActionTypes } from '../actions';
import { ITxItem } from './reducerTypes';

export const txListReducer = (state: ITxItem[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TXITEM:
      return [...state, action.payload]
    case ActionTypes.DELETE_TXITEM:
      return state.filter((txItem: ITxItem) => txItem.id !== action.payload);
    default:
      return state;
  }
};
