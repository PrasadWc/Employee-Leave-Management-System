import mongoose from "mongoose";
import Users from "./userModel.js";

const leaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    leaveType: {
        type: String,
        enum: ['annual', 'sick', 'maternity', 'paternity', 'unpaid', 'compassionate', 'other'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
        
    },
    endDate: {
        type: Date,
        required: true
        
    },
    totalLeaveDays: {
        type: Number,
        required: true
    },

    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    reviewComments: {
        type: String,
        trim: true,
        maxlength: 500
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // could be moderator/admin
        default: null
    },
});

const Leaves = mongoose.model("Leaves", leaveSchema);
export default Leaves;