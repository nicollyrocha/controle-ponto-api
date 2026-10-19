import { Request, Response } from 'express';
const db = require('../../database');

const sendServerError = (res: Response, error: unknown) => {
	console.error(error);
	return res.status(500).send({
		body: {
			message: 'Erro interno no servidor',
			status: 500,
		},
	});
};

export const createTimeControlByUser = async (req: Request, res: Response) => {
	const data = req.body;

	try {
		const { rows } = await db.query(
			'INSERT INTO controle_ponto (userid, starttime) VALUES ($1, $2) RETURNING *',
			[data.userid, data.starttime]
		);

		if (rows.length > 0) {
			res.status(200).send({
				body: {
					timeControl: rows[rows.length - 1],
					message: 'Horário cadastrado com sucesso',
					status: 200,
				},
			});
		} else {
			return res.status(404).send({
				body: {
					message: 'Ocorreu um erro ao cadastrar um horário',
					status: 404,
				},
			});
		}
	} catch (error) {
		return sendServerError(res, error);
	}
};

export const updateTimeControlByUser = async (req: Request, res: Response) => {
	const data = req.body;

	try {
		const query = await db.query(
			'UPDATE controle_ponto SET endtime = $1 WHERE userid = $2',
			[data.endtime, data.userid]
		);

		if (query) {
			const { rows } = await db.query(
				'SELECT * FROM controle_ponto WHERE userid = $1',
				[data.userid]
			);

			if (rows.length > 0) {
				res.status(200).send({
					body: {
						message: 'Horário editado com sucesso',
						status: 200,
						body: rows,
					},
				});
			} else {
				return res.status(404).send({
					body: {
						message: 'Ocorreu um erro ao editar um horário',
						status: 404,
					},
				});
			}
		}
	} catch (error) {
		return sendServerError(res, error);
	}
};

export const getTimeControlByUser = async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const { rows } = await db.query(
			'SELECT * FROM controle_ponto WHERE userid = $1',
			[id]
		);

		if (rows.length > 0) {
			res.status(200).send({
				body: {
					timeControl: rows,
					message: 'User found!',
					status: 200,
				},
			});
		} else {
			return res.status(404).send({
				body: {
					message: 'User not found.',
					status: 404,
				},
			});
		}
	} catch (error) {
		return sendServerError(res, error);
	}
};
