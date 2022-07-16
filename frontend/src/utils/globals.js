const appToken = "@DeranaNewsToken";
const portServer = "5000";
const baseUrl = `http://localhost:${portServer}/api`;
const apiCategories = `${baseUrl}/categories`;
const apiUsers = `${baseUrl}/users`;
const apiNews = `${baseUrl}/news`;
const apiFiles = `${baseUrl}/files`;
const publicUrl = `http://localhost:${portServer}/public`;
const uploadsUrl = `${publicUrl}/uploads`;

module.exports = {
  appToken,
  baseUrl,
  apiCategories,
  apiUsers,
  apiNews,
  apiFiles,
  uploadsUrl,
};
