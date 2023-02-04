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
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16,
    w6: 32,
    w7: 64,
    w8: 128
};
//# sourceMappingURL=powerOfTwoGenerator.js.map