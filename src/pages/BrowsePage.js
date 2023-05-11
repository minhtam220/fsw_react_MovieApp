//react
import React from "react";
//react router
import { useNavigate } from "react-router-dom";
//hooks
import useAuth from "../hooks/useAuth";
//components
import LoginAvatar from "../components/LoginAvatar";

// get users data
import { Box, Stack, Typography, Grid } from "@mui/material";
import { getUsers } from "../data/users";

const users = getUsers();

/*
const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  //left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));
*/

export default function BrowsePage() {
  let navigate = useNavigate();
  //let location = useLocation();
  let auth = useAuth();

  function handleClick(user) {
    if (user["passcode"]) {
      console.log("Passcode required");
      window.localStorage.setItem("username", user["username"]);
      window.localStorage.setItem("imageUrl", user["imageUrl"]);
      navigate("/login");
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

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ backgroundColor: "white", height: "1rem" }} />
      <Box sx={{ backgroundColor: "white" }}>
        <Typography variant="h4" sx={{ textAlign: "center", color: "black" }}>
          Who's watching?
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
          <Grid item xs md>
            <Box sx={{ backgroundColor: "white", height: "1rem" }} />
          </Grid>
          {users.map((user) => (
            <Grid item xs={12} md={1}>
              <LoginAvatar
                key={user["username"]}
                user={user}
                handleClick={handleClick}
              ></LoginAvatar>
            </Grid>
          ))}
          <Grid item xs md>
            <Box sx={{ backgroundColor: "white", height: "10rem" }} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "white", height: "10rem" }} />
    </Stack>
  );
}
