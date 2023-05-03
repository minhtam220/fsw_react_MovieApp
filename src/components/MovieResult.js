import { Grid, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieResult({ listName, movies, loading }) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {listName}
      </Typography>
      <Grid container spacing={2} mt={1}>
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={6} md={4} lg={3}>
            <CardContent>
              <Typography gutterBottom variant="body1" component="div" noWrap>
                {movie.original_title}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MovieResult;
