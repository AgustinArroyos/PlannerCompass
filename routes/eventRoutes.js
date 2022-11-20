/* 
GET  /events/  
GET  /events/{dayOfTheWeek}
GET  /events/{id} 
POST /events
DELETE  /events/{id}
DELETE /events/{dayOfTheWeek}
*/

import express from "express";
import {showEvent, createEvent, deleteEventbyid , showEventbyid , showEventbyday, deleteEventbyday} from "../Controllers/eventController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

 
//GET  /events/  
router.get('/',checkAuth ,showEvent );


//GET  /events/{dayOfTheWeek}
router.get('/:year-:month-:day', checkAuth , showEventbyday );


//GET  /events/{id} 
router.get('/:id', checkAuth , showEventbyid );


//POST /events
router.post('/' , checkAuth, createEvent );


//DELETE  /events/{id}
router.delete('/:id', checkAuth , deleteEventbyid );


//DELETE /events/{dayOfTheWeek}
router.delete('/day/:year1-:month1-:day1', checkAuth , deleteEventbyday );








export default router;