import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState('');
  // const [permission, setPermission] = useState('');
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('@Bsys:token');
    const user = localStorage.getItem('@Bsys:user');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setUserData(JSON.parse(user));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }) {
    const { data: { token, user } } = await api.post('/api/auth', {
      email,
      password,
    });

    setUserData(user);

    localStorage.setItem('@Bsys:token', JSON.stringify(token));
    localStorage.setItem('@Bsys:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/dashboard');
  }

  function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('@Bsys:token');
    localStorage.removeItem('@Bsys:user');

    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return (
    <AuthContext.Provider value={
      {
        userData,
        authenticated,
        handleLogin,
        handleLogout,
        loading,
      }
    }
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
