import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";

function DetailPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getMovie = async () => {
        setLoading(true);
        try {
          //edit the code here to get movie
          const res = await apiService.get(`/movies/${params.id}`);
          setMovie(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getMovie();
    }
  }, [params]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          CoderStore
        </Link>
        <Typography color="text.primary">{movie?.original_title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
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