import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import HeroSection from "../components/HeroSection";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <HeroSection></HeroSection>
      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
