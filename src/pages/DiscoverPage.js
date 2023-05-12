import React, { useState } from "react";
//materials
import { Alert, Box, Container, MenuItem, Select, Stack } from "@mui/material";
//components
import HeroSection from "../components/HeroSection";
import LoadingScreen from "../components/LoadingScreen";
import MainHeader from "../components/MainHeader";
import MovieList from "../components/MovieList";
import MoviePagination from "../components/MoviePagination";
import MainFooter from "../components/MainFooter";
//api
import apiService from "../app/apiService";
//query
import { useQuery } from "react-query";
//routes
import debounce from "lodash.debounce";
//data
import getGenres from "../data/genres";

export default function DiscoverPage() {
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
  //console.log("upcomingMoviesData " + upcomingMoviesData.data["results"]);

  //console.log("savedMovies " + savedMovies);

  return (
    <>
      <Stack>
        <Box sx={{ maxWidth: 1920 }}>
          <MainHeader
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
          />
        </Box>
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
                Please select a genre{" "}
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
                          listName={"Results"}
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
      <Stack>
        <Box sx={{ maxWidth: 1920 }}>
          <MainFooter />
        </Box>
      </Stack>
    </>
  );
}
