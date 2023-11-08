const JSum = require("jsum");
const { cookieObj } = require("./setCookies");
const BadRequest = require("../errors/BadRequestError");

const getChecksum = (result, decodedCommand, req, res) => {
  const cookie = req.cookies;

  console.log(cookie?.checksums);
  if (!cookie) {
    res.cookie("checksums", cookieObj);
  }
  const checksum = calculateChecksum(result, decodedCommand);
  const oldChecksumVal = cookie?.checksums[decodedCommand];

  if (checksum !== oldChecksumVal) {
    cookieObj[decodedCommand] = checksum;
    res.cookie("checksums", cookieObj);
    return checksum;
  } else {
    return "";
  }
};

calculateChecksum = (result, decodedCommand) => {
  let checksum = JSum.digest({ [decodedCommand]: result }, "SHA256", "hex");
  return checksum;
};

module.exports = getChecksum;
