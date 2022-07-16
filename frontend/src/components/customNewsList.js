import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CustomLatesNewsCard from "./customLatestNewsCard";

export default function CustomNewsList({ newsItems }) {
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    let tempNews = [];
    if (newsItems && newsItems.length > 0) {
      for (let i = newsItems.length; i > 0; i--) {
        let item = newsItems[i];
        tempNews.push(item);
      }
    }
    if (tempNews.length > 0) {
      setNews(tempNews);
    }
  }, [newsItems]);

  if (news) {
    return (
      <Box sx={{ width: "100%", maxWidth: 450, bgcolor: "background.paper" }}>
        <nav aria-label="news list">
          <List>
            {newsItems.map((newsItem, index) =>
              index < 5 ? (
                <ListItem disablePadding key={newsItem._id}>
                  <CustomLatesNewsCard news={newsItem} />
                </ListItem>
              ) : null
            )}
          </List>
        </nav>
      </Box>
    );
  }
}
