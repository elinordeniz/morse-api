const express = require("express");

const router = express.Router();
const morseController = require("../controllers/morseController");

router.post("/", morseController);

module.exports = router;
