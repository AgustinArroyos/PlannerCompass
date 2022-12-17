import express from "express";
import { deleteEventbyday } from "../Controllers/eventController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//DELETE /events/{dayOfTheWeek}
router.delete('/:weekDay', checkAuth, deleteEventbyday);


export default router;