import { Router } from 'express';
import { TimeControlController } from '../controllers/timeControl';

const router = Router();

router.post('/time-control', TimeControlController.createTimeControlByUser);

router.get('/time-control/:id', TimeControlController.getTimeControlByUser);

router.put('/time-control/:id', TimeControlController.updateTimeControlByUser);

export { router };
