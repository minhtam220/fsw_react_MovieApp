import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

function TvPage() {
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Tv Page
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Tv Page
        </Typography>
        <Button to="/" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
export default TvPage;
