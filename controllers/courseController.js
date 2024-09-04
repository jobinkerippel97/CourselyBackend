const { Course } = require("../models/courseModel")

const createCourse = async(req,res,next) => {
    try {
        const {title, thumbnail, description, duration, syllabus, price, mentor} = req.body

        if(!title || !description || !duration || !syllabus || !price){
          return res.status(401).json({success: false, message: "All fields are required"})
        }
        
        const isCourseExist = await Course.findOne({title})

        if(isCourseExist){
          return res.staus(400).json({success: false, message: "Course is already exist"})
        }

        const newCourse = new Course({title, description, duration, syllabus,price, mentor})
        console.log(newCourse);
        await newCourse.save();

        res.status(201).json({success: true, message: "Course created successfully", data: newCourse})

        
    } catch (error) {
      console.log(error)
        next(error)
        
    }
}

module.exports = { createCourse }