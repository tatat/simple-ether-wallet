import storage from '~/assets/js/storage'

const parseJSON = (data, defaultValue = null) => {
  try {
    if (typeof data !== 'string')
      return defaultValue

    return JSON.parse(data)
  } catch(error) {
    return defaultValue
  }
}

const persistTransactionsPlugin = {
  async init({ commit }) {
    commit('transactions/setList', { list: parseJSON((await storage.get('transactions.list')), []) })
  },

  plugin(store) {
    store.subscribe((mutation, state) => {
      const listMutations = [ 'transactions/addListItem', 'transactions/removeListItem' ]

      if (listMutations.includes(mutation.type))
        storage.set('transactions.list', JSON.stringify(state.transactions.list))
    })
  }
}

export const actions = {
  async nuxtClientInit(context) {
    await persistTransactionsPlugin.init(context)
  }
}

export const plugins = [ persistTransactionsPlugin.plugin ]