import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//materials
import {
  Alert,
  Box,
  Container,
  Stack,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
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

/*
let savedMovies = [
  {
    adult: false,
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    belongs_to_collection: null,
    budget: 63000000,
    genres: [
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" },
      { id: 35, name: "Comedy" },
    ],
    homepage: "http://www.foxmovies.com/movies/fight-club",
    id: 550,
    imdb_id: "tt0137523",
    original_language: "en",
    original_title: "Fight Club",
    overview:
      'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
    popularity: 62.74,
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    production_companies: [
      {
        id: 508,
        logo_path: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
        name: "Regency Enterprises",
        origin_country: "US",
      },
      {
        id: 711,
        logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
        name: "Fox 2000 Pictures",
        origin_country: "US",
      },
      {
        id: 20555,
        logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
        name: "Taurus Film",
        origin_country: "DE",
      },
      {
        id: 54051,
        logo_path: null,
        name: "Atman Entertainment",
        origin_country: "",
      },
      {
        id: 54052,
        logo_path: null,
        name: "Knickerbocker Films",
        origin_country: "US",
      },
      {
        id: 4700,
        logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
        name: "The Linson Company",
        origin_country: "US",
      },
      {
        id: 25,
        logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
        name: "20th Century Fox",
        origin_country: "US",
      },
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
    ],
    release_date: "1999-10-15",
    revenue: 100853753,
    runtime: 139,
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" },
    ],
    status: "Released",
    tagline: "Mischief. Mayhem. Soap.",
    title: "Fight Club",
    video: false,
    vote_average: 8.433,
    vote_count: 26341,
  },
];
*/

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
              <Box sx={{ position: "relative", height: 1 }}>
                <MovieList
                  listName={"Saved Movies"}
                  movies={JSON.parse(
                    window.localStorage.getItem("savedMovies")
                  )}
                />
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}
