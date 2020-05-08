import { DeleteTodoAction, FetchTodosAction } from './todos';
import { WalletAction } from './wallet';
import { CurrentPhotoAction } from './currentPhoto';

export enum ActionTypes {
  /* todo actions */
  fetchTodos = 'fetchTodos',
  deleteTodo = 'deleteTodo',
  /* wallet actions */
  CHANGE_WALLET = 'CHANGE_WALLET',
  /* currentPhoto actions */
  SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO',
  /* other actions... */
}

export type Action = FetchTodosAction | DeleteTodoAction | WalletAction | CurrentPhotoAction
// this along with the enum
//sets up an implicit type guard in the reducer
