require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const morseRouter = require("./routes/morseRouter");
const errorHandlerMiddleware = require("./middlewares/errorHandleMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const corsOptions = require("./lib/corsOptions");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

let swagger_path = path.resolve(__dirname, "./swagger.yaml");

const swaggerDocument = YAML.parse(swagger_path);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.use("/morse-api", morseRouter);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, () => console.log("Sunucu ayağa kalktı!"));
