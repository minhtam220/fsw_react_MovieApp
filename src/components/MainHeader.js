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
import { useState } from "react";

import { alpha, styled, CssBaseline, InputBase } from "@mui/material";
import logoImg from "../logo.png";
import { Avatar } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function MainHeader({
  searchInput,
  handleSearchInputChange,
  handleSearchInputSubmit,
}) {
  let navigate = useNavigate();
  let location = useLocation();

  const { user } = useAuth();

  let auth = useAuth();

  function handleLogout() {
    let from = location.state?.from?.pathname || "/login";
    auth.logout(() => {
      navigate(from);
    });
  }

  /*
  const defaultValues = {
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  //const filters = watch();

  //console.log(filters);

  /*
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  */

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
              <Logo sx={{ width: "64px" }} />
            </IconButton>
          </Link>
        </Box>

        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={handleSearchInputChange}
                onSubmit={handleSearchInputSubmit}
              />
            </Search>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" color="inherit" component="div">
            Welcome {user?.username}!
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={window.localStorage.getItem("imageUrl")}
            alt="avatar"
            width="64px"
          />
        </Box>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {user ? (
            <>
              <Link>
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
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
