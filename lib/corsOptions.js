const { StatusCodes } = require("http-status-codes");
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new CustomError("CORS Hatası", StatusCodes.UNAUTHORIZED));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
