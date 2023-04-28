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

function HeroSection({ video }) {
  return (
    <Box sx={{ position: "relative" }}>
      <VideoContainer>
        <Video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + video.url} type="video/mp4" />
        </Video>
      </VideoContainer>
      <HeroContent>
        <Typography variant="h1" component="h1">
          {video.title}
        </Typography>
      </HeroContent>
    </Box>
  );
}

export default HeroSection;
