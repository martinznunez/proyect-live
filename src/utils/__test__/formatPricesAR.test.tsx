import {formatPricesAR} from "../formatPricesAR";

describe("formatPricesAR", () => {
  test("formats positive numbers correctly", () => {
    expect(formatPricesAR(1000)).toBe("$1.000,00");
    expect(formatPricesAR(100000)).toBe("$100.000,00");
    expect(formatPricesAR(1234.56)).toBe("$1.234,56");
  });

  test("formats small numbers correctly", () => {
    expect(formatPricesAR(1)).toBe("$1,00");
    expect(formatPricesAR(0)).toBe("$0,00");
  });

  test("formats decimal values correctly", () => {
    expect(formatPricesAR(0.99)).toBe("$0,99");
    expect(formatPricesAR(1234.5)).toBe("$1.234,50");
  });

  test("formats negative numbers correctly", () => {
    expect(formatPricesAR(-500)).toBe("-$500,00");
  });
});
