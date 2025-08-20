import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import cart from "./cartSlice";

// persist CART to localStorage on each change
const persistCart = store => next => action => {
  const result = next(action);
  try { localStorage.setItem("cart", JSON.stringify(store.getState().cart)); } catch {}
  return result;
};

export const store = configureStore({
  reducer: { products, cart },
  middleware: (gDM) => gDM().concat(persistCart),
});
