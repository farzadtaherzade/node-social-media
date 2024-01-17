const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const path = require("path");
const mainRouter = require("./src/app.routes");
const swaggerConfig = require("./src/config/swagger.config");
const cookieParser = require("cookie-parser");

dotenv.config();

const start = async () => {
  const app = express();
  const port = process.env.PORT;

  //app configs
  if (process.env.NODE_ENV == "development") app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  swaggerConfig(app);
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use(mainRouter);
  app.use(express.static(path.join(__dirname, "..", "public")));
  NotFoundHandler(app);
  AllExceptionHandler(app);

  app.listen(port, () => {
    console.log(`server running on port ${port}: ${process.env.URL}${port}`);
  });
};

start();
