export default {
  async set(key, value) {
    return localStorage.setItem(key, value)
  },

  async get(key) {
    return localStorage.getItem(key)
  },

  async remove(key) {
    return localStorage.removeItem(key)
  },

  async clear() {
    return localStorage.clear()
  }
}