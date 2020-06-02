import { IClientDelegatedTxnDto } from "../types/dpost";
import axios from 'axios';
import { JWKInterface } from "arweave/web/lib/wallet";

const ab2str = require('arraybuffer-to-string')
let webcrypto = window.crypto.subtle  //this is hard for testing in nodejs env ;-D

export interface IDpostResult {
	status: string
	id: string
}
export const DPost = async (
		jwk:JWKInterface,
		imageDataUri: string,
		contentTags: string[], //can be []
		description?: string,
		locationCountry?: string,
		locationCity?: string,
		locationFreetext?: string,
		locationLat?: string,
		locationLng?: string ):Promise<IDpostResult> => {

		
	/* Construct a transaction */

	const image_parts = imageDataUri.split(',')
	
	// create tx payload with mandatory properties
	const tx: IClientDelegatedTxnDto = {
		/* Psnap properties */
		psnap_image: image_parts[1],
		psnap_image_encoding: image_parts[0],
		psnap_content_tag: contentTags,
		psnap_app_version: process.env.REACT_APP_APP_VERSION as string,
		psnap_context: process.env.NODE_ENV as ("development" | "production"),
		/* Dpost properties */
		dpost_owner: jwk.n, //modulus value for the RSA public key
		dpost_version: '0.1',
		dpost_hash: '', //to be calculated
		dpost_signature: '', //to be calculated
	}
	// add optional tx properties
	if(description !== undefined) tx.psnap_description = description
	if(locationCountry !== undefined) tx.psnap_location_country = locationCountry
	if(locationCity !== undefined) tx.psnap_location_city = locationCity
	if(locationFreetext !== undefined) tx.psnap_location_free_text = locationFreetext
	if(locationLat !== undefined) tx.psnap_location_lat = locationLat
	if(locationLng !== undefined) tx.psnap_location_lng = locationLng

	/* calculate hash and sign */
	tx.dpost_hash = await hashPayload(tx)
	tx.dpost_signature = await sign(jwk, tx.dpost_hash)

	/* send the tx, and return result as a Promise*/
	let dPostUrl = process.env.REACT_APP_DPOST_SERVER as string
	console.log('Attempting DPost using URL: '+dPostUrl)

	return new Promise<IDpostResult>((resolve,reject) => {
		axios.post(dPostUrl, tx)
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			return reject('DPost error: '+JSON.stringify(err))
		})
	})
}


/**
 * The following crypto functions are created in such a way so as that the input and output 
 * encodings are compatible with permasnap server v1.
 *  
 */

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
	const arrayBufferToBase64 = ( buffer:ArrayBuffer ):string => {
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
	return await hash(JSON.stringify(to_hash))
}
const hash = async (data: string): Promise<string> => {
	/* convert string to arraybuffer */
	let buf = str2ab(data)
	
	let digest: ArrayBuffer = await webcrypto.digest("SHA-256", buf) //"data is an ArrayBuffer containing the data to be digested."
	
	/*convert arraybuffer to string */
	return ab2str(digest, 'hex') //'arraybuffer-to-string' a nice libaray with configurable outputs
}

/**
 * This is used in both the sign & hash functions
 */
const str2ab = (str:string):ArrayBuffer => {
	var buf = new ArrayBuffer(str.length ); // 1 bytes for each char, this is what hash and sign want
	var bufView = new Uint8Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}
