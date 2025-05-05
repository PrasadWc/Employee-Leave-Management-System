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


//get all leaves for authenticated user
export const getAllLeaves = async (req, res) => {
    try {
      const leaves = await Leaves.find({ 
        employee: req.user.id });
      res.status(200).json({ leaves });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

//delete a leave by authenticated user
export const deleteLeave = async (req, res) => {
  try {
      const { id } = req.params;

      const leave = await Leaves.findById(id);
      if (!leave) {
          return res.status(404).json({ message: "leave not found" });
      }

      await Leaves.findByIdAndDelete(id);
      res.status(200).json({ message: "leave deleted successfully" });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//update a leave by authenticated moderator
export const updateLeavebyMod = async (req, res) => {
  try {
      const { id } = req.params;
      const {reviewComments} = req.body;
      const reviewedBy = req.user.id
      
      // Find the leave by ID
      const leave = await Leaves.findById(id);
      if (!leave) {
          return res.status(404).json({ message: "Leave not found" });
      }
      
      // Update the leave
      const updatedLeave = await Leaves.findByIdAndUpdate(
          id,
          { reviewedBy, reviewComments },
          { new: true } // Return the updated document
      );
      
      res.status(200).json({ message: "Leave updated successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Update a leave by authenticated admin (update status and approvedBy)
export const updateLeavebyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComments } = req.body;
    const approvedBy = req.user.id;

    // Find the leave by ID
    const leave = await Leaves.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Update the leave
    const updatedLeave = await Leaves.findByIdAndUpdate(
      id,
      { status, approvedBy, adminComments },
      { new: true } // Return the updated document
    );

    res.status(200).json({ 
      message: "Leave updated successfully",
      leave: updatedLeave 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};