# Bitmask Decorator

Suppose you are creating a game that uses pawns. Each token has four boolean features. Something like: *high* or *low*, *light* or *dark*, *round* or *square*, *with hole* or *without hole*.
If you use a boolean, each characteristic will require a byte.

```ts
class Pawn {
  round: boolean = true;
  dark: boolean = true;
  tall: boolean = true;
  hole: boolean = true;
}
```

This library offers two TypeScript decorators that allow these features to be stored in the form of bitwise:

```ts
import {
  bitmask as mask,
  bitflag as flag,
  bitwise,
  Bitmask,
} from "bitmask";

interface Test extends BitwiseMask {}

@mask
class Test {
  @flag(true) private foo!: bitwise;
  @flag(false) private bar!: bitwise;
  @flag(1) private baz!: bitwise;
  @flag(0) private bam!: bitwise;
}
```

- `@bitmask`:
  - Needed to process the `@bitflag`s at instantiation time.

- `@bitflag`:
  - The decorator's argument is the initial state of the bit.
  - `private` is necessary to prevent autocompletion of the property (which was deleted by the decorator anyway).
  - The type `bitwise` is `number | boolean`.
  - The `!` is needed to suppress _'baz' is declared but its value is never read. ts(6133)_.

> A class namesake interface is needed for TypeScript to infer the bitwise-related methods generated.

## Methods

### binary
`binary(bits?: 8 | 16 | 24 | 32): string`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(false) private bar!: bitwise
    @flag(1) private baz!: bitwise
}

const t = new Test()
t.binary()                              // 0b00000101
t.binary(8)                             // 0b00000101
t.binary(16)                    // 0b0000000000000101
t.binary(24)            // 0b000000000000000000000101
t.binary(32)    // 0b00000000000000000000000000000101
```

### getBitwiseMask
`getBitwiseMask(): number`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(false) private bar!: bitwise
    @flag(1) private baz!: bitwise
}

const t = new Test()
t.getBitwiseMask() === 5 // true
t.getBitwiseMask() === b.w1 | b.w3 // true
```

### isBitwiseMask
`isBitwiseMask(bitwise: number): boolean`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(false) private bar!: bitwise
    @flag(1) private baz!: bitwise
}

const t = new Test()
t.isBitwiseMask(5) // true
t.getBitwiseMask(b.w1 | b.w3) // true
t.getBitwiseMask(b.w2) // false
t.getBitwiseMask(b.w1 | b.w2) // false
```

### setBitwiseMask
`setBitwiseMask(bitwise: number): this`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(false) private bar!: bitwise
    @flag(1) private baz!: bitwise
}

const t = new Test()
t.binary() // 0b00000101
t.setBitwiseMask(2).setBitwiseMask(b.24)
t.binary() // 0b00001111
```

### clearBitwiseMask
`clearBitwiseMask(bitwise: number): this`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(true) private bar!: bitwise
    @flag(true) private baz!: bitwise
    @flag(true) private yop!: bitwise
}

const t = new Test()
t.binary() // 0b00001111
t.clearBitwiseMask(b.w1).clearBitwiseMask(b.w2 | b.w3)
t.binary() // 0b00001000
```

### toggleBitwiseMask
`toggleBitwiseMask(bitwise: number): this`

```ts
@mask
class Test {
    @flag(true) private foo!: bitwise
    @flag(false) private bar!: bitwise
    @flag(true) private baz!: bitwise
    @flag(false) private yop!: bitwise
}

const t = new Test()
t.binary() // 0b00000101
t.toggleBitwiseMask(b.w1).toggleBitwiseMask(b.w2 | b.w3 | b.w4)
t.binary() // 0b00001010
```

## Utilities

### b.w

Avoid typos with `b`:

```ts
import { b } from "./lib/main"
```

Where `b` is the following object:

```ts
const b = {
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16,
    w6: 32,
    w7: 64,
    w8: 128
}
```

## Tests

To run unit tests run:

```
yarn test
```