import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material/styles";

const images = [
  "/img/blue.jpg",
  "/img/blueangry.jpg",
  "/img/green.jpg",
  "/img/blue.jpg",
  "/img/blueangry.jpg",
  "/img/green.jpg",
];

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    maxWidth: "1200px",
    margin: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  image: {
    width: "100%",
    height: "50%",
    objectFit: "cover",
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginRight: theme.spacing(2),
    color: theme.palette.common.white,
  },
  arrowButton: {
    color: theme.palette.common.white,
  },
}));

const StyledImage = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

function SlideShow() {
  const classes = useStyles();

  const list = "Upcoming";
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <Box className={classes.carouselContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {list}
        </Typography>
        <IconButton
          onClick={() => handleChangeIndex(index - 1)}
          disabled={index === 0}
          className={classes.arrowButton}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => handleChangeIndex(index + 1)}
          disabled={index === images.length - 1}
          className={classes.arrowButton}
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>
      <Carousel animation="slide" indicators={false} navButtonsAlwaysVisible>
        {images.map((image, index) => (
          <StyledImage
            key={index}
            src={process.env.PUBLIC_URL + image}
            alt={`Image ${index}`}
          />
        ))}
      </Carousel>
    </Box>
  );
}

export default SlideShow;
