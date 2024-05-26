import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TimeControlController } from '../controllers/timeControl';

const router = Router();

router.get('/', (req, res) => {
	return res.send('Olá, dev!');
});

router.post('/time-control', TimeControlController.createTimeControlByUser);

router.get('/time-control/:id', TimeControlController.getTimeControlByUser);

router.put('/time-control/:id', TimeControlController.updateTimeControlByUser);

export { router };
