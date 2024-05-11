import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';
import cors from 'cors';
dotenv.config();

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(apiRoutes);


server.listen(process.env.PORT);