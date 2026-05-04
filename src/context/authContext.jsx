import { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    const response = await api.post('/clientes/login', { email, senha });
    const { token, cliente } = response.data;
    localStorage.setItem('token', token);
    setUser(cliente);
    return cliente;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);