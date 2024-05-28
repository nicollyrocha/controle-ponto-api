const db = require('../database');

import { Router } from 'express';
import { TimeControlController } from '../controllers/timeControl';

const router = Router();

router.post('/time-control', TimeControlController.createTimeControlByUser);

router.get('/time-control/:id', TimeControlController.getTimeControlByUser);

router.put('/time-control/:id', TimeControlController.updateTimeControlByUser);

router.get('/', async (req: any, res: any) => {
	await db.query(
		'CREATE TABLE user_pontos (id SERIAL PRIMARY KEY, userid VARCHAR(100), starttime TIMESTAMP, endtime TIMESTAMP)'
	);
	res.send('Success!');
});

export { router };
