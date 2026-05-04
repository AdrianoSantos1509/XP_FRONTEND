import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import api from '../../services/api';

const ContaDigital = () => {
  const { user } = useAuth();
  const [saldo, setSaldo] = useState(0);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarSaldo = async () => {
      try {
        const response = await api.get(`/conta/${user.id}/saldo`);
        setSaldo(response.data.saldo);
      } catch (error) {
        setErro('Erro ao buscar saldo!');
      }
    };
    if (user) buscarSaldo();
  }, [user]);

  const handleDeposito = async () => {
    try {
      setErro('');
      const response = await api.post('/conta/deposito', {
        codCliente: user.id,
        valor: Number(valor),
      });
      setSaldo(response.data.novoSaldo);
      setMensagem('Depósito realizado com sucesso!');
      setValor('');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao realizar depósito!');
    }
  };

  const handleSaque = async () => {
    try {
      setErro('');
      const response = await api.post('/conta/saque', {
        codCliente: user.id,
        valor: Number(valor),
      });
      setSaldo(response.data.novoSaldo);
      setMensagem('Saque realizado com sucesso!');
      setValor('');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao realizar saque!');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Conta Digital</h2>

      <div style={styles.saldoCard}>
        <p style={styles.saldoLabel}>Saldo disponível</p>
        <p style={styles.saldoValor}>R$ {Number(saldo).toFixed(2)}</p>
      </div>

      {mensagem && <p style={styles.sucesso}>{mensagem}</p>}
      {erro && <p style={styles.erro}>{erro}</p>}

      <div style={styles.form}>
        <input
          style={styles.input}
          type="number"
          placeholder="Digite o valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <div style={styles.botoes}>
          <button style={styles.btnDeposito} onClick={handleDeposito}>
            Depositar
          </button>
          <button style={styles.btnSaque} onClick={handleSaque}>
            Sacar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '16px',
    fontSize: '20px',
  },
  saldoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  saldoLabel: {
    color: '#aaaaaa',
    fontSize: '14px',
    marginBottom: '8px',
  },
  saldoValor: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 'bold',
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
  botoes: {
    display: 'flex',
    gap: '12px',
  },
  btnDeposito: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#4caf50',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  btnSaque: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#f44336',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  sucesso: {
    color: 'green',
    fontSize: '13px',
    marginBottom: '8px',
  },
  erro: {
    color: 'red',
    fontSize: '13px',
    marginBottom: '8px',
  },
};

export default ContaDigital;