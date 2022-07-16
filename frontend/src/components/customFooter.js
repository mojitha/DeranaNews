import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomCopyright from "./customCopyright";

export default function CustomFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) => theme.palette.common.black,
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body1">Derana News</Typography>
          <CustomCopyright />
        </Container>
      </Box>
    </Box>
  );
}
