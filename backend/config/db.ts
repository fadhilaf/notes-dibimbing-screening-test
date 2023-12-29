import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || 'postgres';

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

export async function dbConnect() {
  await sequelize.sync()
    .then(() => {
      console.log("All models were synchronized successfully.");
    })
    .catch((err: any) => {
      console.log("Unable to synchronize the models:", err);
    });

  await sequelize.authenticate()
    .then(() => {
      console.log('Database Connected Successfully.');
    })
    .catch((err: any) => {
      console.log('Unable to connect to the database:', err);
    });
}

export default sequelize;
