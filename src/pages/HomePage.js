import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";

import MovieList from "../components/MovieList";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterMovies = applyFilter(movies, filters);

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/movies");
        setMovies(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={filterMovies} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
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

  // FILTER PRODUCTS
  /*
  if (filters.gender.length > 0) {
    filteredProducts = products.filter((product) =>
      filters.gender.includes(product.gender)
    );
  }
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
    filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  */

  return filteredMovies;
}

export default HomePage;
