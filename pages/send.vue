<template lang="pug">
section.container
  .body
    .block
      send-ether-form

    .block
      accounts

    .block
      transactions
</template>

<script>
import Accounts from '~/components/Accounts.vue'
import SendEtherForm from '~/components/SendEtherForm.vue'
import Transactions from '~/components/Transactions.vue'

export default {
  components: {
    Accounts,
    SendEtherForm,
    Transactions
  }
}
</script>

<style lang="stylus" src="~/assets/css/pages.styl" scoped></style>