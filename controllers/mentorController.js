const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/token');
const { Mentor } = require('../models/mentorModel');



const mentorSignup = async (req,res,next)=> {
    try {
        const {name, email, password, phone, profilepic,department,qualification, courses} = req.body;
        if(!name || !email || !password) {
         return res.status(400).json({sucess: false, message: "all field is required"})
        }
        
        const mentorExist = await Mentor.findOne({ email })
        if(mentorExist){
          return  res.status(400).json({success: false, message:"mentor already exist"})
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
       
        const newUser = new Mentor({name,email,password: hashedPassword, phone, department, qualification, profilepic})
        await newUser.save();

        const token = generateToken(newUser._id, 'mentor')

        res.cookie("token",token, { httpOnly: true, secure: true})
        res.json({sucess: true, message: "mentor sign-up sucessfully"})
        console.log(token)

    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({message: error.message || "internel server error"})
        
    }

}

const mentorLogedin = async (req,res,next)=> {
    try {
        const {email, password} = req.body
        if(!email || !password){
          return res.status(400).json({sucess: false,  message: "all fields are required"})
        }

        const isMentorExist = await Mentor.findOne({email});
        if(!isMentorExist){
           return res.status(404).json({sucess: false, message: "Mentor is does not exist"})
        }
        
       const passwordMatch = bcrypt.compareSync(password, isMentorExist.password);
       if(!passwordMatch){
       return res.status(401).json({sucess: false, message: "Unauthorized access"})
       }

       const token = generateToken(isMentorExist._id, 'mentor')

       res.cookie("token",token, { httpOnly: true, secure: true})
       res.json({success: true, message: "Mentor Login sucessfully"})

    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({message: error.message || "internel server error"})
        
    }    
}

const mentorLogout = async (req,res,next)=> {
    try {
        res.clearCookie('token')
        res.json({message: 'Mentor Logout Successfully'})
       

    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server Error"})
        
    }    
}

const getMentorById = async (req,res,next)=> {
    try {
        const mentor = req.user
         const mentorProfile = await Mentor.findById({_id: mentor.id})
        res.json({success: true, message: 'Mentor Fetch Successfully', data: mentorProfile})
       

    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server Error"})
        
    }    
}

const checkMentor = async (req,res,next)=> {
    try {
        const mentor = req.user
        if(!mentor){
            res.status(401).json({success: false, message: 'mentor Not Authorized'})
        }
        res.json({success: true, message: "mentor data fetched"})
       
    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server Error"})
        
    }    
}




module.exports = {mentorSignup, mentorLogedin, mentorLogout, getMentorById, checkMentor}