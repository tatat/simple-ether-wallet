<template lang="pug">
article.block-status
  .container
    table
      caption Block Status
      tbody
        tr.block-status-block-number
          th Block Number
          td {{ latestBlockNumber }}
        tr.block-status-block-hash
          th Block Hash
          td {{ latestBlockHash }}
        tr.block-status-miner
          th Miner
          td {{ latestBlockMiner }}
        tr.block-status-mined-datetime
          th Mined Datetime
          td {{ latestBlockDatetime }}
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  async mounted() {
    await this.$store.dispatch('block-statuses/fetchLatest')
    this.$store.dispatch('block-statuses/watchLatest')
  },

  beforeDestroy() {
    this.$store.dispatch('block-statuses/unwatchLatest')
  },

  computed: {
    ...mapGetters('block-statuses', [
      'latestBlockNumber',
      'latestBlockHash',
      'latestBlockMiner',
      'latestBlockTimestamp'
    ]),

    latestBlockDatetime() {
      return this.latestBlockTimestamp ? moment.unix(this.latestBlockTimestamp).format() : null
    }
  }
}
</script>

<style lang="stylus" src="~/assets/css/table.styl" scoped></style>