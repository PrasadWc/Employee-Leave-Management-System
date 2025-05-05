import Holidays from "../models/holidayModel.js";

//Create a new holiday
export const addHoliday = async (req, res) => {
    const { date, reason} =
        req.body;
    const newHoliday = new Holidays({
        date, reason
    });

    try {
      await newHoliday.save();
      res.status(201).json({ message: "Holiday Added successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };