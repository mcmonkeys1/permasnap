import { ActionTypes } from './actionTypes';
import { IPsnapPhoto } from '../reducers/reducerTypes';

export interface AddTxItemAction {
  type: ActionTypes.ADD_TXITEM
  payload: IPsnapPhoto
}

export interface DeleteTxItemAction {
  type: ActionTypes.DELETE_TXITEM;
  payload: string;
}


export const addTxItem = (item: IPsnapPhoto): AddTxItemAction => {
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
