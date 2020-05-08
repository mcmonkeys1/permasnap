import { useState, useEffect } from 'react';
import { DPost, IDpostResult } from '../providers/DPostProvider';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { IPsnapPhoto, IStoreState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPhoto } from '../redux/actions';
		


export const usePhotoUploader = () => {
	/* Modal related */
	const [isShowing, setIsShowing] = useState<boolean>(false);
	
	const toggle = () => {
		setIsShowing(!isShowing)
	}

	useEffect(() => {
		// setIsShowing(true) //debug
		
	}, [])



  return {
		/* Modal related */
    isShowing,
    toggle,
  }
}
		