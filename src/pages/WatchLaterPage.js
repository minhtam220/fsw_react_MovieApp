import React from "react";
//materials
import { Box, Container, Stack } from "@mui/material";
//components
import MainHeader from "../components/MainHeader";
import MovieList from "../components/MovieList";
//api
//query
//routes
//data

export default function WatchLaterPage() {
  return (
    <>
      <Stack>
        <Box sx={{ maxWidth: 1920 }}>
          <MainHeader />
        </Box>
      </Stack>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", height: 1 }}>
            <MovieList
              listName={"Saved Movies"}
              movies={JSON.parse(window.localStorage.getItem("savedMovies"))}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
