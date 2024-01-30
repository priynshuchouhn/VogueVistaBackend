import express from 'express';
import { addToCart, getCartItem, deleteFromCart, updateCart } from '../../controller/cart';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();


router.post('/add', authenticate ,addToCart);
router.get('/list', authenticate ,getCartItem);
router.post('/delete', authenticate ,deleteFromCart);
router.post('/update', authenticate ,updateCart);

export default router;