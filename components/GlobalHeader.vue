<template lang="pug">
header.global-header
  .start
    h1.title Simple Ether Wallet

  .center
    nuxt-link(to="/dashboard") Dashboard
    nuxt-link(to="/send") Send Ether

  .end
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.global-header
  display flex
  background-color #35495e

.center
  padding 0 10px

.title
  font-family "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  display block
  font-weight 300
  font-size 36px
  color #35495e
  letter-spacing 1px
  margin 0
  line-height 72px
  padding 0 20px
  background-color #ccc

a
  display inline-block
  line-height 72px
  font-weight bold
  text-decoration none
  color darken(#fff, 20%)
  padding 0 15px

  &.nuxt-link-active,
  &.nuxt-link-exact-active,
  &:hover
    color #fff
</style>