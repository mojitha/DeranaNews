import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomNewsCard from "./customNewsCard";
import { Typography } from "@mui/material";
import CustomNewsList from "./customNewsList";
import CustomDropDown from "./customDropDown";
import axios from "axios";
import { apiCategories } from "../utils/globals";

const Categories = ({ categories, category, setCategory }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <CustomDropDown
        dropDownId={"category"}
        items={categories}
        label={"News Category"}
        onChange={(e) => setCategory(e.target.value)}
      />
    </Box>
  );
};

export default function HeroSection({ newsItems }) {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    const loadCategories = async () => {
      await axios.get(apiCategories).then((res) => {
        let tempCategories = res.data.categories;
        tempCategories = tempCategories.filter(
          (category) => category.status === true
        );
        setCategories(tempCategories);
        if (newsItems) {
          setNews(newsItems);
        }
      });
    };
    loadCategories();
  }, []);

  React.useEffect(() => {
    let tempNews = newsItems;
    tempNews = tempNews.filter((news) => news.category === category);
    setNews(tempNews);
  }, [category]);

  // const newsItems = [
  //   {
  //     _id: "1",
  //     title: "අගමැති නිවසට ගිනි තැබූ මැරයින් 03ක් පොලිස් අත්අඩංගුවට",
  //     images: `${require("../resources/images/fire.jpeg")}`,
  //     category: "nice",
  //     createdOn: new Date().toString(),
  //     body:
  //       "අගමැතිවරයාගේ පෞද්ගලික නිවසට ගිනි තැබීමේ සිද්ධියට සැකපිට පුද්ගලයන් තිදෙනකු අත්අඩංගුවට ගත් බව පොලිස් මාධ්‍ය ප්‍රකාශක කාර්යාලය පවසයි.",
  //   },
  //   {
  //     _id: "2",
  //     title: `අරගලකරුවන් ගෝඨාභයගේ අල්මාරියේ තිබී සොයාගත් එක්කෝටි හැත්තෑ අට ලක්ෂ මුදල පොලිසියට බාර දෙයි.
  //      සල්ලි පොලිස් ඇමතිට දෙන්නැයි දේශබන්දුගෙන් බලපෑම්`,
  //     images: `${"https://static.toiimg.com/thumb/imgsize-525634,msid-92759276,width-400,resizemode-4/92759276.jpg"}`,
  //     category: "nice",
  //     createdOn: new Date().toString(),
  //     body: `ජනාධිපති මන්දිරයට අරගලකරුවන් ඇතුළුවීමෙන් පසු විශ්ව විද්‍යාල සිසුන් පිරිසකට ජනාධිපති ගෝඨාභය රාජපක්ෂ මහතා රැදී සිටියේ යැයි කියැවෙන කාමරයේ
  //       අල්මාරියේ තිබී රුපියල් එක්කෝටි හැත්තෑ අට ලක්ෂ පනස්දහසක මුදලක් හමුවී ඇත. එම මුදල එම සිසුන් සිය භාරයට ගෙන ජනාධිපති මන්දිරයේ ආරක්ෂාවට
  //       ඒ මොහොතේ සිටි විශේෂ කාර්ය බලකායේ ජ්‍යෙෂ්ඨ පොලිස් අධිකාරී නිෂේද ප්‍රනාන්දු නැමැති නිලධාරියාට භාරදීමට එම විශ්ව විද්‍යාල සිසුන් පියවර ගෙන තිබේ.`,
  //   },
  // ];

  if (newsItems) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} paddingTop={10} paddingX={2}>
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom component="div">
              Top Stories
            </Typography>
            {newsItems.map((newsItem, _) => (
              <CustomNewsCard key={newsItem._id} newsItem={newsItem} />
            ))}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" gutterBottom component="div">
              Headlines
            </Typography>
            <Categories
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
            <CustomNewsList newsItems={news} />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return null;
  }
}
