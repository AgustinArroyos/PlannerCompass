
import Event from "../Models/Events.js"



//GET  /events/
const showEvent = async (req, res) => {
  const event = await Event.find();

  res.status(200).json(event);

}

//GET  /events/{id}
const showEventbyid = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id)

  if (!event) {
    const error = new Error("Not found event");
    return res.status(404).json({ msg: error.message });
  }
  res.status(200).json(event);

}

//GET  /events/{dayOfTheWeek}
const showEventbyday = async (req, res) => {

  const { weekDay } = req.params;

  const event = await Event.find({ dayOfWeek: weekDay });

  res.status(200).json(event);


}

//POST /events
const createEvent = async (req, res) => {

  const event = new Event(req.body);

  try {
    const eventAlmacenado = await event.save();
    res.status(200).json(eventAlmacenado);
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
    res.status(200).json({ msg: "Deleted Project by id" });
  } catch (error) {
    console.log(error);
  }

}

//DELETE  /events/{weekDay}
const deleteEventbyday = async (req, res) => {
  const { weekDay } = req.params;

  const event = await Event.find({ dayOfWeek: weekDay });

  if (!event) {
    const error = new Error("Not found event");
    return res.status(404).json({ msg: error.message });
  }


  try {
    await event.deleteOne();
    res.status(200).json({ msg: "Deleted Project by weekday" });
  } catch (error) {
    console.log(error);
  }

}

export { showEvent, createEvent, deleteEventbyid, showEventbyid, showEventbyday, deleteEventbyday }