import {orderItems} from "../orderItems";
import {Product} from "../../types";

describe("orderItems", () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Zeta",
      price: 200,
      description: "",
    },
    {
      id: 2,
      title: "Alpha",
      price: 100,
      description: "",
    },
    {
      id: 3,
      title: "Beta",
      price: 150,
      description: "",
    },
  ];

  test("should order products alphabetically", () => {
    const orderedByAlphabet = orderItems("alfabéticamente", products);

    expect(orderedByAlphabet[0].title).toBe("Alpha");
    expect(orderedByAlphabet[1].title).toBe("Beta");
    expect(orderedByAlphabet[2].title).toBe("Zeta");
  });

  test("should order products by price", () => {
    const orderedByPrice = orderItems("prices", products);

    expect(orderedByPrice[0].price).toBe(100);
    expect(orderedByPrice[1].price).toBe(150);
    expect(orderedByPrice[2].price).toBe(200);
  });

  test("should return products in original order if order option is invalid", () => {
    const orderedByInvalidOption = orderItems("invalidOption", products);

    expect(orderedByInvalidOption).toEqual(products);
  });
});
