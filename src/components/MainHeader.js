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
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function MainHeader() {
  const { user } = useAuth();

  const defaultValues = {
    genre: [],
    sortBy: "featured",
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;

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
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
