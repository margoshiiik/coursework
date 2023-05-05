import express from "express"; 
import {addReaction, deleteReaction, getReactions } from "../controllers/reaction.js";

const router = express.Router(); 

router.post("/addReaction", addReaction)
router.delete("/deleteReaction", deleteReaction)
router.get("/getReactions", getReactions)


export default router; 