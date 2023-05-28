# hypercore-id-encoding

Encodes Hypercore keys into z-base32 ids, and decodes both hex/z-base32 strings.

```
npm install hypercore-id-encoding
```

## Usage

```js
const { encode, decode } = require('hypercore-id-encoding')

const id = encode(core.key) // (z-base32 String)
const hexEncoded = core.key.toString('hex')

const core = new Hypercore(ram, decode(id)) 
const core2 = new Hypercore(ram, decode(hexEncoded)) // Will also work with hex
```

## API

#### `const id = encode(hypercoreKey)`

Encodes a 32-byte Hypercore key into a z-base32 id.

`hypercoreKey` must be a Buffer or an ArrayBuffer.

#### `const buf = decode(hypercoreId)`

Decodes an id into a Hypercore key.

`hypercoreId` must be a String.

If `hypercoreId` is a 52-character String, it will be decoded as z-base32.

If `hypercoreId` is a 64-character String, it will be decoded as hex.

## License

Apache-2.0



