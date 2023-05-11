import LockIcon from "@mui/icons-material/Lock";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

export default function LoginAvatar({ user, handleClick }) {
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
        <Button style={{}} onClick={() => handleClick(user)}>
          <Avatar
            alt={user["username"]}
            src={process.env.PUBLIC_URL + user["imageUrl"]}
            variant="square"
            sx={{
              width: "5rem",
              height: "5rem",
            }}
          ></Avatar>
        </Button>
        <Typography textAlign={"center"}>{user["username"]}</Typography>
        {user["passcode"] ? <LockIcon></LockIcon> : ""}
      </Box>
    </>
  );
}
