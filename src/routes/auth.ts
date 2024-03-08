import  express  from "express";
import { login, loginInWithGoogle, register } from "../controller/auth";

const router = express.Router()

router.post('/login', login)

router.post('/register', register)
router.post('/loginInWithGoogle', loginInWithGoogle)


export default router;