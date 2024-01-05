import express from 'express';
import { addProduct, getAllproducts, getProductsByCategory, getTrendingArrivals, getBestSeller, getPopularProducts, getProductDetail } from '../../controller/product';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';


const router = express.Router()

router.get('/list', getAllproducts);
router.post('/detail', getProductDetail);
router.post('/listByCategory', getProductsByCategory);
router.get('/trendingArrivals', getTrendingArrivals);
router.get('/bestSeller', getBestSeller);
router.get('/popular', getPopularProducts);

router.post('/add',authenticate, authorize, addProduct);


export default router;