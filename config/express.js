import express from 'express';
import config from './config';
import datasource from './datasource';
import bodyParser from 'body-parser';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger.js";

import petsRouter from '../app/routes/pets';
import usersRouter from '../app/routes/users';
import authRouter from '../app/routes/auth';
import authorization from '../app/api/auth';

const app = express();

app.config = config;
app.datasource = datasource(app);

app.set('port', 3000);

const auth = authorization(app);

app.auth = auth;

app.use(morgan("common", {
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(express.static("public"));


 
usersRouter(app);
petsRouter(app);
authRouter(app);

export default app;