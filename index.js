const z32 = require('z32')
const b = require('b4a')

const encode = function (key) {
  if (!b.isBuffer(key)) throw new Error('Key must be a Buffer or an ArrayBuffer')
  if (b.byteLength(key) !== 32) throw new Error('Key must be 32-bytes long')
  return z32.encode(key)
}

const decode = function (id) {
  if (typeof id !== 'string') throw new Error('ID must be a String')
  try {
    if (id.length === 52) return z32.decode(id)
    if (id.length === 64) return b.from(id, 'hex')
    throw new Error('Invalid Hypercore key')
  } catch {
    throw new Error('Invalid Hypercore key')
  }
}

module.exports = {
  encode,
  decode
}
