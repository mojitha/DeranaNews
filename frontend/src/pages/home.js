import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import CustomHeader from "../components/customHeader";
import CustomFooter from "../components/customFooter";
import HeroSection from "../components/customHero";
import axios from "axios";
import {
  //  apiCategories,
  apiNews,
} from "../utils/globals";
import { useParams } from "react-router-dom";
// import { Box } from "@mui/material";
// import CustomDropDown from "../components/customDropDown";
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

export const Home = () => {
  const { id } = useParams();
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    const getAllNews = async () => {
      await axios.get(apiNews).then((data) => {
        let tempNews = data.data.news;
        if (id) {
          console.log(id);
          // let category = loadCategory();
          // tempNews = tempNews.filter((news) => news.category === category._id);
        }
        setNews(tempNews);
      });
    };
    getAllNews();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomHeader children={<HeroSection newsItems={news} />} />
        <CustomFooter />
      </div>
    </ThemeProvider>
  );
};
