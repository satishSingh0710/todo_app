import express from "express"
import {
getAllUsers, 
getMyProfile,
login, 
logout, 
register,} from "../controllers/user.contoller.js";
import {isAuthenticated} from "../middlewares/auth.js"
const router = express.Router(); 

router.get("/all", getAllUsers);
router.post("/new", register); 
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);
export default router;