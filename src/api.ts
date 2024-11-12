import {Product} from "./types";
import {orderItems} from "./utils/orderItems";
import {getSessionStorage} from "./utils/sessionStorage";

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "TV 55 pulgadas",
    description: "TV 55 pulgadas, curva, marca gonzung",
    price: 1000,
  },
  {
    id: 2,
    title: "Webcam para streams",
    description: "Webcam marca logitency",
    price: 200,
  },
  {
    id: 3,
    title: "Celular gama alta",
    description: "Celular gama alta, marca xiaoncy",
    price: 300,
  },
  {
    id: 4,
    title: "Dron profesional",
    description: "Dron que soporta fuertes vientos, marca phantoncy",
    price: 500,
  },
  {
    id: 5,
    title: "Ventilador de escritorio",
    description: "Ventilador portable de escritorio, marca liliancy",
    price: 50,
  },
];

const api = {
  search: (query?: string): Promise<Product[]> => {
    let results = PRODUCTS;

    if (query) {
      results = PRODUCTS.filter((product) => {
        return product.title.toLowerCase().includes(query);
      });
    }

    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(orderItems(getSessionStorage("selectOptionSort") || "alfabéticamente", results)),
        1000,
      ),
    );
  },
};

export default api;
