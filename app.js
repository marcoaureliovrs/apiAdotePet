import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import bodyParser from 'body-parser';
import helmet from "helmet";
import compression from "compression";

import petsRouter from './src/routes/pets';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';
import authorization from './src/api/auth';

//import consign from 'consign';

const app = express();

app.config = config;
app.datasource = datasource(app);

app.set('port', 3000);

const auth = authorization(app);

app.auth = auth;

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(express.static("public"));

/** 
consign()
    .include('config/config.js')
    .then('config/datasource.js')
    .then('src/api/auth.js')
    .then('src/api')
    .then('src/routes')
    .into(app);
*/

usersRouter(app);
petsRouter(app);
authRouter(app);

export default app;