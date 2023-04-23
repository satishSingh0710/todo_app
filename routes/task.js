import express from "express"
import { completeTask, deleteTask, getMyTasks, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router(); 


router.post("/new",isAuthenticated,newTask);
router.get("/my", isAuthenticated, getMyTasks);
router.put("/:id",isAuthenticated, completeTask);
router.delete("/:id", isAuthenticated, deleteTask);
export default router;