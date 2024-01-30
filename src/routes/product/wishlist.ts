import express from 'express';
import { addWishlistItem, getWishlistItem, removeFromWishlist } from '../../controller/wishlist';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();

router.get('/list', authenticate,getWishlistItem);
router.post('/add', authenticate,addWishlistItem);
router.post('/delete', authenticate,removeFromWishlist);


export default router;