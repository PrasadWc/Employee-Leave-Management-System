import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "moderator", "user"],
        default: 'user'
    },
    totalAnnualLeaves: {
        type: Number,
        default: 0
    },
    createdOn:{
        type: Date, default: new Date().getTime()
    }
    
});

const Users = mongoose.model("Users", userSchema);
export default Users;