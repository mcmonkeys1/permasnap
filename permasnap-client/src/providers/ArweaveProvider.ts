import { JWKInterface } from 'arweave/web/lib/wallet'
let Arweave
if(process.env.NODE_ENV === "test"){ Arweave = require('arweave/node') } 
else{ Arweave = require('arweave/web').default } //hack for testing to work

const host = process.env.REACT_APP_ARWEAVE_GW_HOST
const arweave = Arweave.init({
	host: host,
	port: 443,
	protocol: 'https'
}) 

export const generateWallet = async ():Promise<JWKInterface> => {
	return await arweave.wallets.generate()
}

export const getAddress = async (gWallet: JWKInterface):Promise<string> => {
	return await arweave.wallets.jwkToAddress(gWallet)
}


export const isInstanceofJwkInterface = (obj: object):boolean => {
	let result = true;
	['kty', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].forEach(keyname => {
		if( obj.hasOwnProperty(keyname) === false){
			result = false
		}
	})
	// // You could go on: https://tools.ietf.org/html/rfc7518#section-6.3
	// let typed = obj as JWKInterface
	// if( typed.kty !== "RSA " || typed.e !== "AQAB" ) return false
	return result
}

export const getAllTxsByWallet = async (jwk: JWKInterface) => {
	
	let urls: string[] = []

	let gqlQuery = `{
		transactions(tags: [{name: "dpost_owner", value: "${jwk.n}"}]){
			id
		}
	}`

	let res = await arweave.api.post('arql', { query: gqlQuery })
	let txids = res.data.data.transactions
	urls = txids.map( (t: { id: string; }) => 'https://' + host + '/' + t.id)

	return urls
}

