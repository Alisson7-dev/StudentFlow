document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if(res.ok) {
      sessionStorage.setItem('token', data.token);  
      window.location.href = './dashboard.html';
    } else {
      document.getElementById('error').innerText = data.msg || 'Erro no login';
    }
  } catch(err) {
    document.getElementById('error').innerText = 'Erro de conexão';
  }
});
