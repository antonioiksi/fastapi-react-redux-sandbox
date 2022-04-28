import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { Button, Stack } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { changePost, deletePost } from "../../../api/post";
import { useLocation } from "react-router";
import { addEvent } from "../../../api/event";

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
  const [textfield_title, settextfield_title] = React.useState(props.row.title);
  // TODO: дата из бд приходит с минутами и секундами
  const [textfield_create_date, settextfield_create_date] = React.useState(
    props.row.create_date.split("T")[0]
  );
  const [textfield_user_id, settextfield_user_id] = React.useState(
    props.row.user_id
  );
  const [textfield_text, settextfield_text] = React.useState(props.row.text);

  const handleTitleInputChange = (event) => {
    settextfield_title(event.target.value);
  };
  const handleCreateDateInputChange = (event) => {
    settextfield_create_date(event.target.value);
  };
  const handleUserIdInputChange = (event) => {
    settextfield_user_id(event.target.value);
  };
  const handleTextInputChange = (event) => {
    settextfield_text(event.target.value);
  };

  const Alert = async (type, text) => {
    await addEvent(localStorage.getItem("token"), text);

    props.setOpenmsg(true);
    props.setTextmsg(text);
    props.setTypemsg(type);
  };

  const handleChangePost = async () => {
    changePost(
      props.row.id,
      textfield_title,
      textfield_text,
      textfield_create_date
    );

    let data = await props.getPosts(
      props.rowsPerPage,
      props.page * props.rowsPerPage,
      props.column
    );

    props.settableData(data);

    Alert("success", "Row " + props.row.id + " successful change");

    props.SetOpen(false);
  };

  const handleExit = async () => {
    await deletePost(props.row.id);

    let data = await props.getPosts(
      props.rowsPerPage,
      props.page * props.rowsPerPage,
      props.column
    );

    props.settableData(data);

    Alert("error", "Row " + props.row.id + " successful delete");

    props.SetOpen(false);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Stack spacing={2} direction="row" mt={2}>
            <TextField
              id="title"
              label="title"
              variant="outlined"
              value={textfield_title}
              onChange={handleTitleInputChange}
            />

            <TextField
              id="create_date"
              variant="outlined"
              type="date"
              value={textfield_create_date}
              onChange={handleCreateDateInputChange}
            />
            <TextField
              id="user_id"
              label="user id"
              variant="outlined"
              value={textfield_user_id}
              onChange={handleUserIdInputChange}
            />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
            <TextField
              fullWidth
              id="text"
              label="text"
              variant="outlined"
              placeholder="Placeholder"
              value={textfield_text}
              onChange={handleTextInputChange}
              multiline
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-around"
            spacing={2}
            mt={2}
          >
            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<CancelIcon />}
              onClick={handleExit}
            >
              Удалить
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleChangePost}
            >
              Применить
            </Button>
          </Stack>
        </Typography>
      </Box>
    </Stack>
  );
}
