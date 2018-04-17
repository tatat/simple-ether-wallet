import Web3 from 'web3'

export default {
  get web3() {
    if (!this._web3)
      this._web3 = new Web3()

    if(!this._web3.currentProvider)
      this._web3.setProvider(new this._web3.providers.WebsocketProvider(process.env.WEB3_PROVIDER_URL))

    return this._web3
  }
}