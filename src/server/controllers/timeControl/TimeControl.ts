import { Request, Response } from 'express';
const db = require('../../database');

export const createTimeControlByUser = async (req: Request, res: Response) => {
	const data = req.body;

	const { rows } = await db.query(
		`INSERT INTO user_pontos (userid, starttime) VALUES ('${data.userid}', '${data.starttime}') RETURNING *`
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
};

export const updateTimeControlByUser = async (req: Request, res: Response) => {
	const data = req.body;

	const query = await db.query(
		`UPDATE user_pontos SET endtime = '${data.endtime}' WHERE userid = '${data.userid}'`
	);

	if (query) {
		const { rows } = await db.query(
			`SELECT * FROM user_pontos WHERE userid = '${data.userid}'`
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
};

export const getTimeControlByUser = async (req: Request, res: Response) => {
	const id = req.params.id;

	const { rows } = await db.query(
		`SELECT * FROM user_pontos WHERE userid = '${id}'`
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
};
