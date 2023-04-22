import { Button, Stack, Typography, Box, Avatar } from "@mui/material";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";

export default function LoginAvatar({
  username,
  passcode,
  imageUrl,
  handleClick,
}) {
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
        <Button style={{}} onClick={() => handleClick(username, passcode)}>
          <Avatar
            alt={username}
            src={process.env.PUBLIC_URL + imageUrl}
            variant="square"
            sx={{
              width: "5rem",
              height: "5rem",
            }}
          ></Avatar>
        </Button>

        <Typography textAlign={"center"}>{username}</Typography>
        {passcode ? <LockIcon></LockIcon> : ""}
      </Box>
    </>
  );
}
