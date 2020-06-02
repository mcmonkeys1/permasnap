import { ActionTypes } from './actionTypes';
import { IPsnapPhoto } from '../reducers/reducerTypes';

export interface CurrentPhotoAction {
	type: ActionTypes.SET_CURRENT_PHOTO
	payload: IPsnapPhoto
}

export const setCurrentPhoto = (picData: IPsnapPhoto): CurrentPhotoAction  => {
	return {
		type: ActionTypes.SET_CURRENT_PHOTO,
		payload: picData
	}
}



