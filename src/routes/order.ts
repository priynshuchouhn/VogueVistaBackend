import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { addOrder, getOrders } from '../controller/order';

const router = express.Router();

router.get('/getOrders', authenticate, getOrders);
router.post('/add', authenticate, addOrder);


export default router;