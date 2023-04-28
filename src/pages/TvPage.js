import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";

import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import MovieFilter from "../components/MovieFilter";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";
import NavigationBar from "../components/NavigationBar";
import SlideShow from "../components/SlideShow";
import Simple from "../components/Simple";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import HeroSection from "../components/HeroSection";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function TvPage() {
  //const [genres, setGenres] = useState([]);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

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

  const {
    res: topRatedMoviesData,
    isLoading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => apiGet("/movie/top_rated"),
    onSuccess: (res) => {
      setTopRatedMovies(res.data["results"]);
    },
  });

  const {
    res: popularMoviesData,
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => apiGet("/movie/popular"),
    onSuccess: (res) => {
      setPopularMovies(res.data["results"]);
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

  const handleReset = () => {
    reset();
  };

  /*
  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          "/genre/movie/list?api_key=21f2bd24510391ba5a7b1c4bc9b38951"
        );
        setGenres(res.data["genres"]);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getGenres();
  }, []);
*/

  return (
    <QueryClientProvider client={queryClient}>
      <HeroSection title={"TV Page"}></HeroSection>
      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", height: 1 }}>
            {upcomingMoviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {upcomingMoviesError ? (
                  <Alert severity="error">{upcomingMoviesError}</Alert>
                ) : (
                  <>
                    <MovieList listName={"Upcoming"} movies={upcomingMovies} />
                  </>
                )}
              </>
            )}
          </Box>
          <Box sx={{ position: "relative", height: 1 }}>
            {topRatedMoviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {topRatedMoviesError ? (
                  <Alert severity="error">{topRatedMoviesError}</Alert>
                ) : (
                  <>
                    <MovieList listName={"Top Rated"} movies={topRatedMovies} />
                  </>
                )}
              </>
            )}
          </Box>
          <Box sx={{ position: "relative", height: 1 }}>
            {popularMoviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {popularMoviesError ? (
                  <Alert severity="error">{popularMoviesError}</Alert>
                ) : (
                  <>
                    <MovieList listName={"Popular"} movies={popularMovies} />
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

  // SORT BY
  /*
  if (sortBy === "featured") {
    filteredMovies = orderBy(movies, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
  }
  if (sortBy === "priceDesc") {
    filteredProducts = orderBy(products, ["price"], ["desc"]);
  }
  if (sortBy === "priceAsc") {
    filteredProducts = orderBy(products, ["price"], ["asc"]);
  }
  */

  // FILTER MOVIES
  if (filters.genre) {
    filteredMovies = movies.filter((movie) =>
      movie.genre_ids.includes(parseInt(filters.genre))
    );
  }

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
  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.original_title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
}

export default TvPage;
