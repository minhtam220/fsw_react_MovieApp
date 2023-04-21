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

const avatars = [
  { username: "Ha", isLocked: 0, imgageUrl: "/img/blue.jpg" },
  { username: "Tam", isLocked: 1, imgageUrl: "/img/blueangry.jpg" },
  { username: "Duong", isLocked: 0, imgageUrl: "/img/green.jpg" },
  { username: "Thu", isLocked: 0, imgageUrl: "/img/navi.jpg" },
  { username: "Lien", isLocked: 0, imgageUrl: "/img/violet.jpg" },
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

  const onSubmit = async (data) => {
    console.log(data);
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ minWidth: "350px" }}>
        <Typography variant="h4" textAlign="center">
          Who's watching
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <LoginAvatar
            username={"Ha"}
            isLocked={0}
            imageUrl={"/img/blue.jpg"}
          ></LoginAvatar>
          <LoginAvatar
            username={"Tam"}
            isLocked={1}
            imageUrl={"/img/blueangry.jpg"}
          ></LoginAvatar>
          <LoginAvatar
            username={"Duong"}
            isLocked={0}
            imageUrl={"/img/green.jpg"}
          ></LoginAvatar>
          <LoginAvatar
            username={"Thu"}
            isLocked={0}
            imageUrl={"/img/navi.jpg"}
          ></LoginAvatar>
          <LoginAvatar
            username={"Lien"}
            isLocked={0}
            imageUrl={"/img/violet.jpg"}
          ></LoginAvatar>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
