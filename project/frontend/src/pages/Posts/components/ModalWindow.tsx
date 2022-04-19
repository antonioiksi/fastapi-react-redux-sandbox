import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { Button, Stack } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <Stack spacing={2} direction="row" mt={2}>
          <TextField
            id="title"
            label="title"
            defaultValue={props.row.title}
            variant="outlined"
          />

          <TextField
            id="create_date"
            defaultValue={props.row.create_date}
            variant="outlined"
            type="date"
          />
          <TextField
            id="user_id"
            label="user id"
            defaultValue={props.row.user_id}
            variant="outlined"
          />
        </Stack>
        <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
          <TextField
            fullWidth
            id="text"
            label="text"
            defaultValue={props.row.text}
            variant="outlined"
            placeholder="Placeholder"
            multiline
          />
        </Stack>
        <Stack direction="row" justifyContent="space-around" spacing={2} mt={2}>
          <Button
            variant="outlined"
            color="error"
            size="large"
            startIcon={<CancelIcon />}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Применить
          </Button>
        </Stack>
      </Typography>
    </Box>
  );
}
