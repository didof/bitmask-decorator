import powerOfTwoGenerator from "./utils/powerOfTwoGenerator";

const _bitmaskMap = "_bitmaskMap";

export type bitwise = number | boolean;

type FlagsMap = Map<string, bitwise>;

export interface Bitmask {
  binary(bits?: 8 | 16 | 24 | 32): string;
  getBitwiseMask(): number;
  isBitwiseMask(bitwise: number): boolean;
  setBitwiseMask(bitwise: number): this;
  clearBitwiseMask(bitwise: number): this;
  toggleBitwiseMask(bitwise: number): this;
}

export function bitmask<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor implements Bitmask {
    flags: number = 0;
    constructor(...args: any[]) {
      super();
      const map = Reflect.get(this, _bitmaskMap) as FlagsMap;
      const iter = powerOfTwoGenerator();
      let flags = 0;
      for (const [_, on] of map.entries()) {
        let i = iter.next().value;
        if (on) {
          flags |= i;
        }
      }
      this.flags = flags;
      Reflect.set(this, _bitmaskMap, null);
    }

    public binary(bits: 8 | 16 | 24 | 32 = 8): string {
      return "0b" + (this.flags >>> 0).toString(2).padStart(bits, "0");
    }

    public isBitwiseMask(bitwise: number): boolean {
      return (this.flags & bitwise) === bitwise;
    }

    public getBitwiseMask(): number {
      return this.flags;
    }

    public setBitwiseMask(bitwise: number): this {
      this.flags |= bitwise;
      return this;
    }

    public clearBitwiseMask(bitwise: number): this {
      this.flags &= ~bitwise;
      return this;
    }

    public toggleBitwiseMask(bitwise: number): this {
      this.flags ^= bitwise;
      return this;
    }
  };
}

export function bitflag(on: bitwise) {
  return function (target: any, key: string) {
    if (!Object.prototype.hasOwnProperty.call(target, _bitmaskMap)) {
      Object.defineProperty(target, _bitmaskMap, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Map() as FlagsMap,
      });
    }
    (target._bitmaskMap as FlagsMap).set(key, on);
  };
}
