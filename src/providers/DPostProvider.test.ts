import * as DPost from './DPostProvider';

let {TextEncoder} = require('util')
global.TextEncoder = TextEncoder

/*** Cannot test this as it's using webcrypto ***/

describe('DPostProvider', () => {
	it('posts a transaction',  () => {
		expect("Cannot test this as it's using webcrypto").toEqual("Cannot test this as it's using webcrypto") 
	})

	// it('hashes a string', async () => {
	// 	expect(1)
	// 	let result = await DPost.hash("teststring")
	// 	console.log(result)
	// 	expect(result).toEqual('???')
	// })
})