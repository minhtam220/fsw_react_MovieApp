API Samples
Genres
https://api.themoviedb.org/3/genre/movie/list?api_key=21f2bd24510391ba5a7b1c4bc9b38951

Get movies
https://api.themoviedb.org/3/movie/upcoming?api_key=21f2bd24510391ba5a7b1c4bc9b38951
https://api.themoviedb.org/3/movie/top_rated?api_key=21f2bd24510391ba5a7b1c4bc9b38951
https://api.themoviedb.org/3/movie/popular?api_key=21f2bd24510391ba5a7b1c4bc9b38951

Get movies with pagination
https://api.themoviedb.org/3/movie/popular?api_key=21f2bd24510391ba5a7b1c4bc9b38951&page=XXX

Search movies
https://api.themoviedb.org/3/search/movie?api_key=21f2bd24510391ba5a7b1c4bc9b38951&query=XXXX

const apiGet = (param, searchInput, currentPage) => {

switch(param) {
  case "/genre/movie":
  case "/movie/upcoming":
  case "/movie/top_rated":
    return apiService.get(
        param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" + "&language=us"
      );
    break;
  case "/movie/popular":
    return apiService.get(
        param + "?api_key=21f2bd24510391ba5a7b1c4bc9b38951" + "&language=us" + "&page=" +
          currentPage
      );
    break;
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

    if (param === "/search/movie") {
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
  };



                  <Route path="home" element={<HomePage />} />
        <Route path="tv" element={<TvPage />} />
        <Route path="movie" element={<MoviePage />} />


        {{params['pageid'] === 'tv' ? videos[3]:videos[0]}}></HeroSection>


         
      </Route>


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


                <HeroContent>
        <Typography variant="h1" component="h1">
          {video.title}
        </Typography>
      </HeroContent>


      <Routes>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/concat" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/loginmodal" element={<LoginModal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route exact path="/home" element={<HomePage />}>
        
        <Route path="home" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Route>
    </Routes>


