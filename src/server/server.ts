import express from 'express';

import { router } from './routes';
var cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

server.use(router);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

export { server };
