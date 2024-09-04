const jwt = require("jsonwebtoken");

const mentorAuth = (req,res,next)=> {
    try {

        console.log("cookies=====", req.cookies)
        const {token} = req.cookies
        if(!token){
          return res.status(401).json({success: false, message: "Unauthorized access"})
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!verifiedToken){
            return  res.status(401).json({success: false, message: "Mentor Unauthorized "})
        }
        if(verifiedToken.role !=="mentor" && verifiedToken.role !=="admin"){
           return res.status(401).json({success: false, message: "Unauthorized Mentor access"})
        }

        req.user = verifiedToken

        next()

        
    } catch (error) {
        console.log(error)
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server Error"})
    }
}

module.exports = {mentorAuth}