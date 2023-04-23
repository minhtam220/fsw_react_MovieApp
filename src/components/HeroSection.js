import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PlayArrow } from "@mui/icons-material";

const VideoContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  zIndex: -1,
});

const Video = styled("video")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

const HeroContent = styled(Box)({
  position: "relative",
  zIndex: 1,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  textAlign: "center",
  color: "#fff",
});

function HeroSection() {
  return (
    <Box sx={{ position: "relative" }}>
      <VideoContainer>
        <Video autoPlay loop>
          <source
            src={
              process.env.PUBLIC_URL +
              "/videos/Harry Potter by Balenciaga 3.mp4"
            }
            type="video/mp4"
          />
        </Video>
      </VideoContainer>
      <HeroContent>
        <Typography variant="h1" component="h1">
          Harry Potter
        </Typography>
        <Button variant="contained" color="primary" sx={{ alignSelf: "left" }}>
          <PlayArrow></PlayArrow>
        </Button>
      </HeroContent>
    </Box>
  );
}

export default HeroSection;
