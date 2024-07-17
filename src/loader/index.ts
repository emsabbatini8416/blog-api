import { bootstrapExpress } from "./app";
import { connectToDB } from "../config/mongoose";
import { logger } from "../config/logger";

export const bootstrap = async (app) => {
  await connectToDB();
  bootstrapExpress(app);
  logger.info('Express app initiated.')
};
