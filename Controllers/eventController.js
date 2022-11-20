
 import Event from "../Models/Events.js" 



//GET  /events/
const showEvent = async (req, res) => {
    const event = await Event.find();
  
    res.json(event);

}

//GET  /events/{id}
const showEventbyid = async (req, res) => {
    const {id} =req.params;

    const event = await Event.findById(id)
      
    if (!event) {
      const error = new Error("Not found event");
      return res.status(404).json({ msg: error.message });
    }
    res.json(event);

}

//GET  /events/{dayOfTheWeek}
const showEventbyday = async (req, res) => {
 
    const {year,month, day} = req.params;
    let months = parseInt(month)-1
    let days1 = parseInt(day)
    let days2 = parseInt(day)+1;
    
    const dateStart = new Date(year, months, days1)
    const dateEnd = new Date(year, months, days2)
  
    const eventDate = await Event.find({dateTime : {$gte : dateStart, $lte : dateEnd}});
 
   
    res.json(eventDate);


}

//POST /events
const createEvent = async (req, res) => {
    
    const event = new Event(req.body);
  
    try {
      const eventAlmacenado = await event.save();
      res.json(eventAlmacenado);
    } catch (error) {
      console.log(error);
    }



}

//DELETE  /events/{id}
const deleteEventbyid = async (req, res) => {

  const { id } = req.params;

  const event = await Event.findById(id)

  if (!event) {
    const error = new Error("Not found event");
    return res.status(404).json({ msg: error.message });
  }

  try {
   
    await event.deleteOne();
    res.json({ msg: "Deleted Project by id" });
  } catch (error) {
    console.log(error);
  }

}

//DELETE  /events/{id}
const deleteEventbyday = async (req, res) => {
 
  const {year1,month1, day1} = req.params;
  let months = parseInt(month1)-1
  let days1 = parseInt(day1)
  let days2 = parseInt(day1)+1;
  
  const dateStart = new Date(year1, months, days1)
  const dateEnd = new Date(year1, months, days2)

  const event = await Event.findOne({dateTime : {$gte : dateStart, $lte : dateEnd}});

  
  if (!event) {
    const error = new Error("Not found event");
    return res.status(404).json({ msg: error.message });
  }


  try {
    await event.deleteOne();
    res.json({ msg: "Deleted Project by weekday" });
  } catch (error) {
    console.log(error);
  }

}

export { showEvent, createEvent, deleteEventbyid, showEventbyid , showEventbyday, deleteEventbyday}