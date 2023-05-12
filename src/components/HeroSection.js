import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const VideoContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  zIndex: -1,
});

const Video = styled("video")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

function HeroSection({ video }) {
  return (
    <div>
      <VideoContainer>
        <Video autoPlay muted loop>
          <source src={process.env.PUBLIC_URL + video.url} type="video/mp4" />
        </Video>
      </VideoContainer>
    </div>
  );
}

export default HeroSection;
