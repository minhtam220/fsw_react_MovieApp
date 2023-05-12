import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FRadioGroup } from "../form";

function MovieFilter({ genres, resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>

        <FRadioGroup
          name="genre"
          options={genres.map((item) => item.id)}
          getOptionLabel={genres.map((item) => item.name)}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
