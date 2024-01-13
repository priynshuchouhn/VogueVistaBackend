import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { createPaymentIntent } from '../controller/payment';

const router = express.Router();


router.post('/createPaymentIntent', authenticate, createPaymentIntent);

export default router;