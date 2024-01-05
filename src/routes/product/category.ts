import  express  from "express";
import { addCategory, getCategoryList } from "../../controller/category";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";


const router = express.Router()

router.get('/list', getCategoryList);
router.post('/add',authenticate, authorize, addCategory);
export default router;