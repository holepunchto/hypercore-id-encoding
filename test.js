const test = require('brittle')
const Hypercore = require('hypercore')
const ram = require('random-access-memory')
const z32 = require('z32')
const b = require('b4a')

const { encode, decode } = require('.')

test('encodes/decodes a hypercore key as z-base32', async t => {
  const core = new Hypercore(ram)
  await core.ready()
  const core2 =  new Hypercore(ram, decode(encode(core.key)))
  await core2.ready()
  t.alike(core2.key, core.key)
})

test('decodes a hex-encoded hypercore key', async t => {
  const core = new Hypercore(ram)
  await core.ready()
  t.alike(decode(encode(core.key)), decode(b.toString(core.key, 'hex')))
})

test('invalid keys', t => {
  const keys = [
    'hello world',
    b.alloc(63)
  ]
  for (const key of keys) {
    t.exception(() => encode(key))
  }
})

test('invalid ids', t => {
  const ids = [
    b.alloc(64),
    'hello world',
    Array.from({ length: 52 }).fill('Z').join(''),
    Array.from({ length: 64 }).fill('z').splice(0, 1, 'Z').join('')
  ]
  for (const id of ids) {
    t.exception(() => decode(id))
  }
})
