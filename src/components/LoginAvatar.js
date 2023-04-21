import { Button, Stack, Typography, Box, Avatar } from "@mui/material";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";

export default function LoginAvatar({ username, passcode, imageUrl }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 3,
          borderColor: "white",
          "&:hover": {
            borderColor: "black",
          },
        }}
      >
        <Avatar
          alt={username}
          src={process.env.PUBLIC_URL + imageUrl}
          variant="square"
          sx={{
            width: "5rem",
            height: "5rem",
          }}
        ></Avatar>
        <Typography textAlign={"center"}>{username}</Typography>
        {passcode ? <LockIcon></LockIcon> : ""}
      </Box>
    </>
  );
}
