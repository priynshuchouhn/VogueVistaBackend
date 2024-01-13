import express from 'express';
import { addAddress, getAllAddresses } from '../../controller/address';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();


router.get('/getAddress',authenticate, getAllAddresses);
router.post('/add',authenticate, addAddress);


export default router;