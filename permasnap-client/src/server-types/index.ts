export interface IPSnapPayload {
	psnap_image: string
	psnap_image_encoding: string
	psnap_description?: string
	psnap_location_country?: string
	psnap_location_city?: string
	psnap_location_free_text?: string
	psnap_location_lat?: string
	psnap_location_lng?: string
	psnap_content_tag: string[]
	psnap_app_version: string
	psnap_context: 'development' | 'production'
}

export interface IDPostTx {
	/** Permasnap Parameters */
	psnap_payload: IPSnapPayload
	
	/** Delegated Posting Parameters */
	dpost_version: string
	dpost_owner: string
	dpost_hash: string
	dpost_signature: string
}

/* DPost server original shape */
export interface IClientDelegatedTxnDto {
	/** Permasnap Parameters */
	psnap_image: string
	psnap_image_encoding: string
	psnap_description?: string
	psnap_location_country?: string
	psnap_location_city?: string
	psnap_location_free_text?: string
	psnap_location_lat?: string
	psnap_location_lng?: string
	psnap_content_tag: string[]
	psnap_app_version: string
	psnap_context: 'development' | 'production'
	
	/** Delegated Posting Parameters */
	dpost_version: string
	dpost_owner: string
	dpost_hash: string
	dpost_signature: string
}