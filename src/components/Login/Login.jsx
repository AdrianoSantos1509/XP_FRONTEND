import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (error) {
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>XP Investimentos</h1>
        <h2 style={styles.subtitle}>Login</h2>

        {erro && <p style={styles.erro}>{erro}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    width: '360px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: {
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: '4px',
    fontSize: '22px',
  },
  subtitle: {
    color: '#4a90d9',
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cccccc',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#4a90d9',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '8px',
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    fontSize: '13px',
  },
};

export default Login;