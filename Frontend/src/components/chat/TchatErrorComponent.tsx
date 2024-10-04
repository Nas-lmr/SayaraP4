import { Typography } from "@mui/material";

export function TchatErrorComponent({error}: { error: string }) {
  return <Typography color="error">Error: {error}</Typography>;
}