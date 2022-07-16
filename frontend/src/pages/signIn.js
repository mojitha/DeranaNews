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

const SignInForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let url = `${apiUsers}/login`;
    if (user.email !== "" && user.password !== "") {
      await axios
        .post(url, {
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Go Back
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
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

const SignInContainer = () => {
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
          Sign In
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Sign In to your account"}
        </Typography>
      </Container>
      <SignInForm />
    </Box>
  );
};

export const SignIn = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SignInContainer />
      </div>
    </ThemeProvider>
  );
};
