import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LS_KEY = "productsCache";
const cached = (() => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
})();

export const fetchProducts = createAsyncThunk("products/list", async (_, { getState }) => {
  const { items } = getState().products;
  if (items.length) return items;
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});

export const fetchCategories = createAsyncThunk("products/categories", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products/categories");
  return data;
});

export const fetchProductById = createAsyncThunk("products/byId", async (id, { getState }) => {
  const exists = getState().products.byId[id];
  if (exists) return exists;
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data;
});

const slice = createSlice({
  name: "products",
  initialState: {
    items: cached.items || [],
    categories: cached.categories || [],
    byId: cached.byId || {},
    status: cached.items ? "succeeded" : "idle",
    error: null,
    statusById: {},
    errorById: {},
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s)=>{ s.status="loading"; s.error=null; })
     .addCase(fetchProducts.fulfilled, (s,a)=>{ s.status="succeeded"; s.items=a.payload; persist(s); })
     .addCase(fetchProducts.rejected, (s,a)=>{ s.status="failed"; s.error=a.error.message; })
     .addCase(fetchCategories.fulfilled, (s,a)=>{ s.categories=a.payload; persist(s); })
     .addCase(fetchProductById.pending, (s,a)=>{ s.statusById[a.meta.arg]="loading"; s.errorById[a.meta.arg]=null; })
     .addCase(fetchProductById.fulfilled, (s,a)=>{ const p=a.payload; s.byId[p.id]=p; s.statusById[p.id]="succeeded"; persist(s); })
     .addCase(fetchProductById.rejected, (s,a)=>{ const id=a.meta.arg; s.statusById[id]="failed"; s.errorById[id]=a.error.message; });
  }
});

function persist(state){
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      items: state.items, categories: state.categories, byId: state.byId
    }));
  } catch {}
}

export default slice.reducer;
