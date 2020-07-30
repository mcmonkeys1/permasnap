import * as actions from './txList'
import * as types from './actionTypes'
import { IPsnapPhoto } from '../reducers'

describe('tx list actions', ()=> {
	it('should create an action to add a tx to list', ()=>{
		const item: IPsnapPhoto = {
			dataUri: "abc", 
			hashtags:[], 
			description: "words here",
			completed: false,
		}
		const expectedAction: actions.AddTxItemAction = {
			type: types.ActionTypes.ADD_TXITEM,
			payload: item,
		}
		expect(actions.addTxItem(item)).toEqual(expectedAction)
	})
	it('should create an action to delete an item from the list', ()=>{
		const id = 'mylongid'
		const expectedAction: actions.DeleteTxItemAction = {
			type: types.ActionTypes.DELETE_TXITEM,
			payload: id,
		}
		expect(actions.deleteTxItem(id)).toEqual(expectedAction)
	})
})