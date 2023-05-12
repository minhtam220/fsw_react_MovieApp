import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import React from "react";
import { FTextField } from "../form";

function MovieSearch() {
  return (
    <FTextField
      name="searchQuery"
      sx={{ width: "40vw", backgroundColor: "white" }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default MovieSearch;
