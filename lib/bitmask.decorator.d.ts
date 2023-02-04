export type bitwise = number | boolean;
export interface Bitmask {
    binary(bits?: 8 | 16 | 24 | 32): string;
    getBitwiseMask(): number;
    isBitwiseMask(bitwise: number): boolean;
    setBitwiseMask(bitwise: number): this;
    clearBitwiseMask(bitwise: number): this;
    toggleBitwiseMask(bitwise: number): this;
}
export declare function bitmask<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {
        flags: number;
        binary(bits?: 8 | 16 | 24 | 32): string;
        isBitwiseMask(bitwise: number): boolean;
        getBitwiseMask(): number;
        setBitwiseMask(bitwise: number): this;
        clearBitwiseMask(bitwise: number): this;
        toggleBitwiseMask(bitwise: number): this;
    };
} & T;
export declare function bitflag(on: bitwise): (target: any, key: string) => void;
//# sourceMappingURL=bitmask.decorator.d.ts.map