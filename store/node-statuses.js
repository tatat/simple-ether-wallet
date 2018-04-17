import client from '~/assets/js/client'

export const state = () => ({
  provider: null,
  mining: false,
  hashrate: 0,
  peerCount: 0
})

export const mutations = {
  set(state, { provider, mining, hashrate, peerCount }) {
    state.provider = provider
    state.mining = mining
    state.hashrate = hashrate
    state.peerCount = peerCount
  }
}

export const actions = {
  async fetch({ commit }) {
    const provider = client.web3.currentProvider ? client.web3.currentProvider.connection.url : null
    const mining = await client.web3.eth.isMining()
    const hashrate = await client.web3.eth.getHashrate()
    const peerCount = await client.web3.eth.net.getPeerCount()

    commit('set', { provider, mining, hashrate, peerCount })
  }
}