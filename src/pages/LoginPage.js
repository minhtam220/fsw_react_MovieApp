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

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});
const defaultValues = {
  username: "",
};

export const avatars = [
  { username: "Ha", passcode: null, imageUrl: "/img/blue.jpg" },
  { username: "Tam", passcode: "1234", imageUrl: "/img/blueangry.jpg" },
  { username: "Duong", passcode: "9999", imageUrl: "/img/green.jpg" },
  { username: "Thu", passcode: null, imageUrl: "/img/navi.jpg" },
  { username: "Lien", passcode: null, imageUrl: "/img/violet.jpg" },
];

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
  };

  return (
    <Stack spacing={3} sx={{ minWidth: "350px" }}>
      <Typography variant="h4" textAlign="center">
        Who's watching
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {avatars.map((avatar) => (
          <LoginAvatar
            username={avatar["username"]}
            passcode={avatar["passcode"]}
            imageUrl={avatar["imageUrl"]}
            onClick={
              avatar["passcode"]
                ? () => {
                    console.log("Enter passcode");
                  }
                : () => {
                    console.log("Logining passcode");
                  }
            }
          ></LoginAvatar>
        ))}
      </Box>
    </Stack>
  );
}

export default LoginPage;
