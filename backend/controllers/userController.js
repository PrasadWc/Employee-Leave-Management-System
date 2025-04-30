import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


//Create new User
export const createUser = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const { name,email,mobile,role } = req.body;
    const newUser = new Users({
        name,
        email,
        mobile,
        role,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User Added successfully" });
    }catch (error) {
        res.status(500).json(error.message);
      }
};

//Login with Authentication
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Entered Email is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect. Authentication failed" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET_Key,
            { expiresIn: "1h" }
        );

        // Set the cookie and send a response
        res.cookie("authToken", token, { 
            httpOnly: true, 
            secure: false
        });

        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        return res.status(500).json({ message: error.message,});
    }
};

//get user

export const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password"); // Exclude password, otp releated data

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};