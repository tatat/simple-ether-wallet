import client from '~/assets/js/client'

export const addressValidator = (rule, value, callback) => {
  if (!client.web3.utils.isAddress(value))
    return callback(new Error('Invalid'))

  callback()
}

export const positiveNumberValidator = (rule, value, callback) => {
  if (!/^[0-9.]+$/.test(value))
    return callback(new Error('Invalid'))

  if (String(value).split('.').length > 2)
    return callback(new Error('Invalid'))

  const f = parseFloat(value)

  if (isNaN(f) || f <= 0 || !isFinite(f))
    return callback(new Error('Invalid'))

  callback()
}