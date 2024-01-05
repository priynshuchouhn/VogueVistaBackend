import  express  from "express";
import { addHomeBanner, getHomeBanner, getHomePromotionalBanner } from "../../controller/banner";
import { authorize } from "../../middleware/authorize";
import { authenticate } from "../../middleware/authenticate";

const router = express.Router()

router.get('/homePageBanner', getHomeBanner)
router.get('/getHomePromotionalBanner', getHomePromotionalBanner)
router.post('/addHomeBanner', authenticate,authorize, addHomeBanner)

export default router;