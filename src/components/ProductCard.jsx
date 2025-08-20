import {
  Card, CardContent, CardMedia, Typography, Button, Stack
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={product.image}         // URL (Fake Store API)
        alt={product.title}
        sx={{ height: 220, objectFit: "contain", p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
          {product.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }} noWrap>
          {product.category}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ₹{(product.price * 83).toFixed(0)}
        </Typography>
      </CardContent>

      <Stack direction="row" spacing={1} sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() =>
            dispatch(addToCart({
              id: product.id, title: product.title, price: product.price, image: product.image, qty: 1
            }))
          }
        >
          Add To Cart
        </Button>
        <Button component={Link} to={`/product/${product.id}`} fullWidth>
          Quick View
        </Button>
      </Stack>
    </Card>
  );
}
