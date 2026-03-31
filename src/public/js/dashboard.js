const token = sessionStorage.getItem('token');
if (!token) window.location.href = '/views/login.html';

async function carregarDashboard() {
  const res = await fetch('/alunos');
  const alunos = await res.json();

  let pagas = 0;
  let pendentes = 0;
  let total = 0;

  alunos.forEach(aluno => {
    (aluno.mensalidades || []).forEach(m => {
      total++;

      if (m.status === 'paga') {
        pagas++;
      } else {
        pendentes++;
      }
    });
  });

  const percentual = total ? ((pagas / total) * 100).toFixed(1) : 0;

  document.getElementById('totalAlunos').innerText = total;
  document.getElementById('pagas').innerText = pagas;
  document.getElementById('pendentes').innerText = pendentes;
  document.getElementById('percentual').innerText = percentual + '%';
}

//logout
document.getElementById('logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '/views/login.html';
});

carregarDashboard();
