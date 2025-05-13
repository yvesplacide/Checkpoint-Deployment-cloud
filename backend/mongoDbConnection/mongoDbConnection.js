require("dotenv").config()
const mongoose = require("mongoose")

const mongoDbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI),
        console.log("connection reussie a MongoDB")
        
    } catch (error) {
        console.log("connection echouee a MongoDB", error)
        
    }
}

module.exports = mongoDbConnection