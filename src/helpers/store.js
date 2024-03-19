import { writable } from "svelte/store";

function createStore(key, initialValue) {
  const storedValue =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem(key)) || initialValue
      : initialValue;
  const store = writable(storedValue);

  store.subscribe((value) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
}

export const currencyData = createStore("currencyData", [
  { id: 1, coinType: "COP", value: 1 },
]);
export const itemsDataFixed = createStore("itemsDataFixed", []);
export const itemsDataVariable = createStore("itemsDataVariable", []);
