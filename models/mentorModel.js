const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{ 
        type: String,
        required: true,
        
        unique: true
    },
    password:{ 
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    qualification: {
        type: String
    },
    department : String,
    
    role: {
        type: String,
        enum: ['mentor', 'admin'],
        default: 'mentor'
    },
    profilepic: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
]
 
  },
  {timestamps: true}
);

  const Mentor = mongoose.model('Mentor', MentorSchema);

  module.exports = { Mentor }