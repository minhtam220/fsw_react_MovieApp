import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import MovieSearch from "./MovieSearch";
import { FTextField } from "../form";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import Button from "@mui/material/Button";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function MainHeader() {
  let navigate = useNavigate();
  let location = useLocation();

  const { user } = useAuth();

  let auth = useAuth();

  function handleClick() {
    let from = location.state?.from?.pathname || "/login";
    auth.logout(() => {
      navigate(from);
    });
  }

  const defaultValues = {
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  const filters = watch();

  console.log(filters);

  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link
            to="/home"
            style={{ textDecoration: "none", color: "white", m: "10px" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Logo />
            </IconButton>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
            >
              <MovieSearch />
            </Stack>
          </FormProvider>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" color="inherit" component="div">
            Welcome {user?.username}!
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {user ? (
            <>
              <Link>
                <Button sx={{ color: "#fff" }} onClick={handleClick}>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            ""
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
