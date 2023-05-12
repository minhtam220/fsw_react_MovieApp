import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  cardWrapper: {
    overflow: "hidden",
    transition: "transform 0.3s",
    "&:hover .card-content": {
      transform: "translateY(100%)",
    },
    "&:hover .card-media": {
      transform: "scale(2)",
    },
  },
  cardMedia: {
    transition: "transform 0.3s",
  },
  cardContent: {
    transform: "translateY(100%)",
    transition: "transform 0.3s",
  },
});

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className={classes.cardWrapper + (hovered ? " hovered" : "")}>
      <Card
        style={{ boxShadow: "none" }}
        onClick={() => navigate(`/detail/${movie.id}`)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={"https://image.tmdb.org/t/p/w200/" + movie.backdrop_path}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div" noWrap>
              {movie.original_title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default MovieCard;
