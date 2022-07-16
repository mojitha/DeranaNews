import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth, getCookie } from "../utils/common";
import enums from "../utils/enums";
import { apiUsers, appToken } from "../utils/globals";

const CustomProtected = ({ role, children }) => {
  const [isAuthorized, setIsAuthorized] = React.useState(getCookie(appToken));

  React.useEffect(() => {
    const checkAuthorization = async () => {
      let tempIsAuthorized = isAuthorized !== null;

      await axios.get(`${apiUsers}/me`, getAuth()).then((data) => {
        const user = data.data;
        if (user) {
          if (role === enums.roles.ADMIN) {
            tempIsAuthorized = user.isAdmin;
          } else if (role === enums.roles.EDITOR) {
            tempIsAuthorized = user.isEditor;
          }
        }
        setIsAuthorized(tempIsAuthorized);
      });
    };
    checkAuthorization();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default CustomProtected;
