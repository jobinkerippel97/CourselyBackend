const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail:{ 
        type: String,
        default:"https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg"
    },
    duration:{ 
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    syllabus: String,
    price: Number,
   
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor"
    }

  });

  const Course = mongoose.model('Course', CourseSchema);

  module.exports = {Course}