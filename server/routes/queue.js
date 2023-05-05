import express from "express"; 
import { addPersonInQueue, deleteQueue, editPersonInQueue} from "../controllers/queue.js";

const router = express.Router(); 

router.post("/addPersonInQueue", addPersonInQueue)
router.delete("/deleteQueue", deleteQueue)
router.put("/editPersonInQueue", editPersonInQueue)


export default router; 