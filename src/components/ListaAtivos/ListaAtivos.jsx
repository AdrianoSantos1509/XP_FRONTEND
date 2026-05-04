import { useState, useEffect } from 'react';
import api from '../../services/api';

const ListaAtivos = () => {
  const [ativos, setAtivos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarAtivos = async () => {
      try {
        const response = await api.get('/ativos');
        // garante que sempre seja um array
        const data = Array.isArray(response.data) ? response.data : [];
        setAtivos(data);
      } catch (error) {
        setErro('Erro ao buscar ativos!');
      }
    };
    buscarAtivos();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ativos Disponíveis</h2>

      {erro && <p style={styles.erro}>{erro}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Quantidade</th>
            <th style={styles.th}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {ativos.map((ativo) => (
            <tr key={ativo.id} style={styles.tr}>
              <td style={styles.td}>{ativo.codAtivo}</td>
              <td style={styles.td}>{ativo.nomeAtivo}</td>
              <td style={styles.td}>{ativo.qtdeAtivo}</td>
              <td style={styles.td}>R$ {Number(ativo.valor).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  title: { color: '#1a1a2e', marginBottom: '16px', fontSize: '20px' },
  erro: { color: 'red', fontSize: '13px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#1a1a2e', color: '#ffffff', padding: '12px', textAlign: 'left', fontSize: '14px' },
  tr: { borderBottom: '1px solid #eeeeee' },
  td: { padding: '12px', fontSize: '14px', color: '#333333' },
};

export default ListaAtivos;