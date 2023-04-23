import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import useAuth from "../hooks/useAuth";
import { getPasscode } from "../data";

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

export default function LoginModal() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const classes = useStyles();
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle passcode submission
    let username = window.localStorage.getItem("username");
    if (passcode === getPasscode(username)) {
      let from = location.state?.from?.pathname || "/login";
      auth.login(username, () => {
        navigate(from);
      });
    } else {
      console.log("Wrong passcode");
    }
  };

  return (
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
        Submit
      </Button>
    </form>
  );
}
