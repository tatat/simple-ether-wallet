<template lang="pug">
.message-box-content
  p.desc Send {{ valueInEther }} ETHER
  ul.detail
    li
      span.label From:
      span.value {{ from }}
    li
      span.label To:
      span.value {{ to }}
    li
      span.label Estimated Fee:
      span.value {{ fee }} ETHER
</template>

<script>
export default {
  props: [
    'from',
    'to',
    'valueInEther',
    'fee'
  ]
}
</script>

<style lang="stylus" scoped>
.message-box-content
  font-size 16px
  line-height 24px
  padding 10px

.desc
  font-size 26px
  line-height 38px

.detail
  margin-top 20px

.label
  font-weight bold

.value
  margin-left 0.5em
</style>
