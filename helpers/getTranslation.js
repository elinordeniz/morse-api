const morseTranslator = require("morsee"); // Morse çeviri

function serializeObj(arr, decodedCommand) {
  let newObj = {};
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];

    for (let key in obj) {
      if (typeof obj[key] === "object") {
        for (let innerKey in obj[key]) {
          obj[key][innerKey] = morseTranslator.encode(
            obj[key][innerKey].toString()
          );
        }
      } else {
        obj[key] = morseTranslator.encode(obj[key].toString());
      }
    }
  }
  newObj[decodedCommand] = arr;
  return newObj;
}

const decode = (command) => {
  return morseTranslator.decode(command.toString());
};

const encode = (result, decodedCommand) => {
  console.log("type res", typeof result);
  if (decodedCommand === "checksum") {
    console.log("checksum if");

    return morseTranslator.encode(result.toString());
  }
  if (typeof result === ("string" || "number")) {
    console.log("str if");

    return { [decodedCommand]: morseTranslator.encode(result.toString()) };
  }
  if (typeof result === "object") {
    console.log("object if");
    return serializeObj(result, decodedCommand);
  } else {
    return "";
  }
};

module.exports = { decode, encode };
