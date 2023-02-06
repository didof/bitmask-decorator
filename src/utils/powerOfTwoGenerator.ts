export default function* powerOfTwoGenerator(): Generator<number, never, number> {
    let pow = 0
    while (true) {
        yield 2 ** pow
        pow++
    }
}

export const b = Object.freeze({
    w1: 1 << 0, // 1
    w2: 1 << 1, // 2
    w3: 1 << 2, // 4
    w4: 1 << 3, // 8
    w5: 1 << 4, // 16
    w6: 1 << 5, // 32
    w7: 1 << 6, // 64
    w8: 1 << 7, // 128,
    wAll: ~(~0 << 31) // 2147483647
})