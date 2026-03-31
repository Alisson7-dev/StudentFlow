const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const filePath = path.join(__dirname,"../database/admin.json", )

const SECRET = process.env.JWT_SECRET

exports.login = (req,res)=>{
  try {
    const {username,password} = req.body

    const data = fs.readFileSync(filePath)
    const admins = JSON.parse(data)

    const admin = admins.find(a => a.username === username)
    if(!admin) return res.status(401).json({message:"Credenciais inválidas"})

    const validPassword = bcrypt.compareSync(password,admin.password)
    if(!validPassword) return res.status(401).json({message:"Credenciais inválidas"})

    const token = jwt.sign({username: admin.username},SECRET,{expiresIn:"2h"})
    return res.json({message:"Login realizado",token})

  } catch(err) {
    console.error("Erro no login:", err)
    return res.status(500).json({message:"Erro interno no servidor"})
  }
}