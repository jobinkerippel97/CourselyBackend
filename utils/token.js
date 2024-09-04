const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const generateToken = (id, role) => {
    try {
        const token = jwt.sign({ id: id, role: role || 'user' }, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.error( error );
       
    }
}

module.exports = { generateToken };