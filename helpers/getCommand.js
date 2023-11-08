const morseTranslator = require("morsee"); // Morse çeviri
const os = require("os"); // sistem bilgileri
const getChecksum = require("./getChecksum"); //checksum hesaplaması
const BadRequest = require("../errors/BadRequestError");

// hangi command paslandığını saptıyoruz
const getCommand = (decodedCommand, req, res) => {
  let result;
  let checksum;
  switch (decodedCommand.toUpperCase()) {
    case "CPU":
      // -.-. .--. ..-
      result = os.cpus();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "ARCH":
      // .- .-. -.-. ....
      result = os.arch();
      checksum = getChecksum(result, decodedCommand, req, res);

      break;
    case "FREEMEM":
      //..-. .-. . . -- . --
      result = os.freemem();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "HOSTNAME":
      // .... --- ... - -. .- -- .
      result = os.hostname();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "PLATFORM":
      // .--. .-.. .- - ..-. --- .-. --
      result = os.platform();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "TOTALMEM":
      // - --- - .- .-.. -- . --
      result = os.totalmem();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "TYPE":
      // - -.-- .--. .
      result = os.type();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    case "UPTIME":
      // ..- .--. - .. -- .
      result = os.uptime();
      checksum = getChecksum(result, decodedCommand, req, res);
      break;
    default:
      throw new BadRequest("Geçersiz command");
  }

  return { checksum, result };
};

module.exports = getCommand;
