import React, { useState, useEffect } from "react";
//materials
import { Alert, Box, Container, Stack } from "@mui/material";
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

const queryClient = new QueryClient();

//videos for hero section
const heroVideos = [
  {
    id: 0,
    title: "Breaking Bad",
    url: "/videos/Breaking Bad by Balenciaga.mp4",
  },
  {
    id: 1,
    title: "Harry Potter",
    url: "/videos/Harry Potter by Balenciaga 3.mp4",
  },
  {
    id: 2,
    title: "Lord of the Rings",
    url: "/videos/Lord of the Rings by Balenciaga.mp4",
  },
];

function HomePage() {
  const debugMode = 1;
  //randomly select a hero video
  let randomIndex = Math.floor(Math.random() * heroVideos.length);
  let heroVideo = heroVideos[randomIndex];

  //loading upcoming movie
  const {
    data: upcomingMoviesData,
    isLoading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => apiGet("/movie/upcoming"),
  });

  //loading top rated movie
  /*
  const {
    data: topRatedMoviesData,
    isLoading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => apiGet("/movie/top_rated"),
  });
  */

  const apiGet = (param) => {
    return apiService.get(param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951");
  };

  /*
  const defaultValues = {
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  const filters = watch();

  console.log(filters);
  

  //const filterMovies = applyFilter(movies, filters);

  const handleReset = () => {
    reset();
  };



  */

  return (
    <>
      <Stack>
        <Box sx={{ maxWidth: 1920 }}>
          <MainHeader />
        </Box>
        <Box sx={{ maxWidth: 1920 }}>
          <HeroSection video={heroVideo} />
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
            {upcomingMoviesLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {upcomingMoviesError ? (
                  <Alert severity="error">{upcomingMoviesError}</Alert>
                ) : (
                  <>
                    <MovieList
                      listName={"Upcoming"}
                      movies={upcomingMoviesData.data["results"]}
                    />
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

/*
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
/*
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
  
  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.original_title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
}
*/

export default HomePage;
