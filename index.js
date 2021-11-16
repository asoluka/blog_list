const http = require("http");
const chalk = require("chalk");

const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
  logger(chalk.green("App running on port: ", PORT));
});
