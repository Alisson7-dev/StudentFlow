const express = require("express")
const router = express.Router()

const authcontroller = require ("../controllers/authcontroller")

// rota de login 
router.post("/login", authcontroller.login)

module.exports = router