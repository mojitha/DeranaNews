import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import styled from "@emotion/styled";

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

export default function CustomLatesNewsCard({ news }) {
  const [expanded, setExpanded] = React.useState(false);
  const [
    {
      // _id,
      title,
      images,
      // category,
      body,
    },
  ] = React.useState(news);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={
            images !== null ? images : require("../resources/images/road.jpg")
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
            {/* අගමැති නිවසට ගිනි තැබූ මැරයින් 03ක් පොලිස් අත්අඩංගුවට ! */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
            {/* අගමැතිවරයාගේ පෞද්ගලික නිවසට ගිනි තැබීමේ සිද්ධියට සැකපිට පුද්ගලයන්
            තිදෙනකු අත්අඩංගුවට ගත් බව පොලිස් මාධ්‍ය ප්‍රකාශක කාර්යාලය පවසයි.
            කොල්ලුපිටිය පොලීසිය මගින් අත්අඩංගුවට ගෙන ඇති මෙම සැකකරුවන් තිදෙනා
            අවුරුදු 28 ,24 සහ 19 යන වයස්වල පසුවන්නන් බව ද පොලිසිය පවසයි. */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></ExpandMore>
      </CardActions>
    </Card>
  );
}
