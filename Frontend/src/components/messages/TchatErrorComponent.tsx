import { Typography } from "@mui/material";

function TchatErrorComponent({error}: { error: string }) {
  return <Typography color="error">Error: {error}</Typography>;
}

export default TchatErrorComponent;
