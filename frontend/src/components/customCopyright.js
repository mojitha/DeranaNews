import { Link, Typography } from "@mui/material";
import React from "react";

const CustomCopyright = () => {
  return (
    <Typography variant="body2">
      {"Copyright © All Rights Reserved "}
      {new Date().getFullYear()}
      {"."}
      <Link href="/">Mojitha Wijewardana</Link>{" "}
    </Typography>
  );
};

export default CustomCopyright;
