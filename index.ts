import express, { Express } from "express";
import { Server, createServer } from "http";
import mongoose from "mongoose";
import { bootstrap } from "./src";
import { logger } from "./src/config/logger";

const exitHandler = (server: Server | null) => {
  if (server) {
    server.close(async () => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server: Server) => {
  return function (error: Error) {
    logger.error(error);
    exitHandler(server);
  };
};

const startServer = async () => {
  const app: Express = express();
  await bootstrap(app);

  const httpServer = createServer(app);
  const port = process.env.PORT;

  const server: Server = httpServer.listen(port, () => {
    logger.info(`server listening on port ${port}`);
  });

  process.on("uncaughtException", unExpectedErrorHandler(server));
  process.on("unhandledRejection", unExpectedErrorHandler(server));
  process.on("SIGTERM", () => {
    logger.info("SIGTERM recieved");
    if (server) {
      server.close();
    }
  });

  mongoose.connection.on("error", (err) => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
  });
};

startServer();
