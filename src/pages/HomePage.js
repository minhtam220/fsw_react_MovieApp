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
    queryFn: () => apiGet("/genre/movie/list", "", ""),
  });

  //console.log(genresData.data["genres"]);

  //--- code for loading upcoming movie
  const {
    data: upcomingMoviesData,
    isLoading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => apiGet("/movie/upcoming"),
  });

  //console.log(upcomingMoviesData.data["results"]);

  //--- code for loading top rated movie
  const {
    data: topRatedMoviesData,
    isLoading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => apiGet("/movie/top_rated"),
  });

  //--- code for popular movie
  const {
    data: popularMoviesData,
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => apiGet("/movie/popular"),
  });

  //--- code for discover movie
  const [selectedGenre, setSelectedGenre] = useState("");

  const {
    data: discoverMoviesData,
    isLoading: discoverMoviesLoading,
    error: discoverMoviesError,
  } = useQuery({
    queryKey: ["discoverMovies", currentPage, selectedGenre],
    queryFn: () => apiGet("/discover/movie", "", currentPage, selectedGenre),
  });

  //--- code for filter movie
  /*
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const {
    data: filteredMoviesData,
    isLoading: filteredMoviesLoading,
    error: filteredMoviesError,
  } = useQuery({
    queryKey: ["filteredMovies", selectedGenre],
    queryFn: () => apiGet("/movie/popular", "", "", selectedGenre),
  });
  */

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
    queryFn: () => apiGet("/search/movie", searchTerm),
  });

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    handleSearch();
  };

  const handleSearch = debounce(() => {
    setSearchTerm(searchInput);
  }, 500);

  //--- code for select genre

  const handleSelectedGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    console.log(selectedGenre);
  };

  //--- code for api Get
  /*
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q");
    const sort = searchParams.get("sort");
    console.log("Search query:", q);
    console.log("Sort method:", sort);
  }, []);
  */

  const apiGet = (param, searchInput, currentPage, genre) => {
    /*
    if (searchInput !== "") {
      return apiService.get(
        param +
          "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" +
          "&language=us" +
          "&query=" +
          searchInput
      );
    } else if (currentPage !== 1) {
      return apiService.get(
        param +
          "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" +
          "&language=us" +
          "&page=" +
          currentPage
      );
    } else {
      return apiService.get(
        param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" + "&language=us"
      );
    }
    */

    switch (param) {
      case "/genre/movie/list":
        return apiService.get(
          param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951"
        );
      case "/movie/upcoming":
      case "/movie/top_rated":
      case "/movie/popular":
        return apiService.get(
          param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" + "&language=us"
        );
      case "/discover/movie":
        return apiService.get(
          param +
            "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" +
            "&language=us" +
            "&page=" +
            currentPage +
            "&with_genres=" +
            genre
        );
      case "/search/movie":
        return apiService.get(
          param +
            "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" +
            "&language=us" +
            "&query=" +
            searchInput
        );
      default:
        break;
    }
  };

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
          <Box sx={{ position: "relative", height: 1 }}>
            <Select value={selectedGenre} onChange={handleSelectedGenreChange}>
              {genres.map((item, index) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </Box>
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
