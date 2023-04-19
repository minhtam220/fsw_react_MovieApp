import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {movie.original_title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
