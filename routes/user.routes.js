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

router.get('/users', async (req,res) => {
    console.log("hello")
    try {
        console.log("hello1")
        const users = await User.find();
        console.log("hello user", users)
        res.status(201).json(users);
    } catch (error) {
        console.log("User not getting from DB");
        res.status(401).json({message: "User not fetching"});
    }
})


router.put('/update/:id', async (req, res) => {
    const { id } = req.params; // User ki ID URL se fetch karo
    const { username, email, password } = req.body; // Update karne ke liye body se data le lo

    try {
        const user = await User.findById(id); // ID ke basis par user dhundo
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt); // Password hash karenga
        }

        await user.save(); // Update save karo
        res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        console.log("Failed to update user", error);
        res.status(500).json({message: "Error in updating user"});
    }
});

// Delete User (DELETE Operation)
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // User ki ID URL se le lo

    try {
        const user = await User.findById(id); // ID ke basis par user dhundoga
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        await user.remove(); // User delete karo
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log("Failed to delete user", error);
        res.status(500).json({message: "Error in deleting user"});
    }
});

export default router;