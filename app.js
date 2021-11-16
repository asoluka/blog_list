const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");
const blogRoutes = require("./controllers/blog");

logger(chalk.yellow("Connecting to database..."));
mongoose
  .connect(config.MONGO_URL)
  .then((result) => logger(chalk.green("Database connection successful!")))
  .catch((error) =>
    logger(chalk.red("Connectiong to database failed. ", error))
  );

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});
app.use("/api/blogs", blogRoutes);

app.use(errorHandler);
module.exports = app;
