import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPasscodeByUsername } from "../data/users";
import useAuth from "../hooks/useAuth";

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

export default function LoginPage() {
  let navigate = useNavigate();
  let auth = useAuth();

  const classes = useStyles();
  const [error, setError] = useState("");

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  // create an array of refs for each input field

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  // create a state variable to store the values of all text fields

  function handleKeyDown(event, index) {
    if (event.key >= "0" && event.key <= "9") {
      // if a digit is entered
      event.preventDefault();
      // prevent the default behavior of entering the digit in the input field
      console.log("Key pressed:", event.key);
      const newPasscode = [...passcode];
      newPasscode[index] = event.key;
      console.log("passcode[0]:", passcode[0]);
      console.log("passcode[1]:", passcode[1]);
      console.log("passcode[2]:", passcode[2]);
      console.log("passcode[3]:", passcode[3]);
      console.log("newPasscode", newPasscode);
      setPasscode(newPasscode);

      if (index < inputRefs.length - 1) {
        //the current input field is not the last one
        inputRefs[index + 1].current.focus();
        // move the focus to the next input field
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle passcode submission
    let username = window.localStorage.getItem("username");

    if (passcode.join("") === getPasscodeByUsername(username)) {
      auth.login(username, () => {
        navigate("/");
      });
    } else {
      setError("Wrong passcode");
      setPasscode(["", "", "", ""]);
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ backgroundColor: "white", height: "1rem" }} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <img
          src={window.localStorage.getItem("imageUrl")}
          alt="avatar"
          width="125vw"
        />
      </Box>
      <Box sx={{ backgroundColor: "white", height: "1rem" }} />
      <Box sx={{ backgroundColor: "white" }}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "black" }}>
          Please enter the passcode
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "white", height: "1rem" }} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: `20px`,
                    height: `20px`,
                    fontSize: `35px`,
                    textAlign: `center`,
                  },
                }}
                inputRef={inputRefs[0]}
                onKeyDown={(event) => handleKeyDown(event, 0)}
                value={passcode[0]}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: `20px`,
                    height: `20px`,
                    fontSize: `35px`,
                    textAlign: `center`,
                  },
                }}
                inputRef={inputRefs[1]}
                onKeyDown={(event) => handleKeyDown(event, 1)}
                value={passcode[1]}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: `20px`,
                    height: `20px`,
                    fontSize: `35px`,
                    textAlign: `center`,
                  },
                }}
                inputRef={inputRefs[2]}
                onKeyDown={(event) => handleKeyDown(event, 2)}
                value={passcode[2]}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: `20px`,
                    height: `20px`,
                    fontSize: `35px`,
                    textAlign: `center`,
                  },
                }}
                inputRef={inputRefs[3]}
                onKeyDown={(event) => handleKeyDown(event, 3)}
                value={passcode[3]}
              />
            </Grid>
          </Grid>
          <Box sx={{ backgroundColor: "white", height: "1rem" }} />
          <Button
            variant="contained"
            className={classes.submitButton}
            type="submit"
            onClick={(event) => handleSubmit(event)}
          >
            Login
          </Button>
          <Box sx={{ backgroundColor: "white", height: "1rem" }} />
          {error ? <Alert severity="error">{error}</Alert> : ""}
        </form>
      </Box>
      <Box sx={{ backgroundColor: "white", height: "10rem" }} />
    </Stack>
  );
}
