import { ActionTypes } from './actionTypes';
import { ITxItem } from '../reducers/reducerTypes';

export interface AddTxItemAction {
  type: ActionTypes.ADD_TXITEM
  payload: ITxItem
}

export interface DeleteTxItemAction {
  type: ActionTypes.DELETE_TXITEM;
  payload: string;
}


export const addTxItem = (item: ITxItem): AddTxItemAction => {
	return {
		type: ActionTypes.ADD_TXITEM,
		payload: item
	}
}

export const deleteTxItem = (id: string): DeleteTxItemAction => {
  return {
    type: ActionTypes.DELETE_TXITEM,
    payload: id
  };
};
