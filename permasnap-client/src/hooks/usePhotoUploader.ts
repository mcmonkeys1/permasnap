import { useState } from 'react';
import { DPost, IDpostResult } from '../providers/DPostProvider';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { IPsnapPhoto } from '../redux/reducers';
		


export const usePhotoUploader = () => {
	/* Modal related */
	const [isShowing, setIsShowing] = useState<boolean>(false);
	const toggle = () => setIsShowing(!isShowing)
	/* Non modal related */
	

	const initialisePhoto = async (psnapPhoto: IPsnapPhoto) => {

		// Quick data length check - this can be removed once arweave 2.1 is released ?
		const MAX_SIZE = 10*1024*1024 // 10MB as of arweavejs v1.7
		let size = (new TextEncoder().encode(psnapPhoto.dataUri)).length
		console.log('DataUri image size: '+ size)
		if(size > MAX_SIZE){
			console.error("file too big: "+size)
			alert("file too big:"+size+' bytes\nand I need to fix this popup')
			return 
		}





	}


	
	
	// //send using dpost server
	// try {
	// 	let res: IDpostResult = await DPost(
	// 		jwk as JWKInterface,
	// 		dataUri,
	// 		[]
	// 	)
	
	// 	console.log("DPostResult: "+ JSON.stringify(res))
		
	// } catch (err) {
	// 	console.log('Caught in takePhoto: '+ JSON.stringify(err))
	// }


  return {
		/* Modal related */
    isShowing,
    toggle,
		/* Non modal related */

  }
}
		