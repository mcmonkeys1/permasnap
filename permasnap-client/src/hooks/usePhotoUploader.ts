import { useState, useEffect } from 'react';

/**
 * This just controls the modal. It needs to be used, along with corresponding modal componenet, 
 * in the parent component. There is some referencing going on under the hood in IonModal.
 */

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
		