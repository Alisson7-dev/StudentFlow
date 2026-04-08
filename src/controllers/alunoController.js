const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "../database/alunos.json")

// Listar todos
exports.getAll = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8")
        const alunos = JSON.parse(data)
        res.json(alunos)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao ler alunos" })
    }
}

// Adicionar novo aluno
exports.add = (req, res) => {
    try {
        const { nome, email, valor } = req.body

        const data = fs.readFileSync(filePath, "utf-8")
        const alunos = JSON.parse(data)

        const newId = Date.now()

        const novaMensalidade = {
            id: Date.now(),
            aluno: nome,
            valor: Number(valor) || 120,
            status: "pendente",
            pago: false,
            mes: new Date().toISOString().slice(0, 7)
        }

        const novoAluno = {
            id: newId,
            nome,
            email,
            mensalidades: [novaMensalidade]
        }

        alunos.push(novoAluno)

        fs.writeFileSync(filePath, JSON.stringify(alunos, null, 2))

        res.json(novoAluno)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao adicionar aluno" })
    }
}

// Editar aluno
exports.edit = (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const data = fs.readFileSync(filePath, "utf-8")
        const alunos = JSON.parse(data)

        const aluno = alunos.find(a => a.id == id)
        if(!aluno) return res.status(404).json({ message: "Aluno não encontrado" })

        aluno.nome = nome
        aluno.email = email

        fs.writeFileSync(filePath, JSON.stringify(alunos, null, 2))
        res.json(aluno)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao editar aluno" })
    }
}

// Deletar aluno
exports.delete = (req, res) => {
    try {
        const { id } = req.params
        const data = fs.readFileSync(filePath, "utf-8")
        let alunos = JSON.parse(data)

        alunos = alunos.filter(a => a.id != id)
        fs.writeFileSync(filePath, JSON.stringify(alunos, null, 2))

        res.json({ message: "Aluno deletado" })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao deletar aluno" })
    }
}
//  mensalidades 
exports.getMensalidades = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8")
        const alunos = JSON.parse(data)

        const mensalidades = []
        alunos.forEach(aluno => {
            if(aluno.mensalidades) {
                aluno.mensalidades.forEach(m => {
                    mensalidades.push({
                        alunoId: aluno.id,        
                        mensalidadeId: m.id,      
                        nome: aluno.nome,
                        valor: m.valor,
                        status: m.status,
                        pago: m.pago
                    })
                })
            }
        })

        res.json(mensalidades)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao ler mensalidades" })
    }
}
exports.gerarMensalidades = (req, res) => {
    try{
    const data = fs.readFileSync(filePath, "utf-8")
    let alunos = JSON.parse(data)

    const mesAtual = new Date().toISOString().slice(0,7)

    alunos.forEach(aluno =>{

        if(!aluno.mensalidades){
            aluno.mensalidades = []
        }
        const jaExiste = aluno.mensalidades.find(m => m.mes === mesAtual)

        if(!jaExiste){
            aluno.mensalidades.push({
                id: Date.now(),
                alunoId:aluno.id,
                valor: 120,
                mes: mesAtual,
                status: "pendente"
            })
        }
    })

    fs.writeFileSync(filePath, JSON.stringify(alunos,null,2))
        res.json({message: "Mensalidades geradas com sucesso"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Erro ao gerar mensalidades"})
    }
}
exports.marcarComoPago = (req, res) => {
    try {
        const { alunoId, mensalidadeId } = req.params

        const data = fs.readFileSync(filePath, "utf-8")
        let alunos = JSON.parse(data)

        const aluno = alunos.find(a => a.id == alunoId)
        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" })
        }

        const mensalidade = aluno.mensalidades.find(m => m.id == mensalidadeId)
        if (!mensalidade) {
            return res.status(404).json({ message: "Mensalidade não encontrada" })
        }

        if (mensalidade.status === "paga") {
            return res.json({ message: "Já está paga" })
        }

        mensalidade.status = "paga"
        mensalidade.pago = true

        fs.writeFileSync(filePath, JSON.stringify(alunos, null, 2))

        res.json({ message: "Mensalidade marcada como paga" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao marcar como paga" })
    }
}