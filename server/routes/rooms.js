import express from "express"; 
import { addRoom, enterRoom, getUsersRooms,getRoom } from "../controllers/room.js";

const router = express.Router(); 

router.post("/addRoom", addRoom)
router.get("/enterRoom", enterRoom)
router.get(`/getUsersRooms`, getUsersRooms)
router.get(`/getRoom`, getRoom)

export default router; 