<template lang="pug">
article.send-ether
  .send-ether-inner
    h1 Send Ether
    .send-ether-form
      el-form(ref="form" v-bind:model="form" v-bind:rules="rules" label-width="120px")
        el-form-item(label="From" prop="from")
          el-input(v-model="form.from" placeholder="0x1234abcdef...")
        el-form-item(label="To" prop="to")
          el-input(v-model="form.to" placeholder="0x1234abcdef...")
        el-form-item(label="Amount (ETH)" prop="valueInEther")
          el-input(v-model="form.valueInEther" placeholder="0.0")
        el-form-item
          el-button(@click="onCancel") Cancel
          el-button(type="primary" @click="onSubmit") OK
</template>

<script>
import moment from 'moment'
import { addressValidator, positiveNumberValidator } from '~/assets/js/validators'
import * as ethUtils from '~/assets/js/eth-utils'
import SendEtherFormConfirmation from '~/components/SendEtherFormConfirmation.vue'

export default {
  data() {
    return {
      form: {
        from: '',
        to: '',
        valueInEther: ''
      },
      rules: {
        from: [
          { required: true, message: 'Please input', trigger: 'blur' },
          { validator: addressValidator, trigger: 'blur' }
        ],
        to: [
          { required: true, message: 'Please input', trigger: 'blur' },
          { validator: addressValidator, trigger: 'blur' }
        ],
        valueInEther: [
          { required: true, message: 'Please input', trigger: 'blur' },
          { validator: positiveNumberValidator, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid)
          this.onConfirm()
      })
    },

    onCancel() {
      this.$refs.form.resetFields()
    },

    async onConfirm() {
      try {
        const transferred = await this.confirmAndTransfer({
          from: this.form.from,
          to: this.form.to,
          value: ethUtils.toWei(this.form.valueInEther)
        })

        if (transferred)
          this.$message({ type: 'success', message: 'Transfer Succeeded', showClose: true })
      } catch (error) {
        this.$message({ type: 'error', message: `Transfer Failed (${ error.message })`, showClose: true })
      }
    },

    async onConfirmed(transactionParams, instance) {
      const confirmButtonText = instance.confirmButtonText

      instance.confirmButtonLoading = true
      instance.confirmButtonText = 'Loading...'

      try {
        await this.sendTransaction(transactionParams)
        this.$refs.form.resetFields()
      } finally {
        instance.confirmButtonLoading = false
        instance.confirmButtonText = confirmButtonText
      }
    },

    async confirmAndTransfer(transactionParams) {
      const messageBox = await this.$messageBox({
        customClass: 'send-ether-confirmation-message-box',
        message: this.$createElement(SendEtherFormConfirmation, {
          props: {
            ...this.form,
            fee: ethUtils.fromWei(await ethUtils.getFee(transactionParams))
          }
        }),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      })

      try {
        if (messageBox.confirmed)
          await this.onConfirmed(transactionParams, messageBox.instance)
      } finally {
        await messageBox.close()
      }

      return messageBox.confirmed
    },

    async sendTransaction(params) {
      console.log(`[SendEtherForm] Transaction send: ${ JSON.stringify(params) }`)

      this.$store.commit('transactions/addListItem', {
        item: {
          ...params,
          hash: await ethUtils.sendTransaction({ ...params }),
          created_at: moment().format()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.send-ether
  border-left 10px solid #35495e

.send-ether-inner
  border 1px solid #ddd
  border-left-style none

h1
  background-color #eee
  padding 10px 15px
  margin 0
  font-size 24px
  font-weight 400
  border-bottom 1px solid #ddd

.send-ether-form
  max-width 740px
  margin 0 auto
  margin-top 30px
  margin-bottom 30px
</style>

<style lang="stylus">
.send-ether-confirmation-message-box
  width 560px
</style>