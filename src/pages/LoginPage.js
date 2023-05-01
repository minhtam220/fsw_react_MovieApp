import { Button, Stack, Typography, Box, Avatar } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LoginAvatar from "../components/LoginAvatar";
import { Login } from "@mui/icons-material";
import { getAvatars } from "../data";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";

const avatars = getAvatars();

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  //left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

/*
const commonStyles = {
  bgcolor: "black", //"background.paper",
  m: 1,
  borderColor: "text.primary",
  width: "5rem",
  height: "5rem",
  "&:hover": {
    borderColor: "white",
    border: 3,
  },
};*/

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  /*
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  function handleClick() {}

  const onSubmit = async (data) => {
    
    console.log(data);
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };*/

  function handleClick(username, passcode) {
    if (passcode) {
      console.log("Passcode required");
      window.localStorage.setItem("username", username);
      navigate("/loginmodal");
    } else {
      console.log("No passcode required");
      auth.login(username, () => {
        navigate("/");
      });
    }
  }

  if (window.localStorage.getItem("username")) {
    navigate("/");
  }

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
        {avatars.map((avatar) => (
          <LoginAvatar
            key={avatar["username"]}
            username={avatar["username"]}
            passcode={avatar["passcode"]}
            imageUrl={avatar["imageUrl"]}
            handleClick={handleClick}
          ></LoginAvatar>
        ))}
      </Box>
    </Stack>
  );
}

export default LoginPage;
