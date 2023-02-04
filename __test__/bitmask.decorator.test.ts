import { bitmask, bitflag, bitwise, Bitmask } from "../src/bitmask.decorator";
import { b } from "../src/utils/powerOfTwoGenerator";
import { describe, it, expect } from "vitest";

describe("constructor", () => {
  it("should istantiate the bitmask correctly", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(1) private baz!: bitwise;
      @bitflag(0) private bam!: bitwise;
    }

    expect(new Test().binary()).toEqual("0b00000101");
    expect(new Test().binary(8)).toEqual("0b00000101");
    expect(new Test().binary(16)).toEqual("0b0000000000000101");
    expect(new Test().binary(24)).toEqual("0b000000000000000000000101");
    expect(new Test().binary(32)).toEqual("0b00000000000000000000000000000101");
  });
});

describe("binary", () => {
  it("should return a string representing the flags as binary", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(1) private baz!: bitwise;
    }

    expect(new Test().binary()).toEqual("0b00000101");
  });
});

describe("getBitwiseMask", () => {
  it("should get the bitwise mask", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
    }

    expect(new Test().getBitwiseMask()).toEqual(b.w1);
  });
});

describe("isBitwiseMask", () => {
  it("should set a single bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
    }

    const t = new Test();
    expect(t.isBitwiseMask(b.w1)).toBeTruthy();
    expect(t.isBitwiseMask(b.w2)).toBeFalsy();
  });

  it("should set multiple bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(1) private baz!: bitwise;
    }

    const t = new Test();
    expect(t.isBitwiseMask(b.w1 | b.w2)).toBeFalsy();
    expect(t.isBitwiseMask(b.w1 | b.w3)).toBeTruthy();
  });
});

describe("setBitwiseMask", () => {
  it("should set a single bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
    }

    const t = new Test().setBitwiseMask(b.w2);
    expect(t.binary()).toEqual("0b00000011");
  });

  it("should set multiple bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
    }

    const t = new Test().setBitwiseMask(b.w2 | b.w3);
    expect(t.binary()).toEqual("0b00000111");
  });
});

describe("toggleBitwiseMask", () => {
  it("should toggle a single bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
    }

    const t = new Test().toggleBitwiseMask(b.w1).toggleBitwiseMask(b.w2);
    expect(t.binary()).toEqual("0b00000010");
  });

  it("should toggle multiple bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(false) private baz!: bitwise;
    }

    const t = new Test().toggleBitwiseMask(b.w1 | b.w3);
    expect(t.binary()).toEqual("0b00000100");
  });
});

describe("clearBitwiseMask", () => {
  it("should clear a single bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(true) private baz!: bitwise;
    }

    const t = new Test().clearBitwiseMask(b.w1).clearBitwiseMask(b.w2);
    expect(t.binary()).toEqual("0b00000100");
  });

  it("should clear multiple bitwise", () => {
    interface Test extends Bitmask {}
    @bitmask
    class Test {
      @bitflag(true) private foo!: bitwise;
      @bitflag(false) private bar!: bitwise;
      @bitflag(true) private baz!: bitwise;
      @bitflag(true) private yop!: bitwise;
    }

    const t = new Test().clearBitwiseMask(b.w1 | b.w2 | b.w3);
    expect(t.binary()).toEqual("0b00001000");
  });
});
