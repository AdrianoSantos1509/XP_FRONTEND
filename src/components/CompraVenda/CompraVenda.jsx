import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import api from '../../services/api';

const CompraVenda = () => {
  const { user } = useAuth();
  const [ativos, setAtivos] = useState([]);
  const [codAtivo, setCodAtivo] = useState('');
  const [qtde, setQtde] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarAtivos = async () => {
      try {
        const response = await api.get('/ativos');
        setAtivos(response.data);
      } catch (error) {
        setErro('Erro ao buscar ativos!');
      }
    };
    buscarAtivos();
  }, []);

  const handleComprar = async () => {
    try {
      setErro('');
      setMensagem('');
      await api.post('/investimentos/comprar', {
        codCliente: user.id,
        codAtivo: Number(codAtivo),
        qtdeAtivo: Number(qtde),
      });
      setMensagem('Compra realizada com sucesso!');
      setQtde('');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao realizar compra!');
    }
  };

  const handleVender = async () => {
    try {
      setErro('');
      setMensagem('');
      await api.post('/investimentos/vender', {
        codCliente: user.id,
        codAtivo: Number(codAtivo),
        qtdeAtivo: Number(qtde),
      });
      setMensagem('Venda realizada com sucesso!');
      setQtde('');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao realizar venda!');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Compra e Venda de Ativos</h2>

      {mensagem && <p style={styles.sucesso}>{mensagem}</p>}
      {erro && <p style={styles.erro}>{erro}</p>}

      <div style={styles.form}>
        <select
          style={styles.input}
          value={codAtivo}
          onChange={(e) => setCodAtivo(e.target.value)}
        >
          <option value="">Selecione um ativo</option>
          {ativos.map((ativo) => (
            <option key={ativo.id} value={ativo.id}>
              {ativo.codAtivo} - {ativo.nomeAtivo} - R$ {Number(ativo.valor).toFixed(2)}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Quantidade"
          value={qtde}
          onChange={(e) => setQtde(e.target.value)}
        />

        <div style={styles.botoes}>
          <button style={styles.btnComprar} onClick={handleComprar}>
            Comprar
          </button>
          <button style={styles.btnVender} onClick={handleVender}>
            Vender
          </button>
        </div>
      </div>

      <h3 style={styles.subtitle}>Minha Carteira</h3>
      <CarteiraCliente userId={user?.id} />
    </div>
  );
};

const CarteiraCliente = ({ userId }) => {
  const [carteira, setCarteira] = useState([]);

  useEffect(() => {
    const buscarCarteira = async () => {
      try {
        const response = await api.get(`/investimentos/${userId}`);
        setCarteira(response.data);
      } catch (error) {
        console.error('Erro ao buscar carteira');
      }
    };
    if (userId) buscarCarteira();
  }, [userId]);

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Código</th>
          <th style={styles.th}>Nome</th>
          <th style={styles.th}>Quantidade</th>
          <th style={styles.th}>Preço Médio</th>
        </tr>
      </thead>
      <tbody>
        {carteira.map((item) => (
          <tr key={item.id} style={styles.tr}>
            <td style={styles.td}>{item.Ativo?.codAtivo}</td>
            <td style={styles.td}>{item.Ativo?.nomeAtivo}</td>
            <td style={styles.td}>{item.qtdeAtivo}</td>
            <td style={styles.td}>R$ {Number(item.valorMedio).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  container: { padding: '24px' },
  title: { color: '#1a1a2e', marginBottom: '16px', fontSize: '20px' },
  subtitle: { color: '#1a1a2e', marginTop: '32px', marginBottom: '16px', fontSize: '18px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cccccc', fontSize: '14px', outline: 'none' },
  botoes: { display: 'flex', gap: '12px' },
  btnComprar: { flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#4caf50', color: '#ffffff', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' },
  btnVender: { flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#f44336', color: '#ffffff', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' },
  sucesso: { color: 'green', fontSize: '13px', marginBottom: '8px' },
  erro: { color: 'red', fontSize: '13px', marginBottom: '8px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#1a1a2e', color: '#ffffff', padding: '12px', textAlign: 'left', fontSize: '14px' },
  tr: { borderBottom: '1px solid #eeeeee' },
  td: { padding: '12px', fontSize: '14px', color: '#333333' },
};

export default CompraVenda;