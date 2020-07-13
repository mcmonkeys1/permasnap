import { JWKInterface } from 'arweave/web/lib/wallet'
import { IPsnapPhoto } from '../redux/reducers'
import axios from 'axios'
let Arweave
if(process.env.NODE_ENV === "test"){ Arweave = require('arweave/node') } 
else{ Arweave = require('arweave/web').default } //hack for node-based testing to work

const HOST = process.env.REACT_APP_ARWEAVE_GW_HOST
const arweave = Arweave.init({
	host: HOST,
	port: 443,
	protocol: 'https'
}) 

export const generateWallet = async ():Promise<JWKInterface> => {
	return await arweave.wallets.generate()
}

export const getAddress = async (gWallet: JWKInterface):Promise<string> => {
	return await arweave.wallets.jwkToAddress(gWallet)
}

export const getAddressPubkey = async (pubkey: string) => {
	return await arweave.wallets.ownerToAddress(pubkey)
}

export const isInstanceofJwkInterface = (obj: object):boolean => {
	let result = true;
	['kty', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].forEach(keyname => {
		if( obj.hasOwnProperty(keyname) === false){
			result = false
		}
	})
	// // You could go on: https://tools.ietf.org/html/rfc7518#section-6.3

	return result
}

export const getTxStatus = async (txid:string) => {
	return (await arweave.transactions.getStatus(txid)).status
}

export const getTxTime = async (txid: string) => {
	let status = await axios(`https://${HOST}/tx/${txid}/status`)
	let height = status.data.block_height
	let block = await axios(`https://${HOST}/block/height/${height}`)

	return block.data.timestamp
}

export const getAllTxsDefault = async ():Promise<IPsnapPhoto[]> => {
	return getAllTxsByTag("psnap_context", "production")
}

export const getAllTxsByHashtag = async (hashtag: string):Promise<IPsnapPhoto[]> => {
	return getAllTxsByTag("psnap_content_tag", hashtag)	
}

export const getAllTxsByPubKey = async (pubkey: string):Promise<IPsnapPhoto[]> => {
	return getAllTxsByTag("dpost_owner", pubkey)
}

const getAllTxsByTag = async (name: string, value: string):Promise<IPsnapPhoto[]> => {
	let txDatas: IPsnapPhoto[] = []

	//grab all wallets uploads. take id, description, and hashtags - psnap_content_tag (many), psnap_description
	let gqlQuery = `{
		transactions(tags: [{name: "${name}", value: "${value}"},{name: "App-Name", value: "${process.env.REACT_APP_APP_NAME}"}]){
			id
			tags { name, value }
		}
	}`
	//let's just restate that interface in typescript
	interface IQuery { 
		id: string; 
		tags: { name: string, value: string }[]
	}

	//grab the query results
	let res = await arweave.api.post('arql', { query: gqlQuery })

	let txs = res.data.data.transactions
	if(!txs){
		console.log('Unhandled Rejection (TypeError): res.data.data is null')
		return []
	}

	// arweave.transactions.getStatus(txs[0]).then((status:any)=>{
	// 	console.log('*************************************************************')
	// 	console.log(status)
	// 	console.log('*************************************************************')
	// })
	
	//loop over each tx object reformatting the data we need
	txDatas = txs.map( (tx: IQuery):IPsnapPhoto => {
		//grab tag data we want
		let hashtags: string[] = []
		let description = ''
		let owner = ''
		tx.tags.forEach((tag: {name:string, value:string}) => {
			// console.log(tag.name+':'+tag.value)
			switch (tag.name) {
				case "psnap_content_tag":
					hashtags.push(tag.value)
					break
				case "psnap_description":
					description = tag.value
					break
				case "dpost_owner":
					owner = tag.value
					break
				default:
					break;
			}
		})
		//return a ITxData object
		return {
			id: tx.id,
			url: 'https://' + HOST + '/' + tx.id,
			description: description,
			completed: true,
			hashtags: hashtags,
			owner: owner,
		}
	})

	return txDatas
}

export interface IArIdData {
	address: string
	name: string
}
export const getArweaveId = async (pubkey: string):Promise<IArIdData> => {
	let address: string = await arweave.wallets.ownerToAddress(pubkey) // 

	/** We just want the txs with arweaveId "Type": "name" */
	let gqlQuery = `{
		transactions(from: "${address}", tags: [{name: "App-Name", value: "arweave-id"},{name: "Type", value: "name"}]){
			id
		}
	}`
	// let gqlQuery = `{
	// 	transactions(from: "${address}", tags: [{name: "App-Name", value: "arweave-id"},{name: "Type", value: "name"}]){
	// 		id
	// 	}
	// }`
	//let's just restate that interface in typescript
	interface IQuery { 
		id: string; 
	}

	//grab the query results
	let res = await arweave.api.post('arql', { query: gqlQuery })


	let txids = res.data.data.transactions // returned from newest to oldest
	if(txids.length > 0){

		let name = await arweave.transactions.getData(txids[0].id, {decode: true, string: true}) //.then(console.log)

		console.log('arweave-id txid: ')
		console.log(txids[0].id)
		
		return { 
			name,
			address,
		}
	} else{
		return {
			name: address.substr(0,4) + '...' + address.substr( (address.length-4) ),
			address: address,
		}
	}
}


