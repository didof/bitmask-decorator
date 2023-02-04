"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
function* powerOfTwoGenerator() {
    let pow = 0;
    while (true) {
        yield 2 ** pow;
        pow++;
    }
}
exports.default = powerOfTwoGenerator;
exports.b = {
    w1: 1 << 0,
    w2: 1 << 1,
    w3: 1 << 2,
    w4: 1 << 3,
    w5: 1 << 4,
    w6: 1 << 5,
    w7: 1 << 6,
    w8: 1 << 7,
    wAll: ~(~0 << 31) // 2147483647
};
//# sourceMappingURL=powerOfTwoGenerator.js.map