import client from '~/assets/js/client'

export const getFee = async ({ from, to, value }) => {
  const { web3 } = client
  const estimatedGas = await web3.eth.estimateGas({ from, to, value })
  const gasPrice = await web3.eth.getGasPrice()
  const estimatedGasBN = web3.utils.toBN(estimatedGas)
  const gasPriceBN = web3.utils.toBN(gasPrice)

  return estimatedGasBN.mul(gasPriceBN).toString()
}

export const toWei = valueInEther => client.web3.utils.toWei(valueInEther, 'ether')

export const fromWei = value => client.web3.utils.fromWei(value, 'ether')

export const sendTransaction = (params) => {
  return new Promise((resolve, reject) => {
    client.web3.eth.sendTransaction(params, (error, transactionHash) => {
      error ? reject(error) : resolve(transactionHash)
    })
  })
}