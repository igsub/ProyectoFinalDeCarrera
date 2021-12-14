var controller = {
    
    test: (req, res) => {
        res.status(200).send("Funciona!");
    },
    
    getAllDatetimes: (req, res) => {
        
        return res.status(200).send({
            GoogleAPIKey: process.env.GOOGLE_API_KEY
        });
        
    },
}

module.exports = controller;