import { Alert, Button, Stack } from "@mui/material";
export default function ErrorState({ message="Something went wrong", onRetry }) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 6 }}>
      <Alert severity="error">{message}</Alert>
      {onRetry && <Button onClick={onRetry} variant="outlined">Retry</Button>}
    </Stack>
  );
}
