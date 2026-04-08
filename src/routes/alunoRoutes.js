const express = require("express")
const router = express.Router()
const alunoController = require("../controllers/alunoController")

router.get("/", alunoController.getAll)
router.post("/", alunoController.add)
router.put("/:id", alunoController.edit)
router.delete("/:id", alunoController.delete)
router.get("/mensalidades",(req, res) => alunoController.getMensalidades(req, res))
router.put("/:alunoId/mensalidades/:mensalidadeId", (req, res) => {
    alunoController.marcarComoPago(req, res)
})
module.exports = router