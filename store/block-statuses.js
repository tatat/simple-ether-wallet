import client from '~/assets/js/client'

export const state = () => ({
  latest: null
})

export const getters = {
  latestBlockNumber: state => state.latest ? state.latest.number : 0,
  latestBlockHash: state => state.latest ? state.latest.hash : null,
  latestBlockMiner: state => state.latest ? state.latest.miner : null,
  latestBlockTimestamp: state => state.latest ? state.latest.timestamp : null,
}

export const mutations = {
  setLatest(state, { latest }) {
    state.latest = latest
  }
}

const latestBlockSubscription = {
  count: 0,
  subscription: null,

  async subscribeOnce(callback) {
    if (++ this.count === 1)
      this.subscription = client.web3.eth.subscribe('newBlockHeaders', callback)
  },

  async unsubscribeOnce() {
    this.count = Math.max(this.count - 1, 0)

    if (this.subscription && this.count === 0)
      await this.subscription.unsubscribe()
  }
}

export const actions = {
  async watchLatest({ commit }) {
    latestBlockSubscription.subscribeOnce((error, block) => {
      if (error)
        return console.error(error)

      commit('setLatest', { latest: block })
    })
  },

  async unwatchLatest() {
    return latestBlockSubscription.unsubscribeOnce()
  },

  async fetchLatest({ commit }) {
    commit('setLatest', { latest: await client.web3.eth.getBlock('latest') })
  }
}