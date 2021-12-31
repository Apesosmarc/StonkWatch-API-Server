//creates custom error class that accepts message and statusCode
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    // calls parent class with message as arg
    super(message);
    this.statusCode = statusCode;
  }
}

//function that creates new custom error class
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { CustomAPIError, createCustomError };
