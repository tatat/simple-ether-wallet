import client from '~/assets/js/client'

export const state = () => ({
  list: [],
  fetched: false
})

export const mutations = {
  setList(state, { list }) {
    state.list = list
  },

  setFetched(state) {
    state.fetched = true
  }
}

export const actions = {
  async fetch({ commit }) {
    commit('setFetched')

    const coinbase = await client.web3.eth.getCoinbase()
    const addresses = await client.web3.eth.getAccounts()

    let accountsCount = 0

    const list = await Promise.all(addresses.map(async (address) => {
      // Address includes some uppercase letters (Coinbase doesn't)
      const _address = address.toLowerCase()

      return {
        address,
        // Increment a count before using "await"
        name: _address === coinbase ? 'Main account (Etherbase)' : `Account ${ ++ accountsCount }`,
        balance: await client.web3.eth.getBalance(address)
      }
    }))

    commit('setList', { list })
  },

  async fetchOnce({ state, dispatch }) {
    if (!state.fetched)
      return dispatch('fetch')
  }
}