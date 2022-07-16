// import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/customSnackbar";
import { removeCookie } from "../utils/common";
import globals from "../utils/globals";

export const SignOut = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  React.useEffect(() => {
    setTimeout(() => {
      removeCookie(globals.appToken);
      navigate("/SignIn", { replace: true });
    }, 3000);
  }, []);
  return (
    <React.Fragment>
      <h1 sx={{ color: "HighlightText" }}>Signing Out...</h1>
      {/* <Button
        onClick={() =>
          setState({
            open: "true",
            vertical: "top",
            horizontal: "center",
          })
        }
      >
        Top-Center
      </Button> */}
      <CustomSnackbar state={state} setState={setState} />
    </React.Fragment>
  );
};
