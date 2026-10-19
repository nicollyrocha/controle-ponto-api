const { Pool } = require('pg');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const app = express();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: `${process.env.DB_PASSWORD}`,
	port: process.env.DB_PORT,
	ssl: true,
});

// Sem este handler, um erro em uma conexão ociosa derruba o processo
pool.on('error', (err: Error) => {
	console.error('Erro inesperado no pool do banco de dados', err);
});

pool.on('connect', () => {
	console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
	query: (text: any, params: any) => pool.query(text, params),
};
