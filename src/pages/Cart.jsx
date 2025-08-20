import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty } from "../store/cartSlice";
import { Box, Typography, Grid, Card, CardContent, IconButton, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantitySelect from "../components/QuantitySelect";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((a,i)=>a + i.price * i.qty, 0);

  if (!items.length) return <Typography>Your cart is empty.</Typography>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Shopping Cart</Typography>
      <Grid container spacing={2}>
        {items.map(it => (
          <Grid item xs={12} key={it.id}>
            <Card>
              <CardContent sx={{ display:"flex", alignItems:"center", gap:2 }}>
                <img src={it.image} alt={it.title} style={{ height: 72, width: 72, objectFit: "contain" }} />
                <Typography sx={{ flex:1 }} noWrap>{it.title}</Typography>
                <Typography>{formatCurrency(it.price)}</Typography>
                <QuantitySelect value={it.qty} onChange={(v)=>dispatch(updateQty({ id: it.id, qty: v }))} max={10} />
                <Typography sx={{ width: 100, textAlign: "right" }}>
                  {formatCurrency(it.price * it.qty)}
                </Typography>
                <IconButton onClick={()=>dispatch(removeFromCart(it.id))}><DeleteIcon/></IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }} spacing={2} alignItems="center">
        <Typography variant="h6">Total: {formatCurrency(total)}</Typography>
        <Button variant="contained" component={Link} to="/checkout">Proceed to Checkout</Button>
      </Stack>
    </Box>
  );
}
