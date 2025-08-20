import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useState } from "react";
import { Box, TextField, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";

export default function Checkout() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((a,i)=>a + i.price*i.qty, 0);

  const [form, setForm] = useState({ name:"", email:"", address:"" });
  const [placed, setPlaced] = useState(false);
  const onChange = (k)=>(e)=>setForm({...form, [k]: e.target.value});
  const validEmail = (e)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = (e)=>{
    
    e.preventDefault();
    if(!form.name.trim() || !validEmail(form.email) || form.address.trim().length<6){
      alert("Please enter a valid name, email and address.");
      return;
    }
    dispatch(clearCart());
    setPlaced(true);
  };

  if (placed) return <Typography variant="h5" color="success.main">Order placed successfully 🎉</Typography>;

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Order Summary</Typography>
        {items.map(it=>(
          <Stack key={it.id} direction="row" justifyContent="space-between" sx={{ my: 0.5 }}>
            <Typography noWrap>{it.title} × {it.qty}</Typography>
            <Typography>{formatCurrency(it.price*it.qty)}</Typography>
          </Stack>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" align="right">Total: {formatCurrency(total)}</Typography>
      </Paper>

      <Box component="form" onSubmit={submit} noValidate>
        <Typography variant="h6" sx={{ mb: 1 }}>Shipping Details</Typography>
        <Stack spacing={2} maxWidth={420}>
          <TextField label="Name" value={form.name} onChange={onChange("name")} required />
          <TextField label="Email" type="email" value={form.email} onChange={onChange("email")} required />
          <TextField label="Address" multiline rows={3} value={form.address} onChange={onChange("address")} required />
          <Button type="submit" variant="contained">Place Order</Button>
        </Stack>
      </Box>
    </Stack>
  );
}
