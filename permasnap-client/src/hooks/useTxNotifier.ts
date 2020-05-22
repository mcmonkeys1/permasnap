import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTxsByWallet } from '../providers/ArweaveProvider'
import { JWKInterface } from 'arweave/web/lib/wallet'
import { IStoreState, IPsnapPhoto } from '../redux/reducers'
import { deleteTxItem } from '../redux/actions'


export const useTxNotifier = (jwk: JWKInterface) => {
	const queuedTxs = useSelector((state: IStoreState) => state.txList)
	const dispatch = useDispatch()
	const [txDatas, setTxDatas] = useState<IPsnapPhoto[]>([])

	let timerId: NodeJS.Timeout //ref of setInterval
	
	const getUploads = async () => {
		const uploadedTxs = await getAllTxsByWallet(jwk)
		let display = []


		console.log('queuedTxs: '+JSON.stringify(queuedTxs))

		if(queuedTxs.length > 0){
			console.log('queuedTxs exist. length: '+ queuedTxs.length)
			uploadedTxs.forEach(txData => {
				let txMined = queuedTxs.find(txUload => txUload.id === txData.id)
				if(txMined!==undefined){
					let id = txMined.id!
					console.log('removing txid: '+id)
					dispatch(deleteTxItem(id))
					queuedTxs.filter(x => x.id !== id) //dispatch takes some time
					console.log('queuedTxs: ')
					console.log(queuedTxs)
				}
			})

			display = queuedTxs.concat(uploadedTxs)
		}else{
			console.log('queuedTxs empty')
			display = uploadedTxs
		}

		setTxDatas(display)
		console.log('display: ')
		console.log(display)
		console.log('fetched data @'+ (new Date()))
	}
	
	useEffect(() => {
		console.log('detected change in queue items')
		getUploads()
	}, [queuedTxs])

	useEffect(() => {
		getUploads()
		timerId = setInterval(getUploads,60000) //check every minute
		return () =>{
			clearInterval(timerId)
		}
	}, []) //once on componenet load

	return{
		txDatas,
	}
}
