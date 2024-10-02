const handleError = async (error, req, res, next) => {
    try {
        const statuscode = error.statuscode || 500;
        const message = error.message || "Somthing went wrong please try again later "

        res.status(statuscode).json({message})

    } catch (error) {
        
            res.status(error.statuscode || 500).json({message: error.message || "Internal Server Error"})
     
}

}

module.exports = {handleError}