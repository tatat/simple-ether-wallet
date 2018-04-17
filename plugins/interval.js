import Vue from 'vue'
import Timer from 'easytimer.js'

const Interval = {
  install(Vue, options) {
    const timer = new Timer()

    Vue.prototype.$interval = function(interval, handler) {
      if (!timer.isRunning())
        timer.start()

      const eventName = `${ interval }Updated`

      timer.addEventListener(eventName, handler)

      this.$once('hook:beforeDestroy', () => {
        timer.removeEventListener(eventName, handler)
      })
    }

    Vue.prototype.$intervalTimer = timer
  }
}

Vue.use(Interval)