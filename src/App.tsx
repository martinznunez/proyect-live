import type {Product} from "./types";

import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";

import api from "./api";
import {formatPricesAR} from "./utils/formatPricesAR";
import {orderItems} from "./utils/orderItems";
import {getSessionStorage, saveSessionStorage} from "./utils/sessionStorage";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(() => getSessionStorage("query") ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortQuery, setSortQuery] = useState<string>(
    () => getSessionStorage("selectOptionSort") ?? "alfabéticamente",
  );
  const [inputValue, setInputValue] = useState<string>(() => getSessionStorage("query") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [favorite, setFavorite] = useState<Set<number>>(
    new Set(JSON.parse(getSessionStorage("favoriteItem") || "[]").map((item: number) => item)),
  );

  const getProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await api.search(query.toLowerCase());

      saveSessionStorage("query", query);

      setProducts(result);
    } catch (error) {
      alert("algo salio mal ");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    getProduct();
  }, [query, getProduct]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderKey = e.target.value as string;

    const productSort = orderItems(orderKey, products);

    setSortQuery(orderKey);

    saveSessionStorage("selectOptionSort", orderKey);

    setProducts(productSort);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  };

  const handleChangeFavorite = (itemId: number) => {
    const updatedFavorite = new Set(favorite);

    if (updatedFavorite.has(itemId)) {
      updatedFavorite.delete(itemId);
    } else {
      updatedFavorite.add(itemId);
    }

    setFavorite(updatedFavorite);
    saveSessionStorage("favoriteItem", JSON.stringify(Array.from(updatedFavorite)));
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={inputValue}
        onChange={(e) => handleChangeInput(e)}
      />
      <select defaultValue={sortQuery} id="prices" name="select" onChange={(e) => handleChange(e)}>
        <option value="alfabéticamente">alfabéticamente</option>
        <option value="prices">precio</option>
      </select>
      {isLoading ? (
        <strong>Cargando....</strong>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className={(favorite.has(product.id) && "fiv") || product.price <= 100 ? "sale" : ""}
            >
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>{formatPricesAR(product.price)}</span>
              <div className="wrapper_checkbox">
                <input
                  checked={favorite.has(product.id)}
                  type="checkbox"
                  onChange={() => handleChangeFavorite(product.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
