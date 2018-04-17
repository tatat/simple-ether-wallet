<template lang="pug">
article.accounts
  h1.title Accounts
  el-table(v-bind:data="list")
    el-table-column(prop="name" label="Name")
    el-table-column(prop="address" label="Address")
    el-table-column(prop="balance" label="Balance")
</template>

<script>
import { mapState } from 'vuex'

export default {
  async mounted() {
    await this.$store.dispatch('accounts/fetchOnce')
    this.$interval('seconds', () => this.$store.dispatch('accounts/fetch'))
  },

  computed: {
    ...mapState('accounts', [
      'list'
    ])
  }
}
</script>

<style lang="stylus" src="~/assets/css/el-table.styl" scoped></style>

