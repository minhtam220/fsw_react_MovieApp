//react
import React from "react";
//react router
import { useNavigate, useLocation } from "react-router-dom";
//hooks
import useAuth from "../hooks/useAuth";
//components
import LoginAvatar from "../components/LoginAvatar";
import { Login } from "@mui/icons-material";
// get users data
import { getPasscodeByUsername, getUsers } from "../data/users";
import { styled } from "@mui/material/styles";
import { Button, Stack, Typography, Box, Avatar } from "@mui/material";
import Logo from "../components/Logo";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import Modal from "@mui/material/Modal";

//const avatars = getAvatars();
const users = getUsers();

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  //left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [modalOpen, setModalopen] = useState(false);

  function handleClick(user) {
    if (user["passcode"]) {
      console.log("Passcode required");
      window.localStorage.setItem("username", user["username"]);
      window.localStorage.setItem("imageUrl", user["imageUrl"]);
      window.localStorage.setItem("list", []);
      navigate("/loginmodal");
    } else {
      console.log("No passcode required");
      auth.login(user["username"], () => {
        navigate("/");
      });
    }
  }

  if (window.localStorage.getItem("username")) {
    navigate("/");
  }

  const [passcode, setPasscode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle passcode submission
    let username = window.localStorage.getItem("username");
    if (passcode === getPasscodeByUsername(username)) {
      auth.login(username, () => {
        navigate("/");
      });
    } else {
      console.log("Wrong passcode");
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "350px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Logo></Logo>
      </Box>
      <Box sx={{}}>
        <Typography variant="h4" textAlign="center">
          Who's watching
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {users.map((user) => (
          <LoginAvatar
            key={user["username"]}
            user={user}
            handleClick={handleClick}
          ></LoginAvatar>
        ))}
      </Box>
    </Stack>
  );
}

export default LoginPage;
