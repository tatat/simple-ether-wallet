<template lang="pug">
section.container
  .body
    .block
      accounts

    .block
      node-status

    .block
      block-status
</template>

<script>
import Accounts from '~/components/Accounts.vue'
import NodeStatus from '~/components/NodeStatus.vue'
import BlockStatus from '~/components/BlockStatus.vue'

export default {
  components: {
    Accounts,
    NodeStatus,
    BlockStatus
  }
}
</script>

<style lang="stylus" src="~/assets/css/pages.styl" scoped></style>