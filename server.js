const express = require("express")
const cors = require("cors")
const path = require("path")
require('dotenv').config()

const authRoutes = require("./src/routes/authRoutes")
const alunoRoutes = require("./src/routes/alunoRoutes")
const dashboardRoutes = require ("./src/routes/dashboardRoutes")
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get("/views/login.html", (req,res) => {
  res.sendFile(path.join(__dirname, "src", "views", "login.html"))
})
app.get('/views/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'dashboard.html'));
});
app.get('/views/alunos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'alunos.html'));
});
app.get('/views/mensalidades.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'mensalidades.html'));
});

app.use("/", authRoutes)
app.use("/alunos", alunoRoutes)
app.use("/dashboard",dashboardRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log( `Server running on port ${PORT}` ))
