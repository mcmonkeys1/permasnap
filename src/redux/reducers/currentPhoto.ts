import { IPsnapPhoto } from './reducerTypes'
import { Action, ActionTypes } from "../actions"


export const currentPhotoReducer = ( state: IPsnapPhoto = {hashtags:[],completed:false}, action: Action ) => {
	switch(action.type){
		case ActionTypes.SET_CURRENT_PHOTO:
			return action.payload
		default:
			return state
	}
}
