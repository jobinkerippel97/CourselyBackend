const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
 
  });

  const User = mongoose.model('User', UserSchema);

  module.exports = { User }