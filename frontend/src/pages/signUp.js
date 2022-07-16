import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Link,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomCopyright from "../components/customCopyright";
import axios from "axios";
import { setCookie } from "../utils/common";
import { apiUsers, appToken } from "../utils/globals";
import { useNavigate } from "react-router-dom";

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

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
    };

    let url = apiUsers;
    if (
      user.name !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.password2 !== "" &&
      user.password === user.password2
    ) {
      await axios
        .post(url, {
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
        })
        .then((data) => {
          const token = data.data.token;
          setCookie(appToken, token);
          navigate("/", { replace: true });
        });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "antiquewhite",
        minHeight: "70vh",
        padding: 2,
        color: "ActiveCaption",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="enter-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Repeat Password"
                type="password"
                id="password2"
                autoComplete="repeat-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Go Back
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ mt: 8 }}>
        <CustomCopyright />
      </Box>
    </Container>
  );
};

const SignUpContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        component="main"
        sx={{ mt: 4, mb: 2, color: "HighlightText" }}
        maxWidth="xl"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Sign Up with Derana News Today"}
        </Typography>
      </Container>
      <SignUpForm />
    </Box>
  );
};

export const SignUp = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SignUpContainer />
      </div>
    </ThemeProvider>
  );
};
