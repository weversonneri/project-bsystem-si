import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStoredData() {
      const storagedToken = await AsyncStorage.getItem('@Bsys:token');
      const storagedUser = await AsyncStorage.getItem('@Bsys:user');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setData(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    getStoredData();
  }, []);

  async function signIn({ email, password }) {
    const response = await api.post('/auth', {
      email,
      password,
    });

    setData(response.data.user);

    await AsyncStorage.setItem('@Bsys:token', response.data.token);
    await AsyncStorage.setItem('@Bsys:user', JSON.stringify(response.data.user));
  }

  async function updateProfile(user) {
    await AsyncStorage.setItem('@Bsys:user', JSON.stringify(user));

    setData(user);
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setData(null);
    });
  }

  return (
    <AuthContext.Provider value={{
      signed: !!data, user: data, signIn, signOut, loading, updateProfile,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth, AuthProvider };
