import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <Button size="small" {...other}>
      Read More
    </Button>
  );
})(() => ({
  marginLeft: "auto",
}));

export default function CustomNewsCard({ newsItem }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (newsItem) {
    return (
      <Card sx={{ maxWidth: 900 }}>
        <CardHeader
          // title="පලාගොස් සැඟවුණු ජනාධිපති ගෑස් ගැන නිවේදනයක් නිකුත් කරයි !"
          title={newsItem.title}
          // subheader="July 10, 2022"
          subheader={new Date(newsItem.createdAt).toDateString()}
        />
        <CardMedia
          component="img"
          height="450"
          image={
            newsItem.images !== null
              ? newsItem.images
              : require("../resources/images/gotabaya.jpeg")
          }
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {/* ගෑස් රැගත් නෞකාව මෙරට මුහුදු තීරයට ළඟා වූ බව ජනාධිපති කාර්යාලය
            නිවේදනයක් නිකුත් කරමින් සඳහන් කරනවා. ගෑස් මෙට්‍රික් ටොන් 3,740ක් රැගත්
            දෙවන නෞකාව හෙට (11) සන්ධ්‍යාවේදී මෙරටට පැමිණීමට නියමිත බවයි එම
            නිවේදනයේ දැක්වෙන්නේ. */}
            {newsItem.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          ></ExpandMore>
        </CardActions>
      </Card>
    );
  } else {
    return null;
  }
}
