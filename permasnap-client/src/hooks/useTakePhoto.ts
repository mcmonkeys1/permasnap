import { useCamera } from '@ionic/react-hooks/camera';
import { base64FromPath,  } from '@ionic/react-hooks/filesystem';
import { CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core'; 
import { isPlatform } from '@ionic/react';
import { savePhoto } from '../providers/FilesystemProvider';
import { useWallet } from './useWallet';
import { IPsnapPhoto } from '../redux/reducers';
import { useDispatch } from 'react-redux';
import { setCurrentPhoto } from '../redux/actions';



export const useTakePhoto = () => {
	const { Filesystem } = Plugins;
	const { getPhoto } = useCamera();
	const { arWallet: jwk } = useWallet();
	const dispatch = useDispatch()
	
	const takePhoto = async ():Promise<IPsnapPhoto> => {
		
		/* Take a photo */
		
		let cameraPhoto: CameraPhoto
		try{
			cameraPhoto = await getPhoto({
				source: CameraSource.Camera,
				quality: 85,
				resultType: CameraResultType.Uri,
				
			})
		}catch(e){
			console.log("Cancelled taking photo")
			return Promise.reject() //is this OK to do?
		}
			
		/* Save to filesystem in permasnap folder */
		
		if(isPlatform('hybrid')){
			await savePhoto(cameraPhoto.path!) //mobile only
		}
		
		/* Send to permaweb? */
		
		//read temp file
		let dataUri: string
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
			
		}else{
			dataUri = await base64FromPath(cameraPhoto.webPath!)
		}

		//combine our resultant data
		let result: IPsnapPhoto = { 
			dataUri, 
			exif: cameraPhoto.exif, 
		} 

		dispatch(setCurrentPhoto(result)) // save current photo in the store

		return result //return it also 
	}

	return {
		takePhoto
	}
}

