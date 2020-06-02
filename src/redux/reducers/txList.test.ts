import {txListReducer} from './txList'
import * as types from '../actions/actionTypes'
import { IPsnapPhoto } from './reducerTypes'

describe('txListReducer',()=>{
	const item1: IPsnapPhoto = {
		id: "id 1",
		dataUri: "abc", 
		hashtags:[], 
		description: "words here",
		completed: false,
	}
	const item2: IPsnapPhoto = {
		id: "id 2",
		dataUri: "xyz", 
		hashtags:[], 
		description: "more words here",
		completed: false,
	}
	let items: IPsnapPhoto[] = [item1,item2]
	// it('should retutn the initial state',()=>{
	// 	expect(txListReducer([],))
	// })
	it('should handle ADD_TXITEM',()=>{
		expect(
			txListReducer([], {
				type: types.ActionTypes.ADD_TXITEM,
				payload: item1,
			})
		).toEqual([item1])
	})
	it('should handle DELETE_TXITEM', ()=>{
		expect(
			txListReducer(items, {
				type: types.ActionTypes.DELETE_TXITEM,
				payload: "id 1",
			})
		).toEqual([item2])
	})
})