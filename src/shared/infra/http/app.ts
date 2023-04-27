import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { appConfig } from "../../../config";
import { v1Router } from "./api/v1";

const origin = {
  origin: appConfig.isProduction ? "*" : "*",
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/v1", v1Router);

app.listen(appConfig.port, () => {
  console.log(`[App]: Listening on port ${appConfig.port}`);
});
