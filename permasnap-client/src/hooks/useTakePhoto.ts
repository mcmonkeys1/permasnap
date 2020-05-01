import { useCamera } from '@ionic/react-hooks/camera';
import { base64FromPath,  } from '@ionic/react-hooks/filesystem';
import { CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core'; 
import { isPlatform } from '@ionic/react';
import { savePhoto } from '../providers/FilesystemProvider';
import { DPost, IDpostResult } from '../providers/DPostProvider';
import { useWallet } from './useWallet';
import { JWKInterface } from 'arweave/web/lib/wallet';



export const useTakePhoto = () => {
	const { Filesystem } = Plugins;
	const { getPhoto } = useCamera();
	const { arWallet: jwk } = useWallet();
	
	const takePhoto = async () => {
		
		/* Take a photo */
		
		let cameraPhoto: CameraPhoto
		try{
			cameraPhoto = await getPhoto({
				source: CameraSource.Camera,
				quality: 85,
				resultType: CameraResultType.Uri,
				
			})
			
		}catch(err){
			console.log("Error in takePhoto: " + JSON.stringify(err))
			return
		}
			
		/* Save to filesystem in permasnap folder */
		
		if(isPlatform('hybrid')){
			await savePhoto(cameraPhoto.path!) //mobile only
		}

		
		/* Send to permaweb? */
		
		let dataUri: string
		//read temp file
		if(isPlatform('hybrid')){
			const tempFile = await Filesystem.readFile({ path: cameraPhoto.path! })
			
			//*** WHY ARE WE GETTING EVENLY SPACED NEWLINES ??? ***
			/**
			 * Why are we getting evenly spaced newlines in the base64 data?
			 * Bug in the Capacitor android code! Created a PR:
			 * [https://github.com/ionic-team/capacitor/pull/2857]
			 */
			//for now we need to manually cleanup whitespace in the string:
			if(isPlatform('android')){
				let clean = tempFile.data.replace(/\r?\n|\r/g,'')
				dataUri = `data:image/${cameraPhoto.format};base64,${clean}`
			} else{
				dataUri = `data:image/${cameraPhoto.format};base64,${tempFile.data}`
			}

			console.log(dataUri)
			
		}else{
			dataUri = await base64FromPath(cameraPhoto.webPath!)
		}
		
		
		
		const MAX_SIZE = 7*1024*1024
		let size = (new TextEncoder().encode(dataUri)).length
		console.log('DataUri image size: '+ size)
		if(size > MAX_SIZE){
			console.error("file too big: "+size)
			alert("file too big:"+size+' bytes\nand I need to fix this popup')
			return 
		}
		console.log('cameraPhoto.exif: '+JSON.stringify(cameraPhoto.exif))
		
		try {
			let res: IDpostResult = await DPost(
				jwk as JWKInterface,
				dataUri,
				[]
			)

			console.log("DPostResult: "+ JSON.stringify(res))
			
		} catch (err) {
			console.log('Caught in takePhoto: '+ JSON.stringify(err))
		}

		
		
	}
	return {
		takePhoto
	}
}

