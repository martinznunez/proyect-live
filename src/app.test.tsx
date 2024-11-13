import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {vi} from "vitest";

import * as utils from "./utils/sessionStorage";
import App from "./App";
import api from "./api";

describe("MyComponent", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    sessionStorage.clear();
  });

  test("renders the correct content with mocked products", async () => {
    const mockProducts = [
      {id: 1, title: "TV 55 pulgadas", description: "TV curva", price: 1000},
      {id: 2, title: "Ventilador de escritorio", description: "Ventilador compacto", price: 50},
    ];

    vi.spyOn(api, "search").mockResolvedValue(mockProducts);

    render(<App />);

    expect(screen.getByText("Cargando....")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText("TV 55 pulgadas")).toBeDefined();
      expect(screen.getByText("Ventilador de escritorio")).toBeDefined();
    });

    expect(screen.queryByText("Dron profesional")).toBeNull();
    expect(screen.queryByText("Webcam para streams")).toBeNull();
  });

  test("renders the correct content when searching ", async () => {
    const mockProducts = [{id: 1, title: "TV 55 pulgadas", description: "TV curva", price: 1000}];

    vi.spyOn(api, "search").mockResolvedValue(mockProducts);
    render(<App />);
    const loadingText = screen.getByText("Cargando....");

    expect(loadingText).toBeDefined();

    const searchInput = screen.getByPlaceholderText("tv");

    expect(searchInput).toBeDefined();

    fireEvent.change(searchInput, {target: {value: "TV"}});

    await waitFor(() => {
      expect(api.search).toHaveBeenCalledWith("tv");
    });

    const selectElement = screen.getByRole("combobox");
    const option1 = within(selectElement).getByText("alfabéticamente");
    const option2 = within(selectElement).getByText("precio");

    expect(option1).toBeDefined();
    expect(option2).toBeDefined();

    await waitFor(() => expect(screen.queryByText("Cargando....")).toBeNull());

    expect(screen.getByText("TV 55 pulgadas")).toBeDefined();
  });

  test("should add and remove item from favorites", async () => {
    const mockProducts = [
      {id: 1, title: "TV 55 pulgadas", description: "TV curva", price: 1000},
      {id: 2, title: "Ventilador de escritorio", description: "Ventilador compacto", price: 50},
    ];

    vi.spyOn(api, "search").mockResolvedValue(mockProducts);
    const spySaveSessionStorage = vi.spyOn(utils, "saveSessionStorage");

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("TV 55 pulgadas")).toBeDefined();
      expect(screen.getByText("Ventilador de escritorio")).toBeDefined();
    });

    const checkbox = screen.getByRole("checkbox", {
      name: /TV 55 pulgadas favorites/i,
    }) as HTMLInputElement;
    const checkbox2 = screen.getByRole("checkbox", {
      name: /Ventilador de escritorio favorites/i,
    }) as HTMLInputElement;

    expect(checkbox).toBeDefined();
    expect(checkbox2).toBeDefined();

    expect(checkbox.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);

    await waitFor(() => {
      expect(spySaveSessionStorage).toHaveBeenCalledWith("favoriteItem", JSON.stringify([1]));
    });

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);

    await waitFor(() => {
      expect(spySaveSessionStorage).toHaveBeenCalledWith("favoriteItem", "[]");
    });

    fireEvent.click(checkbox2);

    expect(checkbox2.checked).toBe(true);

    await waitFor(() => {
      expect(spySaveSessionStorage).toHaveBeenCalledWith("favoriteItem", JSON.stringify([2]));
    });
  });
});
