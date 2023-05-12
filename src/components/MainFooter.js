import { Link, Typography } from "@mui/material";
import React from "react";

export default function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.coderschool.vn">
        Movie App by Tam Nguyen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
