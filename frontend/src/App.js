import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomProtected from "./components/customProteted";
import { Admin } from "./pages/admin/index";
import { Editor } from "./pages/editor";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signIn";
import { SignOut } from "./pages/signout";
import { SignUp } from "./pages/signUp";
import enums from "./utils/enums";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route
            path="/admin"
            element={
              <CustomProtected role={enums.roles.ADMIN}>
                <Admin />
              </CustomProtected>
            }
          />
          <Route
            path="/editor"
            element={
              <CustomProtected role={enums.roles.EDITOR}>
                <Editor />
              </CustomProtected>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
