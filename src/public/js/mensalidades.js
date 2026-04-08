const token = sessionStorage.getItem('token');
if (!token) window.location.href = '/views/login.html';

const tabelaPagas = document.getElementById('pagas');
const tabelaPendentes = document.getElementById('pendentes');

// Função para carregar e renderizar mensalidades
async function carregarMensalidades() {
  try {
    const res = await fetch('/alunos/mensalidades', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    tabelaPagas.innerHTML = '';
    tabelaPendentes.innerHTML = '';

    data.forEach(m => {
      const row = `
        <tr>
          <td>${m.nome}</td>
          <td>R$ ${m.valor}</td>
          <td>${m.status}</td>
          <td>
            ${
              m.status === 'pendente'
              ? `<button class="paga" onclick="marcarComoPago(${m.alunoId}, ${m.mensalidadeId})">
                   Marcar como paga
                 </button>`
              : `<span style="color: green;"></span>`
            }
          </td>
        </tr>
      `;

      if (m.status === 'paga') {
        tabelaPagas.innerHTML += row;
      } else {
        tabelaPendentes.innerHTML += row;
      }
    });
  } catch (err) {
    console.error('Erro ao carregar mensalidades:', err);
    alert('Não foi possível carregar mensalidades.');
  }
}

// Função global pra marcar mensalidade como paga
window.marcarComoPago = async function(alunoId, mensalidadeId) {
  try {
    await fetch(`http://localhost:3000/alunos/${alunoId}/mensalidades/${mensalidadeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // Atualiza tabela
    carregarMensalidades();
  } catch (err) {
    console.error('Erro ao marcar como paga:', err);
    alert('Não foi possível marcar como paga.');
  }
};

// Logout
document.getElementById('logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = './login.html';
});

// Inicializa tabela ao carregar a página
carregarMensalidades();
