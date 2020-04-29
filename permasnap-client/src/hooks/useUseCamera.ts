import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath,  } from '@ionic/react-hooks/filesystem';
import { CameraPhoto, CameraResultType, CameraSource, FilesystemDirectory, Filesystem } from '@capacitor/core'; 
import { isPlatform } from '@ionic/react';
import { savePhoto } from '../providers/FilesystemProvider';



export const useUseCamera = () => {
	const { getPhoto } = useCamera();
	const { readFile, writeFile } = useFilesystem();
	
	const takePhoto = async () => {
		
		/* Take a photo */
		
		let cameraPhoto: CameraPhoto
		try{
			cameraPhoto = await getPhoto({
				source: CameraSource.Camera,
				quality: 80,
				resultType: CameraResultType.Uri,
			})
			
		}catch(err){
			console.log("Error in takePhoto: " + JSON.stringify(err))
			return
		}
			
		/* Save to filesystem in permasnap folder */
		
		await savePhoto(cameraPhoto.path!)
		
		/* Send to permaweb? */
		
		let dataUri: string
		//read temp file
		if(isPlatform('hybrid')){
			const tempFile = await readFile({ path: cameraPhoto.path! })
			dataUri = tempFile.data
		}else{
			dataUri = await base64FromPath(cameraPhoto.webPath!)
		}
		//console.log('dataUri'+dataUri)
		
		
		
	}
	return {
		takePhoto
	}
}

// const mkdirPsnap = (dirName:string) => {
// 	Filesystem.mkdir({
// 		path: dirName,
// 		directory: FilesystemDirectory.Cache,
// 		recursive: false // like mkdir -p
// 	})
// 	.then(res => console.log("Folder '"+dirName+"' created."))
// 	.catch(err => {
//     console.error('Error! Unable to make directory: ', err);
//   })
// }