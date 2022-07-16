const globals = require("./globals");

const setCookie = (key, value) => {
  localStorage.setItem(key, value);
};

const getCookie = (key) => {
  return localStorage.getItem(key);
};

const removeCookie = (key) => {
  localStorage.removeItem(key);
};

const getAuth = () => {
  return {
    headers: {
      Authorization: `Bearer ${getCookie(globals.appToken)}`,
    },
  };
};

module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  getAuth,
};
