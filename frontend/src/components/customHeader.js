import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomAppBar from "./customAppBar";

export default function CustomHeader({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed maxWidth={"xl"}>
        <Box sx={{ bgcolor: "#f2f2f2", minHeight: "100vh" }}>
          <CustomAppBar children={children} />
        </Box>
      </Container>
    </React.Fragment>
  );
}
