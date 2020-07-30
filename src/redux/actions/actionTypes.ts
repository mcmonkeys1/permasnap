import { WalletAction } from './wallet';
import { CurrentPhotoAction } from './currentPhoto';
import { AddTxItemAction, DeleteTxItemAction } from './txList';

export enum ActionTypes {
  /* todo actions */
  fetchTodos = 'fetchTodos',
  deleteTodo = 'deleteTodo',
  /* wallet actions */
  CHANGE_WALLET = 'CHANGE_WALLET',
  /* currentPhoto actions */
  SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO',
  /* txList actions */
  DELETE_TXITEM = 'DELETE_TXITEM',
  ADD_TXITEM = 'ADD_TXITEM',
  /* other actions... */
}

export type Action =  WalletAction | CurrentPhotoAction | AddTxItemAction | DeleteTxItemAction
// this along with the enum
//sets up an implicit type guard in the reducer
