import { useState, useEffect } from "react";
import React from "react";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContentCutOutlined } from "@mui/icons-material";

export default function Message(props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      props.setOpenmsg(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!props.showing) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={props.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.Message}
        </Alert>
      </Collapse>
    </Box>
  );
}
