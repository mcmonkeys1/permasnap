import { ClientDelegatedTxnDto } from "../server-types/dto";
import axios from 'axios';
import { JWKInterface } from "arweave/web/lib/wallet";
import WebcryptoDriver from "arweave/web/lib/crypto/webcrypto-driver"

// let webcrypto = window.crypto.subtle
let webcryptoDriver = new WebcryptoDriver()

export const DPost = async (jwk:JWKInterface) => 
{
	/* Construct a transaction */
	let image = require('../assets/img/image.test.png')
	let image_parts = image.split(',')

	const txn_payload: ClientDelegatedTxnDto = {
		psnap_image: image_parts[1],
		psnap_image_encoding: image_parts[0],
		psnap_app_version: process.env.REACT_APP_APP_VERSION as string,
		psnap_context: process.env.NODE_ENV as ("development" | "production"),
		psnap_content_tag: ['#permasnapteam', '#test'],
		//psnap_description: 'A long meaningless sentence in this case.',
		//psnap_location_city: 'Dublin',
		//psnap_location_country: 'Ireland',
		//psnap_location_free_text: 'Cocooning',
		dpost_version: '0.1',
		dpost_owner: jwk.n, //modulus value for the RSA public key
		dpost_hash: '',
		dpost_signature: ''
	}

	let uintHash = await hashPayload(txn_payload)
	txn_payload.dpost_hash = new TextDecoder().decode(uintHash)
	let uintSig = await webcryptoDriver.sign(jwk, uintHash)
	let sSig = new TextDecoder().decode(uintSig)
	txn_payload.dpost_signature = sSig

	const res = await axios.post('http://localhost:3000/d_post/', txn_payload).catch(err=>console.log(err))
	console.log(res)
}


function hashPayload(post_data:any):Promise<Uint8Array> {
	const to_hash: any = {}
	const keys = Object.keys(post_data).sort()
	keys.forEach(key => {
		if (key.indexOf('psnap') > -1) {
			to_hash[key] = post_data[key]
		}
	})
	return webcryptoDriver.hash( new TextEncoder().encode(JSON.stringify(to_hash))  )
}

// const hash = async (data: string): Promise<Uint8Array> => {
// 	let uint8Data = (new TextEncoder()).encode(data)
// 	let digest = await webcrypto.digest("SHA-256", uint8Data);

// 	return new Uint8Array(digest);
// }

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