import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import useAuth from "../hooks/useAuth";
import { getPasscodeByUsername } from "../data/users";
import Logo from "../components/Logo";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  inputField: {
    width: 200,
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    backgroundColor: "#e50914",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#d4000f",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const classes = useStyles();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle passcode submission
    let username = window.localStorage.getItem("username");
    if (passcode === getPasscodeByUsername(username)) {
      auth.login(username, () => {
        navigate("/");
      });
    } else {
      setError("Wrong passcode");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <img
          src={window.localStorage.getItem("imageUrl")}
          alt="avatar"
          width="125vw"
        />
      </Box>
      <Box sx={{}}>
        <Typography variant="h4" textAlign="center">
          Please enter the passcode (1234 or 9999)
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <TextField
            label="Enter your 4-digit code"
            type="password"
            InputProps={{
              inputProps: { min: 0, max: 9999, maxLength: 4 },
              inputMode: "numeric",
            }}
            variant="outlined"
            className={classes.inputField}
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            required
          />
          <Button
            variant="contained"
            className={classes.submitButton}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
      <Box sx={{}}>
        <Alert severity="error">{error ? error : ""}</Alert>
      </Box>
    </>
  );
}
