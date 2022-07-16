import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import CustomHeader from "../../components/customHeader";
import CustomFooter from "../../components/customFooter";
import { Box, Container, Typography } from "@mui/material";
import { CategoryContainer } from "./categories";
import { PublisherContainer } from "./publishers";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f2f2f2",
      main: "#c7161e",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c7161e",
      main: "#c7161e",
      dark: "#c7161e",
      contrastText: "#000",
    },
  },
});

const AdminContainer = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Container
        component="main"
        sx={{ mt: 4, mb: 2, color: "HighlightText" }}
        maxWidth="xl"
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ marginTop: 10, color: "black" }}
        >
          Admin
        </Typography>
        <CategoryContainer />
        <PublisherContainer />
      </Container>
    </Box>
  );
};

export const Admin = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomHeader children={<AdminContainer />} />
        <CustomFooter />
      </div>
    </ThemeProvider>
  );
};
