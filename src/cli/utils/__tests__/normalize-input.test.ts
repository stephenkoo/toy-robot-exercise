import { normalizeInput } from "../normalize-input";

describe("normalizeInput", () => {
  it("converts string to upper case", () => {
    const mockString = "you are awesome";

    expect(normalizeInput(mockString)).toEqual("YOU ARE AWESOME");
  });

  it("trims white space of both ends of a string", () => {
    const mockString = "   HELLO WORLD   ";

    expect(normalizeInput(mockString)).toEqual("HELLO WORLD");
  });
});
