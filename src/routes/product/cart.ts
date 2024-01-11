import express from 'express';
import { addToCart, getCartItem, deleteFromCart } from '../../controller/cart';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();


router.post('/addToCart', authenticate ,addToCart);
router.get('/list', authenticate ,getCartItem);
router.post('/delete', authenticate ,deleteFromCart);

export default router;