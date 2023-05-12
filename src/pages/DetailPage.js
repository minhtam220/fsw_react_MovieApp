import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";

/*
let savedMovies = localStorage.getItem("savedMovies")
  ? JSON.parse(localStorage.getItem("savedMovies"))
  : [];
  */

function DetailPage() {
  const params = useParams();
  const [movie, setMovie] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detailMovie", params.id],
    queryFn: () => apiService.get(`/movie/${params.id}`),
    onSuccess: (movieData) => {
      //console.log("before setMovie ");
      setMovie(movieData.data);
    },
  });

  useEffect(() => {
    // Perform side effect here
    let savedMovies = JSON.parse(window.localStorage.getItem("savedMovies"));
    //console.log("const savedMovies " + savedMovies);
    let isObjectInArray = savedMovies.some(
      (obj) => JSON.stringify(obj) === JSON.stringify(movie)
    );

    if (isObjectInArray) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [movie]);

  //setMovie(detailMovieData);

  const handleClick = () => {
    // Handle passcode submission
    //console.log(movie);
    //savedMovies.push(movie);
    //console.log(savedMovies);
    //retrieve the current savedMovies from local storage as an array of objects
    const savedMovies = JSON.parse(window.localStorage.getItem("savedMovies"));

    if (!isSaved) {
      //check if savedMovies is null, and initialize to an empty array if it is
      if (!savedMovies) {
        savedMovies = [];
      }
      //push the movie to it
      savedMovies.push(movie);
      //save the array as string in local storage
      window.localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      setIsSaved(true);
    } else {
      //remove the movie from the list
      const newSavedMovies = savedMovies.filter((item) => item.id !== movie.id);

      //save the array as string in local storage
      window.localStorage.setItem(
        "savedMovies",
        JSON.stringify(newSavedMovies)
      );

      setIsSaved(false);
    }
  };

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">{movie.original_title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={
                                "https://image.tmdb.org/t/p/w500/" +
                                movie.backdrop_path
                              }
                              alt="movie"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" paragraph>
                          {movie.original_title}
                        </Typography>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={movie.overview}
                          />
                        </Box>
                      </Grid>
                      {}
                      <Button variant="contained" onClick={handleClick}>
                        {isSaved ? "Remove from List" : "Add to List"}
                      </Button>
                    </Grid>
                  </Card>
                )}
                {!movie && (
                  <Typography variant="h6">404 Movie not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
