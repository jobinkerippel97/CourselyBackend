const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const { generateToken } = require('../utils/token');



const userSignup = async (req,res,next)=> {
    try {
        const {name, email, password, phone, profilepic, courses} = req.body;
        if(!name || !email || !password) {
         return res.status(400).json({sucess: false, message: "all field is required"})
        }
        
        const userExist = await User.findOne({ email })
        if(userExist){
          return  res.status(400).json({success: false, message:"user already exist"})
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
       
        const newUser = new User({name,email,password: hashedPassword, phone, profilepic})
        await newUser.save();

        const token = generateToken(newUser._id, 'user')

        res.cookie("token",token, { httpOnly: true, secure: true})
        res.json({sucess: true, message: "user created sucessfully"})
        console.log(token)

    } catch (error) {
        console.log(error);
       next()
        
    }

}

const userLogedin = async (req,res,next)=> {
    try {
        const {email, password} = req.body
        if(!email || !password){
          return res.status(400).json({sucess: false,  message: "all fields are required"})
        }

        const isuserExist = await User.findOne({email});
        if(!isuserExist){
           return res.status(404).json({sucess: false, message: "user is does not exist"})
        }
        
       const passwordMatch = bcrypt.compareSync(password, isuserExist.password);
       if(!passwordMatch){
       return res.status(401).json({sucess: false, message: "Unauthorized access"})
       }

       const token = generateToken(isuserExist._id, 'user')

       res.cookie("token",token, { httpOnly: true, secure: true})
       res.json({success: true, message: "user Login sucessfully"})

    } catch (error) {
        console.log(error);
       next(error)
        
    }    
}

const userLogout = async (req,res,next)=> {
    try {
        res.clearCookie('token')
        res.json({message: 'User Logout Successfully'})
       

    } catch (error) {
        console.log(error);
        next(error)
        
    }    
}

const getUserById = async (req,res,next)=> {
    try {
        const user = req.user
        // console.log(user, "....====User")
         const userProfile = await User.findById({_id: user.id})
        res.json({success: true, message: 'User get Successfully', data: userProfile})
       

    } catch (error) {
        console.log(error);
       next(error)
        
    }    
}

const checkUser = async (req,res,next)=> {
    try {
        const user = req.user
        if(!user){
            res.status(401).json({success: false, message: 'User Not Authorized'})
        }
        res.json({success: true, message: "user data fetched"})
       
    } catch (error) {
        console.log(error);
        next(error)
        
    }    
}




module.exports = { userSignup, userLogedin, userLogout, getUserById, checkUser}