import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

import sequelize, { dbConnect } from './config/db';

import noteRouter from './router/note';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(noteRouter);

app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  await dbConnect();

  console.log(`Server is Fire at PORT ${port}`);
});
