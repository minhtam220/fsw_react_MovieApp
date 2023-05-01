import React, { useState, useEffect } from "react";
//materials
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
//components
import MainHeader from "../components/MainHeader";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import MovieFilter from "../components/MovieFilter";
import LoadingScreen from "../components/LoadingScreen";
import NavigationBar from "../components/NavigationBar";
import SlideShow from "../components/SlideShow";
import Simple from "../components/Simple";
import HeroSection from "../components/HeroSection";
//forms
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
//api
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
//query
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
//routes
import { Link as RouterLink, useParams } from "react-router-dom";

function SearchPage() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const {
    res: upcomingMoviesData,
    isLoading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => apiGet("/movie/upcoming"),
    onSuccess: (res) => {
      setUpcomingMovies(res.data["results"]);
    },
  });

  const apiGet = (param) => {
    return apiService.get(param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951");
  };

  const defaultValues = {
    genre: [],
    sortBy: "featured",
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;

  /*
  const filters = watch();
  const filterMovies = applyFilter(movies, filters);
  */

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
          <Typography>Search Page</Typography>
          <Box sx={{ position: "relative", height: 1 }}>
            {upcomingMoviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {upcomingMoviesError ? (
                  <Alert severity="error">{upcomingMoviesError}</Alert>
                ) : (
                  <>
                    <MovieList listName={"Search"} movies={upcomingMovies} />
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

function applyFilter(movies, filters) {
  const { sortBy } = filters;
  let filteredMovies = movies;

  // FILTER MOVIES
  if (filters.genre) {
    filteredMovies = movies.filter((movie) =>
      movie.genre_ids.includes(parseInt(filters.genre))
    );
  }

  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.original_title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
}

export default SearchPage;
