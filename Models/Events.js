import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
   
    description: {
      type: String,
      trim: true,
      required: true,
    },

    dateTime: {
        type: Date,
        required: true,
      },

  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
