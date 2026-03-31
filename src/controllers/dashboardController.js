const fs = require('fs');
const path = require('path');

const alunosPath = path.join(__dirname, '../database/alunos.json');

function getDashboardResumo(req, res) {
  try {
    const alunos = JSON.parse(fs.readFileSync(alunosPath, 'utf-8'));

    let totalAlunos = alunos.length;
    let mensalidadesPagas = 0;
    let mensalidadesPendentes = 0;
    let totalMensalidades = 0;

    alunos.forEach(aluno => {
      (aluno.mensalidades || []).forEach(m => {
        totalMensalidades++;

        if (m.status === 'paga') {
          mensalidadesPagas++;
        } else {
          mensalidadesPendentes++;
        }
      });
    });

    const percentualPagas = totalMensalidades
      ? ((mensalidadesPagas / totalMensalidades) * 100).toFixed(1)
      : 0;

    res.json({
      totalAlunos,
      mensalidadesPagas,
      mensalidadesPendentes,
      percentualPagas
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao carregar dashboard' });
  }
}

module.exports = { getDashboardResumo };