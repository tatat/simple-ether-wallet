import Vue from 'vue'

const MessageBox = {
  /**
   * @param {Vue} Vue
   * @param {any} options
   */
  install(Vue, options) {
    /**
     * @typedef {object} MessageBox
     * @property {boolean} confirmed - To be set true if confirmed, otherwise false
     * @property {VueComponent} instance - Instance of VueComponent for $msgbox()
     * @property {() => Promise.<string>} close - Close message box
     */

    /**
     * @name Vue#$messageBox
     * @method
     * @example
     * const messageBox = await vm.$messageBox(options)
     *
     * try {
     *   if (messageBox.confirmed) {
     *     await onConfirmed()
     *   } else {
     *     await onCancelled()
     *   }
     * } finally {
     *   await messageBox.close()
     * }
     * @param {any} options - To be passed to $msgbox() except "beforeClose"
     * @return {Promise.<MessageBox>}
     */
    Vue.prototype.$messageBox = function(options = {}) {
      return new Promise((resolve, reject) => {
        if (!this.$msgbox)
          return reject(new Error('element-ui is required'))

        let _action

        const promiseClosed = this.$msgbox({
          ...options,
          beforeClose(action, instance, done) {
            _action = action

            resolve({
              confirmed: action === 'confirm',
              instance,
              close: () => {
                done()
                return promiseClosed
              }
            })
          }
        }).catch(error => {
          if (error !== 'cancel')
            throw error
        }).then(() => _action)
      })
    }
  }
}

Vue.use(MessageBox)