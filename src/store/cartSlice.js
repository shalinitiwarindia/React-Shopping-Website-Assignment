import { createSlice } from "@reduxjs/toolkit";

const initial = (() => {
  try { return JSON.parse(localStorage.getItem("cart")) || { items: [] }; }
  catch { return { items: [] }; }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addToCart: (s, a) => {
      const { id, qty } = a.payload;
      const existing = s.items.find(i => i.id === id);
      if (existing) existing.qty = Math.min(10, existing.qty + qty);
      else s.items.push({ ...a.payload, qty: Math.min(10, qty) });
    },
    updateQty: (s, a) => {
      const it = s.items.find(i => i.id === a.payload.id);
      if (it) it.qty = Math.min(10, Math.max(1, a.payload.qty));
    },
    removeFromCart: (s, a) => {
      s.items = s.items.filter(i => i.id !== a.payload);
    },
    clearCart: (s) => { s.items = []; },
  }
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
