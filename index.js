const z32 = require('z32')
const b = require('b4a')

const encode = function (key) {
  if (!b.isBuffer(key)) throw new Error('Key must be a Buffer')
  if (key.byteLength !== 32) throw new Error('Key must be 32-bytes long')
  return z32.encode(key)
}

const decode = function (id) {
  if (b.isBuffer(id)) {
    if (id.byteLength !== 32) throw new Error('ID must be 32-bytes long')
    return id
  }
  if (typeof id === 'string') {
    if (id.length === 52) return z32.decode(id)
    if (id.length === 64) {
      const buf = b.from(id, 'hex')
      if (buf.byteLength === 32) return buf
    }
  }
  throw new Error('Invalid Hypercore key')
}

const normalize = function (any) {
  return encode(decode(any))
}

const isValid = function (any) {
  try {
    decode(any)
    return true
  } catch {}

  return false
}

module.exports = {
  encode,
  decode,
  normalize,
  isValid
}
