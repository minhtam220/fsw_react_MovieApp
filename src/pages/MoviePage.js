import React, { useState, useEffect } from "react";
//materials
import { Alert, Box, Container, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//components
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import MovieFilter from "../components/MovieFilter";
import LoadingScreen from "../components/LoadingScreen";
import NavigationBar from "../components/NavigationBar";
import SlideShow from "../components/SlideShow";
import Simple from "../components/Simple";

import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";

import HeroSection from "../components/HeroSection";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function MoviePage() {
  //code to generate the select genres
  const [genres, setGenres] = useState([]);

  const {
    res: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => apiGet("/genre/movie/list"),
    onSuccess: (res) => {
      setGenres(res.data["genres"]);
    },
  });

  //code to generate the movie list
  const [movies, setMovies] = useState([]);

  const {
    res: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => apiGet("/movie/popular"),
    onSuccess: (res) => {
      setMovies(res.data["results"]);
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

  //making the select genres working
  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;

  const filters = watch();
  const filteredMovies = applyFilter(movies, filters);

  const handleReset = () => {
    reset();
  };

  const [genre, setGenre] = React.useState("Action");

  const handleChange = (event) => {
    console.log(event.target.value);
    setGenre(event.target.value);
    console.log("the current genre is " + genre);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HeroSection title={"Movie Page"} />
      <FormProvider methods={methods}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={28}
            label={"Action"}
            onChange={handleChange}
          >
            {genres.map((item, index) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormProvider>

      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", height: 1 }}>
            {moviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {moviesError ? (
                  <Alert severity="error">{moviesError}</Alert>
                ) : (
                  <>
                    <MovieList listName={genre} movies={filteredMovies} />
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </QueryClientProvider>
  );
}

function applyFilter(movies, filters) {
  const { sortBy } = filters;
  let filteredMovies = movies;

  console.log(filteredMovies);

  // FILTER MOVIES
  if (filters.genre) {
    filteredMovies = movies.filter((movie) =>
      //movie.genre_ids.includes(parseInt(filters.genre))
      movie.genre_ids.includes(parseInt(28))
    );
  }

  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.original_title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase())
    );
  }

  console.log(filteredMovies);

  //console.log("filter is working");

  //console.log(filteredMovies);

  return filteredMovies;

  /*
  if (filters.category !== "All") {
    filteredProducts = products.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters.priceRange) {
    filteredProducts = products.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 25;
      }
      if (filters.priceRange === "between") {
        return product.price >= 25 && product.price <= 75;
      }
      return product.price > 75;
    });
  }
  */
}

export default MoviePage;
