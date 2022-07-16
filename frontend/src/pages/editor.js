import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import CustomFooter from "../components/customFooter";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FileUpload from "react-material-file-upload";
import CustomDropDown from "../components/customDropDown";
// import CustomRichText from "../components/customRichText/index";
import CustomHeader from "../components/customHeader";
import CustomSnackbar from "../components/customSnackbar";
import {
  apiCategories,
  // apiFiles,
  apiNews,
  // appToken,
  // uploadsUrl,
} from "../utils/globals";
import {
  getAuth,
  // getCookie
} from "../utils/common";

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

const EditorForm = () => {
  const [categories, setCategories] = React.useState([]);
  // const [files, setFiles] = React.useState([]);
  // const [
  //   // images,
  //   // setImages
  // ] = React.useState([]);
  const [news, setNews] = React.useState({});
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "left",
    open: false,
  });
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const loadCategories = async () => {
      await axios.get(apiCategories).then((res) => {
        let tempCategories = res.data.categories;
        tempCategories = tempCategories.filter(
          (category) => category.status === true
        );
        setCategories(tempCategories);
      });
    };
    loadCategories();
  }, []);

  // const UploadFiles = async (formData, isMultiple) => {
  //   const uploadedFilesResponse = await axios.post(
  //     `${apiFiles}/${isMultiple}`,
  //     formData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${getCookie(appToken)}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   return uploadedFilesResponse;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // debugger;

    //const res = UploadFiles(new FormData(), false);

    const data = new FormData(event.currentTarget);

    const news = {
      title: data.get("title"),
      category: data.get("category"),
      body: data.get("body"),
    };

    let url = apiNews;
    if (
      news.title !== "" &&
      news.category !== "" &&
      news.body !== "" &&
      news.images !== ""
    ) {
      await axios
        .post(
          url,
          {
            title: data.get("title"),
            category: data.get("category"),
            body: data.get("body"),
            images: data.get("images"),
          },
          getAuth()
        )
        .then((_) => {
          setMessage("News Successfully Saved");
          setState({ vertical: "bottom", horizontal: "center", open: true });
        });
    } else {
      setMessage("Please enter all details");
      setState({ vertical: "bottom", horizontal: "center", open: true });
    }
  };

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        backgroundColor: "HighlightText",
        minHeight: "70vh",
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
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Create News
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="News Title"
            name="title"
            autoComplete="title"
            autoFocus
            sx={{ mt: 2 }}
            onChange={(e) => handleChange(e)}
          />

          <Box sx={{ mt: 2 }}>
            <CustomDropDown
              dropDownId={"category"}
              isRequired={true}
              items={categories}
              label={"News Category"}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="body"
              label="News Body"
              name="body"
              autoComplete="body"
              autoFocus
              sx={{ mt: 2 }}
              multiline
              onChange={(e) => handleChange(e)}
            />
            {/* <CustomRichText id={"body"} onChange={handleChange} /> */}
          </Box>

          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="images"
              label="News Image Url"
              name="images"
              autoComplete="images"
              autoFocus
              sx={{ mt: 2 }}
              onChange={(e) => handleChange(e)}
            />
            {/* <CustomRichText id={"body"} onChange={handleChange} /> */}
          </Box>

          <Box sx={{ mt: 2 }}>
            {/* <FileUpload
              value={files}
              onChange={setFiles}
              name="fileUploadControlInput"
              accept={"image/*"}
            /> */}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
          <CustomSnackbar state={state} message={message} setState={setState} />
        </Box>
      </Box>
    </Container>
  );
};

const EditorContainer = () => {
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
          sx={{ marginTop: 8, color: "black" }}
        >
          Editor
        </Typography>
        <EditorForm />
      </Container>
    </Box>
  );
};

export const Editor = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomHeader children={<EditorContainer />} />
        <CustomFooter />
      </div>
    </ThemeProvider>
  );
};
