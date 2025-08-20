import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Box,
} from "@mui/material";

// Carousel imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const dispatch = useDispatch();
  const { items, categories, status, error } = useSelector((s) => s.products);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
    if (!categories.length) dispatch(fetchCategories());
  }, [dispatch, status, categories.length]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(
      (p) =>
        (!q || p.title.toLowerCase().includes(q)) && (!cat || p.category === cat)
    );
  }, [items, search, cat]);

  if (status === "loading") return <Loader />;
  if (status === "failed")
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchProducts())}
      />
    );

  // Banner Data 
  const bannerImages = [
    {
      id: 1,
      img: "https://cdn.nuawoman.com/global/img/homepage/07-04-25/brand_campaign_desktop.webp",
    },
    {
      id: 2,
      img: "https://cdn.nuawoman.com/global/img/homepage/07-04-25/dpp_offer_desktop.webp",
    },
    {
      id: 3,
      img: "https://cdn.nuawoman.com/global/img/homepage/banners/skin-care-homepage-desktop.webp",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000, 
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      {/* Top Strip */}
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography variant="body1" sx={{ color: "error.main", fontWeight: 600 }}>
          The safest choice for over 15 Lakh women!
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f3e5f5",
            color: "#000",
            py: 1,
            px: 2,
            display: "inline-block",
            borderRadius: "8px",
            mt: 1,
          }}
        >
          <Typography variant="body2">
            Shop for Rs 1000 to unlock Silver tier rewards, which means{" "}
            <strong>5% off on every order!</strong>
          </Typography>
        </Box>
      </Box>

      {/* Banner Carousel */}
      <Box sx={{ mb: 4 }}>
        <Slider {...sliderSettings}>
          {bannerImages.map((banner) => (
            <Box key={banner.id}>
              <img
                src={banner.img}
                alt={`banner-${banner.id}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Product Section */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Bestsellers
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {filtered.map((p) => (
          <Grid key={p.id} item xs={12} sm={6} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
