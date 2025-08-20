import { Container, Box } from "@mui/material";
import OfferBar from "./components/OfferBar";
import Navbar from "./components/Navbar";
import AppRoutes from "./router";

export default function App() {
  return (
    <Box>
      <OfferBar />
      <Navbar />
      <Container sx={{ py: 3 }}>
        <AppRoutes />
      </Container>
    </Box>
  );
}
