import { ActionTypes } from './actionTypes';
import { JWKInterface } from 'arweave/web/lib/wallet';

export interface WalletAction {
	type: ActionTypes.CHANGE_WALLET
	payload: JWKInterface
}

export const changeWallet = (jwk: JWKInterface): WalletAction => {
	return {
		type: ActionTypes.CHANGE_WALLET,
		payload: jwk
	}
}


