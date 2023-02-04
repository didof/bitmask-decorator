export default function* powerOfTwoGenerator(): Generator<number, never, number> {
    let pow = 0
    while (true) {
        yield 2 ** pow
        pow++
    }
}

export const b = {
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16,
    w6: 32,
    w7: 64,
    w8: 128
}