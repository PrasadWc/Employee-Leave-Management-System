import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    date: {
      type: String, // Store as 'YYYY-MM-DD' for easy comparison
      required: true,
      unique: true
    },
    reason: {
      type: String,
      required: true
    }
  });
  

  const Holidays = mongoose.model("Holidays", holidaySchema);
  export default Holidays;