const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";
  res.status(statusCode);
  res.json({ message: err.message, stack: isProduction ? null : err.stack });
};

module.exports = {
  errorHandler,
};
