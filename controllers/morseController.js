const morseTranslator = require("morsee");
const getCommand = require("../helpers/getCommand");
const BadRequest = require("../errors/BadRequestError");
const { encode, decode } = require("../helpers/getTranslation");
const { setCookie } = require("../helpers/setCookies");
const { StatusCodes } = require("http-status-codes");

const morseController = (req, res, next) => {
  const command = req.body?.command;
  if (!command) {
    throw BadRequest("Command girilmesi zorunlu! ");
  }
  const decodedCommand = decode(command.toString());
  if (!decodedCommand) {
    throw BadRequest("Geçersiz Command!");
  }

  setCookie(req, res);
  const { result, checksum } = getCommand(decodedCommand, req, res);

  const encodedResult = encode(result, decodedCommand);
  const encodedChecksum = encode(checksum, "checksum");
  return res.status(StatusCodes.OK).json({ data: encodedResult, checksum: encodedChecksum  });
};

module.exports = morseController;
