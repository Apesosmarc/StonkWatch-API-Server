const { CustomAPIError } = require("../errors/custom-error");

// checks if custom error, returns custom message and code, else returns vague 500
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorHandlerMiddleware;
