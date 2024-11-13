import {getSessionStorage, saveSessionStorage} from "../sessionStorage";

describe("sessionStorage utility functions", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should save and retrieve an item from sessionStorage", () => {
    const key = "testKey";
    const value = "testValue";

    saveSessionStorage(key, value);

    const result = getSessionStorage(key);

    expect(result).toBe(value);
  });

  test("should return null if the item does not exist in sessionStorage", () => {
    const result = getSessionStorage("nonExistingKey");

    expect(result).toBeNull();
  });
});
