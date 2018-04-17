<template lang="pug">
article.node-status
  .container
    table
      caption Node Status
      tbody
        tr.node-status-provider
          th Node
          td {{ provider }}
        tr.node-status-mining
          th Is Mining?
          td {{ mining }}
        tr.node-status-hashrate
          th Hashrate
          td {{ hashrate }}
        tr.node-status-peer-count
          th Peer Count
          td {{ peerCount }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  async mounted() {
    await this.$store.dispatch('node-statuses/fetch')
    this.$interval('seconds', () => this.$store.dispatch('node-statuses/fetch'))
  },

  computed: {
    ...mapState('node-statuses', [
      'provider',
      'mining',
      'hashrate',
      'peerCount'
    ])
  }
}
</script>

<style lang="stylus" src="~/assets/css/table.styl" scoped></style>