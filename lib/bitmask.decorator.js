"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitflag = exports.bitmask = void 0;
const powerOfTwoGenerator_1 = __importDefault(require("./utils/powerOfTwoGenerator"));
const _bitmaskMap = "_bitmaskMap";
function bitmask(constructor) {
    return class extends constructor {
        constructor(...args) {
            super();
            this.flags = 0;
            const map = Reflect.get(this, _bitmaskMap);
            const iter = (0, powerOfTwoGenerator_1.default)();
            let flags = 0;
            for (const [key, on] of map.entries()) {
                let i = iter.next().value;
                if (on) {
                    flags |= i;
                }
            }
            this.flags = flags;
            Reflect.set(this, _bitmaskMap, null);
        }
        binary(bits = 8) {
            return "0b" + (this.flags >>> 0).toString(2).padStart(bits, "0");
        }
        isBitwiseMask(bitwise) {
            return (this.flags & bitwise) === bitwise;
        }
        getBitwiseMask() {
            return this.flags;
        }
        setBitwiseMask(bitwise) {
            this.flags |= bitwise;
            return this;
        }
        clearBitwiseMask(bitwise) {
            this.flags &= ~bitwise;
            return this;
        }
        toggleBitwiseMask(bitwise) {
            this.flags ^= bitwise;
            return this;
        }
    };
}
exports.bitmask = bitmask;
function bitflag(on) {
    return function (target, key) {
        if (!Object.prototype.hasOwnProperty.call(target, _bitmaskMap)) {
            Object.defineProperty(target, _bitmaskMap, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: new Map()
            });
        }
        target._bitmaskMap.set(key, on);
    };
}
exports.bitflag = bitflag;
//# sourceMappingURL=bitmask.decorator.js.map