import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const storagedToken = localStorage.getItem('@Bsys:token');
    const storagedUser = localStorage.getItem('@Bsys:user');

    if (storagedToken && storagedUser) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(storagedToken)}`;

      // const isExpired = jwt_decode(storagedToken);
      // if (isExpired.exp < new Date().getTime()) {
      //   console.log('Sua sessaõ expirou', 'Realize o login novamente');
      //   // signOut();
      // }

      const user = JSON.parse(storagedToken);

      return { user };
    }
    return {};
  });

  const history = useHistory();

  // useEffect(() => {
  //   const token = localStorage.getItem('@Bsys:token');
  //   const user = localStorage.getItem('@Bsys:user');

  //   if (token) {
  //     api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  //     setUserData(JSON.parse(user));
  //   }

  //   setLoading(false);
  // }, []);

  async function handleSignIn({ email, password }) {
    try {
      const response = await api.post('/auth', {
        email,
        password,
      });

      setData(response.data.user);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      localStorage.setItem('@Bsys:token', JSON.stringify(response.data.token));
      localStorage.setItem('@Bsys:user', JSON.stringify(response.data.user));

      history.push('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem('@Bsys:token');
    if (token) {
      return true;
    }
    return false;
  };

  function handleSigOut() {
    localStorage.removeItem('@Bsys:token');
    localStorage.removeItem('@Bsys:user');

    setData({});
    history.push('/');
  }

  return (
    <AuthContext.Provider value={
      {
        data,
        isAuthenticated,
        handleSignIn,
        handleSigOut,
      }
    }
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
