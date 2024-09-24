import {Box, Button, TextField} from "@mui/material";

function FormComponent({newMessage, onChangeCallback, onClickCallback}: {newMessage: string; onChangeCallback: any; onClickCallback: any}) {
  return (
    <Box mt={2}>
      <TextField
        fullWidth
        value={newMessage}
        onChange={onChangeCallback}
        placeholder="Type a message"
      />
      <Button variant="contained" color="primary" onClick={onClickCallback} style={{ marginTop: '10px' }}>
        Send
      </Button>
    </Box>
  );
}

export default FormComponent;
