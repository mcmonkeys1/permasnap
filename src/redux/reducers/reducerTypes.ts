import { JWKInterface } from 'arweave/web/lib/wallet';



//export interface IWallet <- single object already defined by JWKInterface

export interface IPsnapPhoto {
  id?: string //txid
  url?: string //permaweb url
  dataUri?: string //full pic data here
  completed: boolean
  status?: string //debug
  exif?: any
  description?: string
  owner?: string
  hashtags: string[]
}


// this is the interface for use in useSelector
export interface IStoreState {
  wallet: JWKInterface | {}; // remove these nulls later
  currentPhoto: IPsnapPhoto //only 1 of these
  txList: IPsnapPhoto[]
}

