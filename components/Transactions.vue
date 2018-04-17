<template lang="pug">
article.transactions
  h1.title Latest Transactions
  el-table(v-bind:data="formedList")
    el-table-column(prop="created_at" label="Created at")
    el-table-column(prop="from" label="From")
    el-table-column(prop="to" label="To")
    el-table-column(prop="valueInEther" label="Ether")
    el-table-column(prop="confirmations" label="Confirmations")
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import * as ethUtils from '~/assets/js/eth-utils'

export default {
  mounted() {
    this.$store.dispatch('block-statuses/watchLatest')
    this.$store.dispatch('transactions/completeList')
  },

  beforeDestroy() {
    this.$store.dispatch('block-statuses/unwatchLatest')
  },

  computed: {
    ...mapState('transactions', [
      'list',
      'completedList',
      'requiredConfirmations'
    ]),

    formedList() {
      return this.completedList.map(item => {
        return {
          ...item,
          valueInEther: ethUtils.fromWei(item.value),
          confirmations: item.wellConfirmed ? `${ this.requiredConfirmations }+` : String(item.confirmations)
        }
      }).sort((a, b) => moment(b.created_at).diff(a.created_at))
    },

    latestBlock() {
      return this.$store.state['block-statuses'].latest
    }
  },

  watch: {
    list() {
      this.$store.dispatch('transactions/completeList')
    },

    latestBlock() {
      this.$store.dispatch('transactions/completeList')
    }
  }
}
</script>

<style lang="stylus" src="~/assets/css/el-table.styl" scoped></style>
