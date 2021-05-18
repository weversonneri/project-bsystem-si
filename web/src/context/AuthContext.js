import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  // const [permission, setPermission] = useState('');

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Bsys:token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

      return { token };
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

  const handleSignIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/api/auth', {
      email,
      password,
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else {
        // Something happened in setting up the request that triggered an
        console.log('Error', error.message);
      }
      return error;
    });

    console.log(response.data);

    const { token, user } = response.data;

    setData(token);

    console.log(token, user);

    localStorage.setItem('@Bsys:token', JSON.stringify(token));
    localStorage.setItem('@Bsys:user', JSON.stringify(user));

    history.push('/dashboard');
  }, []);

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

// const useAuth = () => useContext(AuthContext);

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth, AuthProvider };
