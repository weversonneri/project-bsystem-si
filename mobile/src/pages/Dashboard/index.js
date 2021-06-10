import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

import colors from '../../styles/colors';
import api from '../../services/api';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Load } from '../../components/Load';

export function Dashboard() {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { signOut, user } = useAuth();

  const navigation = useNavigation();

  function handleProfile() {
    navigation.navigate('Profile');
  }

  async function getAppointments() {
    const { data } = await api.get(`/appointments?page=${page}&limit=8`);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setAppointment((oldValue) => [...oldValue, ...data.appointment]);
    } else {
      setAppointment(data.appointment);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleGetMoreData(distance) {
    if (distance < 1) { return; }

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    getAppointments();
  }

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar backgroundColor={colors.purple} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Olá,
          {' '}
          {user.name}
        </Text>
        <View>
          <TouchableOpacity onPress={handleProfile} style={styles.profileImgComponent}>
            <Image
              source={
                user.avatar
                  ? { uri: user.url }
                  : { uri: `https://ui-avatars.com/api/?name=${user.name}` }
              }
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.content}>
          <Button title="SignOut" onPress={signOut} />
        </View> */}

      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{
          fontSize: 24,
          color: colors.heading,
          marginVertical: 20,
        }}
        >
          Agendamentos
        </Text>

        <FlatList
          data={appointment}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <AppointmentCard data={item} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleGetMoreData(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.purple} /> : <></>
          }
        />

      </View>

    </View>

  );
}
