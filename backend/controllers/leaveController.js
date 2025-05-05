import Leaves from "../models/leaveModel.js";
import { calcLeaveDates } from "../utils/calcLeaveDates.js";

//Create a new Leave
export const addLeave = async (req, res) => {
    const { leaveType, startDate, endDate, reason} =
      req.body;

    const leaveDays =await calcLeaveDates(new Date(startDate), new Date(endDate))
    const newLeave = new Leaves({
        employee: req.user.id, leaveType, startDate, endDate, reason, totalLeaveDays:leaveDays
    });

    try {
      await newLeave.save();
      res.status(201).json({ message: "Leave Added successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };