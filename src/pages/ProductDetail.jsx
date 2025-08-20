import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { useEffect, useState } from "react";
import { Grid, Typography, Stack, Button, Rating } from "@mui/material";
import QuantitySelect from "../components/QuantitySelect";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { byId, statusById, errorById } = useSelector(s => s.products);
  const product = byId[id];
  const status = statusById[id] || "idle";
  const error = errorById[id];
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) dispatch(fetchProductById(id));
  }, [dispatch, id, product]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <ErrorState message={error} onRetry={()=>dispatch(fetchProductById(id))} />;
  if (!product) return null;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        <img src={product.image} alt={product.title} style={{ width: "100%", maxHeight: 420, objectFit: "contain" }} />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{product.title}</Typography>
        <Stack direction="row" spacing={2} sx={{ my: 1 }}>
          <Rating readOnly precision={0.5} value={product.rating?.rate || 0} />
          <Typography color="text.secondary">({product.rating?.count || 0})</Typography>
        </Stack>
        <Typography sx={{ my: 2 }} color="text.secondary">{product.description}</Typography>
        <Typography variant="h4" color="primary">₹{(product.price*83).toFixed(0)}</Typography>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
          <QuantitySelect value={qty} onChange={setQty} min={1} max={5} />
          <Button
            variant="contained"
            onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, qty }))}
          >
            Add to Cart
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
