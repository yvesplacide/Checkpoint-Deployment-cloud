require("dotenv").config()
const express = require("express")
const cors = require("cors")

const taskRoutes = require("./routes/taskRoutes")
const mongoDbConnection = require("./mongoDbConnection/mongoDbConnection")

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3017
console.log(PORT)

mongoDbConnection()



app.use("/api/tasks", taskRoutes)


app.listen(PORT, () => {
    console.log(`server demarré sur le http://localhost:${PORT}`)
})



