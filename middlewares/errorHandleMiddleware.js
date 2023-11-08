const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/CustomError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Hata! Bir şeyler ters gitti." });
};

module.exports = errorHandlerMiddleware;
