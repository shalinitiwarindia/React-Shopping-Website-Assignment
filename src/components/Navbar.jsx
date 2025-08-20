import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, Button, Menu, MenuItem
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const cartCount = useSelector(s => s.cart.items.reduce((a,i)=>a+i.qty,0));
  const [anchor, setAnchor] = useState(null);

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "primary.main", fontWeight: 800, fontSize: 24 }}
        >
          nua•
        </Typography>

        <Button color="inherit" endIcon={<ExpandMoreIcon />} onClick={(e)=>setAnchor(e.currentTarget)}>
          Sanitary Pads & Liners
        </Button>
        <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={()=>setAnchor(null)}>
          <MenuItem onClick={()=>setAnchor(null)}>All</MenuItem>
          <MenuItem onClick={()=>setAnchor(null)}>Popular</MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/" color="inherit">Shop All</Button>
        <Button component={Link} to="/checkout" color="inherit">Checkout</Button>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge color="primary" badgeContent={cartCount}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
