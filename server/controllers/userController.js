import User from "../models/User.js"; // Importing the User model
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for token generation

//Register User : /api/user/register

export const register = async (req , res) => {
    try {
        const {name , email , password} = req.body; // destructuring the request body

        if(!name || !email || !password){
            return res.json({success : false , message: "Missing Details"}); // if any field is empty, return an error message
        }
        const existingUser = await User.findOne({email}); // check if the user already exists
        if(existingUser){
            return res.json({success : false , message: "User Already Exists"}); // if user exists, return an error message
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ // create a new user
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "7d"}); // generate a token for the user

        res.cookie('token', token , {
            httpOnly: true,
            secure: true ,// process.env.NODE_ENV === "production", // Set secure cookie in production
            sameSite: "None", //process.env.NODE_ENV === "production" ? 'none' : "strict", //CSRF protection  
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success : true , user: {email: user.email , name: user.name}}); // return the user details and success message
    } catch (error) {
        console.log(error.message); // log the error message
        res.json({success : false , message: error.message}); // return an error message if any error occurs
    }
}

// Login User : /api/user/login

export const login = async (req , res) => {
    try {
        const {email , password} = req.body; // destructuring the request body

        if(!email || !password){
            return res.json({success : false , message: "Email and Password are required"}); // if any field is empty, return an error message
        }
        const user = await User.findOne({email}); // check if the user exists

        if(!user){
            return res.json({success : false , message: "Invalid Credentials"}); // if user does not exist, return an error message
        }

        const isMatch = await bcrypt.compare(password , user.password); // compare the password with the hashed password

        if(!isMatch){
            return res.json({success : false , message: "Invalid Credentials"}); // if password does not match, return an error message
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "7d"}); // generate a token for the user

        res.cookie('token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict", //CSRF protection  
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success : true , user: {email: user.email , name: user.name}}); // return the user details and success message
    } catch (error) {
        console.log(error.message); // log the error message
        res.json({success : false , message: error.message}); // return an error message if any error occurs
    }
}


// Check Auth : /api/user/is-auth
export const isAuth = async (req , res) => {
    try {
        const {userId} = req.body; // destructuring the request body
        const user = await User.findById(userId).select("-password"); // find the user by id
        return res.json({success : true , user}); // return the user details and success message
    } catch (error) {
        console.log(error.message); // log the error message
        res.json({success : false , message: error.message}); // return an error message if any error occurs
    }
}


// Logout User : /api/user/logout
export const logout = async (req , res) => {
    try {
        res.clearCookie('token' , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : "strict", //CSRF protection
        });
        return res.json({success : true , message: "Logout Successfully"}); // return success message
    } catch (error) {
        console.log(error.message); // log the error message
        res.json({success : false , message: error.message}); // return an error message if any error occurs
    }
}
