import { IClientDelegatedTxnDto, IPSnapPayload } from "../server-types";
import axios from 'axios';
import { JWKInterface } from "arweave/web/lib/wallet";
import WebcryptoDriver from "arweave/web/lib/crypto/webcrypto-driver"
import image from '../assets/test/image-test'

const ab2str = require('arraybuffer-to-string')

let webcrypto = window.crypto.subtle
let webcryptoDriver = new WebcryptoDriver()

export const DPost = async (jwk:JWKInterface) => {
	// /* Construct a transaction */
	// let image_parts = image.split(',')

	// const txn_payload: IClientDelegatedTxnDto = {
	// 	psnap_image: image_parts[1],
	// 	psnap_image_encoding: image_parts[0],
	// 	psnap_app_version: process.env.REACT_APP_APP_VERSION as string,
	// 	psnap_context: process.env.NODE_ENV as ("development" | "production"),
	// 	psnap_content_tag: ['#permasnapteam', '#test'],
	// 	//psnap_description: 'A long meaningless sentence in this case.',
	// 	//psnap_location_city: 'Dublin',
	// 	//psnap_location_country: 'Ireland',
	// 	//psnap_location_free_text: 'Cocooning',
	// 	dpost_version: '0.1',
	// 	dpost_owner: jwk.n, //modulus value for the RSA public key
	// 	dpost_hash: '',
	// 	dpost_signature: ''
	// }

	// // const psnapPayload: IPSnapPayload = {
	// // 	psnap_image: image_parts[1],
	// // 	psnap_image_encoding: image_parts[0],
	// // 	psnap_app_version: process.env.REACT_APP_APP_VERSION as string,
	// // 	psnap_context: process.env.NODE_ENV as ("development" | "production"),
	// // 	psnap_content_tag: ['#permasnapteam', '#test'],
	// // 	//psnap_description: 'A long meaningless sentence in this case.',
	// // 	//psnap_location_city: 'Dublin',
	// // 	//psnap_location_country: 'Ireland',
	// // 	//psnap_location_free_text: 'Cocooning',
	// // }

	// txn_payload.dpost_hash = await hashPayload(txn_payload)
	// txn_payload.dpost_signature = await sign(jwk, txn_payload.dpost_hash)

	// console.log(txn_payload)

	// // const res = await axios.post('http://localhost:3000/d_post/', txn_payload).catch(err=>console.log(err))
	// // console.log(res)
	// try {
	// 	const res = await axios.post('http://localhost:3000/d_post/', txn_payload)
	// 	console.log('BORK!')
	// 	console.log(res.data)
	// } catch (err) {
	// 	console.log(err.response.data)
	// 	// console.log(Object.keys(err)) 
	// }

	const pub_key = jwk.n

	const image_parts = image.split(',')

	const txn_payload: IClientDelegatedTxnDto = {
		psnap_image: image_parts[1],
		psnap_image_encoding: image_parts[0],
		psnap_app_version: '0.1.3',
		psnap_description: 'This is the description for a test permasnap transaction omfg.',
		psnap_content_tag: ['#groovy', '#test-transaction'],
		psnap_context: 'development',
		psnap_location_city: 'Kilkenny',
		psnap_location_country: 'Eire',
		psnap_location_free_text: 'Quarantine',
		dpost_hash: '',
		dpost_owner: pub_key,
		dpost_signature: '',
		dpost_version: '0.1'
	}

	txn_payload.dpost_hash = await hashPayload(txn_payload)
	txn_payload.dpost_signature = await sign(jwk, txn_payload.dpost_hash)

	try {
		const res = await axios.post('http://localhost:3000/d_post/', txn_payload)
		console.log('BORK!')
		console.log(res.data)
	} catch (err) {
		console.log(err.response.data)
		// console.log(Object.keys(err))
	}
}

const sign = async (jwk: JWKInterface, data: string):Promise<string> => {
	/* get CryptoKey for signing */
	let cryptoKey: CryptoKey =  await webcrypto.importKey( "jwk", jwk, { name: "RSA-PSS", hash: { name: "SHA-256" }}, false, ["sign"]);

	/* convert data string to arraybuffer */
	let buf = str2ab(data)

	/* actual signing of data with CryptoKey */
	let signature = await webcrypto.sign(
		{
			name: "RSA-PSS",
			saltLength: 0
		},
		cryptoKey,
		buf
	);

	/* convert arraybuffer signature to base64 string */
	// let strbuf = ab2str(signature)
	// let base64str = btoa(strbuf)

	function arrayBufferToBase64( buffer:ArrayBuffer ):string {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
	}

	return arrayBufferToBase64(signature)
}


const hashPayload = async (post_data:any):Promise<string> => {
	const to_hash: any = {}
	const keys = Object.keys(post_data).sort()
	keys.forEach(key => {
		if (key.indexOf('psnap') > -1) {
			to_hash[key] = post_data[key]
		}
	})
	//console.log('JSON.stringify(to_hash)'+JSON.stringify(to_hash))
	let hashed = await hash(JSON.stringify(to_hash))
	console.log('hashed: '+hashed) //<-this is correct now!
	return hashed
}

const hash = async (data: string): Promise<string> => {
	/* convert string to arraybuffer */
	let buf = str2ab(data)

	let digest: ArrayBuffer = await webcrypto.digest("SHA-256", buf) //"data is an ArrayBuffer or ArrayBufferView containing the data to be digested."

	/*convert arraybuffer to string */
	return ab2str(digest, 'hex')
}

const str2ab = (str:string):ArrayBuffer => {
  var buf = new ArrayBuffer(str.length ); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// const sign = async (jwk: JWKInterface, data: Uint8Array): Promise<Uint8Array> => {
// 	let signature = await webcrypto.sign(
// 		{
// 			name: "RSA-PSS",
// 			saltLength: 0
// 		},
// 		await jwkToCryptoKey(jwk),
// 		data
// 	);

// 	return new Uint8Array(signature);
// }

// async function jwkToCryptoKey(jwk: JWKInterface): Promise<CryptoKey> {
// 	return webcrypto.importKey(
// 		"jwk",
// 		jwk,
// 		{
// 			name: "RSA-PSS",
// 			hash: {
// 				name: "SHA-256"
// 			}
// 		},
// 		false,
// 		["sign"]
// 	);
// }