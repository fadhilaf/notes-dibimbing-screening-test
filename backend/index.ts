import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { createHandler } from 'graphql-http/lib/use/express';
import { RootQuerySchema } from './graphql/schema';

import { dbConnect } from './config/db';

import noteRouter from './router/note';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
app.use(cors());

app.all('/graphql', createHandler({ schema: RootQuerySchema }));

app.use(express.json());

app.use(noteRouter);

app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  await dbConnect();

  console.log(`Server is Fire at PORT ${port}`);
});
