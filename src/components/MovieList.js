import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ listName, movies, loading }) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {listName}
      </Typography>
      <Grid container spacing={2} mt={1}>
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MovieList;
