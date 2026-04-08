require('dotenv').config()
const express = require("express")
const cors = require("cors")
const path = require("path")


const authRoutes = require("./src/routes/authRoutes")
const alunoRoutes = require("./src/routes/alunoRoutes")
const dashboardRoutes = require ("./src/routes/dashboardRoutes")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/", authRoutes)
app.use(express.static(path.join(__dirname, 'src', 'public',"login.html")))



app.use("/alunos", alunoRoutes)
app.use("/dashboard",dashboardRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log( `Server running on port ${PORT}` ))
console.log("AUTH ROUTES LOADED")
