import { Button, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import redAvatar from "../img/redAvatar.png";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});
const defaultValues = {
  username: "",
};

const commonStyles = {
  bgcolor: "black", //"background.paper",
  m: 1,
  borderColor: "text.primary",
  width: "5rem",
  height: "5rem",
};

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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            name="username"
            type="submit"
            variant="contained"
            sx={{
              ...commonStyles,
              border: 1,
              backgroundColor: "blue",
              textAlign: "center",
            }}
          >
            Ha
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              ...commonStyles,
              border: 1,
              backgroundColor: "red",
              textAlign: "center",
            }}
          >
            Tam
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              ...commonStyles,
              border: 1,
              backgroundColor: "violet",
              textAlign: "center",
            }}
          >
            Thu
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              ...commonStyles,
              border: 1,
              backgroundColor: "orange",
              textAlign: "center",
            }}
          >
            Duong
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              ...commonStyles,
              border: 1,
              backgroundColor: "green",
              textAlign: "center",
            }}
          >
            Lien
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
