import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import { signIn } from '../services/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStoredData() {
      const storagedToken = await AsyncStorage.getItem('@Bsys:token');
      const storagedUser = await AsyncStorage.getItem('@Bsys:user');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    getStoredData();
  }, []);

  async function handleSignIn({ email, password }) {
    const response = await api.post('/auth', {
      email,
      password,
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else {
        //Something happened in setting up the request that triggered an
        console.log('Error', error.message);
      }
      return error;
    });

    setUser(response.data.user);

    await AsyncStorage.setItem('@Bsys:token', response.data.token);
    await AsyncStorage.setItem('@Bsys:user', JSON.stringify(response.data.user));
  }

  async function handleSignOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, handleSignIn, handleSignOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth, AuthProvider };

