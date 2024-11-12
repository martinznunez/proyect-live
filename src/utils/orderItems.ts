import {Product} from "../types";

export const orderItems = (orderOptions: string, products: Product[]) => {
  const copiedProducts = [...products];

  const sortOptions: Record<string, (a: Product, b: Product) => number> = {
    prices: (a, b) => a.price - b.price,
    alfabéticamente: (a, b) => a.title.localeCompare(b.title),
  };

  const sortFunction = sortOptions[orderOptions] || ((_a, _b) => 0);

  copiedProducts.sort(sortFunction);

  return copiedProducts;
};
