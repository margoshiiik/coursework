import express from "express"; 
import { addMessage, deleteMessage, editMessage, getMessages} from "../controllers/message.js";

const router = express.Router(); 

router.post("/addMessage", addMessage)
router.delete("/deleteMessage", deleteMessage)
router.put("/editMessage", editMessage)
router.get("/getMessages", getMessages)


export default router; 