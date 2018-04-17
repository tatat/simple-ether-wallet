import client from '~/assets/js/client'

const cloneDeep = obj => JSON.parse(JSON.stringify(obj))

export const state = () => ({
  limit: 5,
  list: [],
  completedList: [],
  requiredConfirmations: 12
})

export const mutations = {
  addListItem(state, { item }) {
    state.list.push(item)

    if (state.list.length > state.limit)
      state.list.splice(0, state.list.length - state.limit)
  },

  removeListItem(state, { hash }) {
    const index = state.list.findIndex(item => item.hash === hash)

    if (index > -1)
      state.list.splice(index, 1)
  },

  setList(state, { list }) {
    state.list = list.slice(- state.limit)
  },

  setCompletedList(state, { list }) {
    state.completedList = list
  }
}

export const actions = {
  async completeList({ state, rootState, commit }) {
    const web3 = client.web3
    const latestBlock = rootState['block-statuses'].latest || await web3.eth.getBlock('latest')

    const list = await Promise.all(state.list.map(async (item) => {
      const completedListItem = state.completedList.find(i => i.hash === item.hash)

      if (completedListItem && completedListItem.wellConfirmed)
        return cloneDeep(completedListItem)

      const transaction = await web3.eth.getTransaction(item.hash)
      const receipt = await web3.eth.getTransactionReceipt(item.hash)

      if (!transaction || !receipt) {
        return {
          ...item,
          transaction,
          receipt,
          confirmations: 0,
          wellConfirmed: false
        }
      } else {
        const block = await web3.eth.getBlock(transaction.blockNumber)

        if (block.hash !== transaction.blockHash) {
          commit('removeListItem', { hash: item.hash })
          return null
        } else {
          const confirmations = latestBlock.number - transaction.blockNumber + 1

          return {
            ...item,
            transaction,
            receipt,
            confirmations,
            wellConfirmed: confirmations > state.requiredConfirmations
          }
        }
      }
    }))

    commit('setCompletedList', { list: list.filter(item => item != null) })
  }
}