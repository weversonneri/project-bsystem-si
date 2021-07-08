import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';
import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStoredData() {
      const storagedToken = await AsyncStorage.getItem('@Bsys:token');
      const storagedUser = await AsyncStorage.getItem('@Bsys:user');

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        const isExpired = jwt_decode(storagedToken);
        if (isExpired.exp < Date.now() / 1000) {
          Alert.alert('Sua sessão expirou', 'Realize o login novamente');
          signOut();
        }

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

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    await AsyncStorage.setItem('@Bsys:token', response.data.token);
    await AsyncStorage.setItem('@Bsys:user', JSON.stringify(response.data.user));
  }

  async function updateProfile(user) {
    await AsyncStorage.setItem('@Bsys:user', JSON.stringify(user));

    setData(user);
  }

  async function signOut() {
    try {
      await AsyncStorage.clear();
      setData(null);
    } catch (e) {
      console.error(e);
    }

    console.log('Done.');
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

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
