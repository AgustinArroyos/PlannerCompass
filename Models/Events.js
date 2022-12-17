import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {

    description: {
      type: String,
      trim: true,
      required: true,
    },

    dayOfWeek: {
      type: String,
      trim: true,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
