import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Login from './components/Login/Login';
import ListaAtivos from './components/ListaAtivos/ListaAtivos';
import ContaDigital from './components/ContaDigital/ContaDigital';
import CompraVenda from './components/CompraVenda/CompraVenda';

const RotaProtegida = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // adicinei para comprar pelo site

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>XP Inv.</h1>
        <p style={styles.userName}>Olá, {user?.nome}!</p>
        <nav style={styles.nav}>
          <button style={styles.navLink} onClick={() => navigate('/ativos')}>📈 Ativos</button>
          <button style={styles.navLink} onClick={() => navigate('/conta')}>💰 Conta Digital</button>
          <button style={styles.navLink} onClick={() => navigate('/compravenda')}>🔄 Compra/Venda</button>
        </nav>
        <button style={styles.btnLogout} onClick={logout}>Sair</button>
      </aside>
      <main style={styles.main}>
        <Routes>
          <Route path="/ativos" element={<ListaAtivos />} />
          <Route path="/conta" element={<ContaDigital />} />
          <Route path="/compravenda" element={<CompraVenda />} />
          <Route path="*" element={<Navigate to="/ativos" />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <RotaProtegida>
                <Dashboard />
              </RotaProtegida>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f8',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    gap: '8px',
  },
  logo: {
    color: '#4a90d9',
    fontSize: '22px',
    marginBottom: '8px',
  },
  userName: {
    color: '#aaaaaa',
    fontSize: '13px',
    marginBottom: '16px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  btnLogout: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f44336',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: 'auto',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
  },
};

export default App;