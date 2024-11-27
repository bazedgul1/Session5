import express from 'express'
import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs'

const router = express();

router.post('/register', async(req,res) =>{
const {username,email,password} = req.body;

try {
   // checking User Exist
   const userExist = await User.findOne({username});
   if(userExist){
    return res.status(401).json({message: "User Already Exist"});
   } 

   // Password Hashed

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);

   // creating new User

   const newUser = new User({username,email,password: hashedPassword})
   await newUser.save();

   res.status(201).json({message: "User Register Successfully"})
} catch (error) {
    console.log("Failed to Register", error)
}

})

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    // console.log(username, password);
    // res.send(username)
    try {
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({message: "Email not found"});
    }        

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message: "Password is invalid"});
    }
    res.status(201).json({message: "User Login Successfully "});

    } catch (error) {
        console.log("Failed to Login", error)
    }
})

export default router;