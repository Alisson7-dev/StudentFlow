const token = sessionStorage.getItem('token');
if (!token) window.location.href = '/views/login.html';

let alunoEditandoId = null;

const API =  ("/alunos")

const formContainer = document.getElementById('formContainer');
const formTitle = document.getElementById('title');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');

document.getElementById('btnAdd').addEventListener('click', () => {
  abrirForm();
});

document.getElementById('cancelar').addEventListener('click', () => {
  fecharForm();
});

document.getElementById('salvar').addEventListener('click', salvarAluno);

async function carregarAlunos() {
  const res = await fetch(API);
  const alunos = await res.json();

  const lista = document.getElementById('listaAlunos');
  lista.innerHTML = '';

  alunos.forEach(aluno => {
    const row = `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>
          <button class="editar" onclick="editarAluno(${aluno.id}, '${aluno.nome}', '${aluno.email}')">Editar</button>
          <button class="excluir" onclick="deletarAluno(${aluno.id})">Excluir</button>
        </td>
      </tr>
    `;
    lista.innerHTML += row;
  });
}

function abrirForm(aluno = null) {
  formContainer.style.display = 'flex';

  if (aluno) {
    formTitle.innerText = 'Editar Aluno';
    inputNome.value = aluno.nome;
    inputEmail.value = aluno.email;
    alunoEditandoId = aluno.id; // 🔥 guarda o id
  } else {
    formTitle.innerText = 'Novo Aluno';
    inputNome.value = '';
    inputEmail.value = '';
    alunoEditandoId = null; // 🔥 limpa
  }
}

function fecharForm() {
  formContainer.style.display = 'none';
}

async function salvarAluno() {
  const nome = inputNome.value;
  const email = inputEmail.value;

  const aluno = { nome, email };

  if (alunoEditandoId) {
    await fetch(`${API}/${alunoEditandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  }

  fecharForm();
  carregarAlunos();
}

function editarAluno(id, nome, email) {
  abrirForm({ id, nome, email });
}

async function deletarAluno(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  carregarAlunos();
}
//logout
document.getElementById('logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '/views/login.html';
});

carregarAlunos();
