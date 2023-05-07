import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//materials
import { Alert, Box, Container, Stack, Select, MenuItem } from "@mui/material";
//components
import MainHeader from "../components/MainHeader";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import MoviePagination from "../components/MoviePagination";
//api
import apiService from "../app/apiService";
//query
import { useQuery } from "react-query";
//routes
import debounce from "lodash.debounce";
//data
import getGenres from "../data/genres";
import getHeroVideos from "../data/heroVideos";

//videos for hero section
const heroVideos = getHeroVideos();

export default function HomePage() {
  //--- code for randomly select a hero video
  let randomIndex = Math.floor(Math.random() * heroVideos.length);
  let heroVideo = heroVideos[randomIndex];

  //--- code for pagination
  let [currentPage, setCurrentPage] = useState(1);

  //--- code for genres
  let genres = getGenres();

  //let genres = genresData.data["genres"];

  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiService.get("/genre/movie/list", {
        params: {},
      }),
  });

  //let genres = genresData.data["genres"];

  //console.log(genresData.data["genres"]);

  //--- code for loading upcoming movie
  const {
    data: upcomingMoviesData,
    isLoading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () =>
      apiService.get("/movie/upcoming", {
        params: {},
      }),
  });

  //--- code for loading top rated movie
  const {
    data: topRatedMoviesData,
    isLoading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () =>
      apiService.get("/movie/top_rated", {
        params: {},
      }),
  });

  //--- code for popular movie
  const {
    data: popularMoviesData,
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      apiService.get("/movie/popular", {
        params: {},
      }),
  });

  //--- code for discover movie
  const [selectedGenre, setSelectedGenre] = useState("");

  const {
    data: discoverMoviesData,
    isLoading: discoverMoviesLoading,
    error: discoverMoviesError,
  } = useQuery({
    queryKey: ["discoverMovies", currentPage, selectedGenre],
    queryFn: () =>
      apiService.get("/discover/movie", {
        params: {
          page: currentPage,
          with_genres: selectedGenre,
        },
      }),
  });

  //--- code for select genre
  const handleSelectedGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  //--- code for search
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchedMoviesData,
    isLoading: searchedMoviesLoading,
    error: searchedMoviesError,
  } = useQuery({
    queryKey: ["searchedMovies", searchTerm],
    queryFn: () =>
      apiService.get("/search/movie", {
        params: {
          query: searchTerm,
        },
      }),
  });

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    handleSearch();
  };

  const handleSearch = debounce(() => {
    setSearchTerm(searchInput);
  }, 500);

  // now do something with the data
  //let genres = genresData.data["genres"];

  // console.log(genresData.data["genres"]);
  //console.log(upcomingMoviesData.data["results"]);

  return (
    <>
      <Stack>
        <Box sx={{ maxWidth: 1920 }}>
          <MainHeader
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
          />
        </Box>
        {searchInput ? (
          <></>
        ) : (
          <Box sx={{ maxWidth: 1920 }}>
            <HeroSection video={heroVideo} />
          </Box>
        )}
      </Stack>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          {searchInput ? (
            <Box sx={{ position: "relative", height: 1 }}>
              {searchedMoviesLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  {searchedMoviesError ? (
                    <Alert severity="error">{searchedMoviesError}</Alert>
                  ) : (
                    <>
                      <MovieList
                        listName={"Search Results"}
                        movies={searchedMoviesData.data["results"]}
                      />
                    </>
                  )}
                </>
              )}
            </Box>
          ) : (
            <>
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
                          movies={upcomingMoviesData.data["results"].slice(
                            0,
                            4
                          )}
                        />
                      </>
                    )}
                  </>
                )}
                {topRatedMoviesLoading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {topRatedMoviesError ? (
                      <Alert severity="error">{topRatedMoviesError}</Alert>
                    ) : (
                      <>
                        <MovieList
                          listName={"Top Rated"}
                          movies={topRatedMoviesData.data["results"].slice(
                            0,
                            4
                          )}
                        />
                      </>
                    )}
                  </>
                )}
                {popularMoviesLoading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {popularMoviesError ? (
                      <Alert severity="error">{popularMoviesError}</Alert>
                    ) : (
                      <>
                        <MovieList
                          listName={"Popular"}
                          movies={popularMoviesData.data["results"].slice(0, 4)}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
              <Box sx={{ position: "relative", height: 1 }}>
                <Select
                  value={selectedGenre}
                  onChange={handleSelectedGenreChange}
                >
                  {genres.map((item, index) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
                {discoverMoviesLoading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {discoverMoviesError ? (
                      <Alert severity="error">{discoverMoviesError}</Alert>
                    ) : (
                      <>
                        <MovieList
                          listName={"All Movies" + selectedGenre}
                          movies={discoverMoviesData.data["results"]}
                        />
                        <MoviePagination
                          pageCount={
                            discoverMoviesData
                              ? discoverMoviesData.data["total_pages"]
                              : 1
                          }
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
            </>
          )}
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
