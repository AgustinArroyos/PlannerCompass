import express from "express";
import { showEvent, createEvent, deleteEventbyid, showEventbyid, showEventbyday, deleteEventbyday } from "../Controllers/eventController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//GET  /events/  
router.get('/', checkAuth, showEvent);


//GET  /events/{dayOfTheWeek}
router.get('/day/:weekDay', checkAuth, showEventbyday);


//GET  /events/{id} 
router.get('/id/:id', checkAuth, showEventbyid);


//POST /events
router.post('/', checkAuth, createEvent);


//DELETE  /events/{id}
router.delete('/:id', checkAuth, deleteEventbyid);





export default router;