import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import bodyParser from 'body-parser';
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import petsRouter from './src/routes/pets';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';
import authorization from './src/api/auth';

const app = express();

app.config = config;
app.datasource = datasource(app);

app.set('port', 3000);

const auth = authorization(app);

app.auth = auth;


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