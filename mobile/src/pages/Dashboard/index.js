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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  formatDistance, isToday, parseISO,
} from 'date-fns';
import { pt } from 'date-fns/locale';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

import colors from '../../styles/colors';
import api from '../../services/api';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Load } from '../../components/Load';
import fonts from '../../styles/fonts';

export function Dashboard() {
  const [appointment, setAppointment] = useState(['']);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { user } = useAuth();

  const navigation = useNavigation();

  function handleProfile() {
    navigation.navigate('Profile');
  }

  async function getAppointments() {
    try {
      const { data } = await api.get(`/schedules/?page=${page}&limit=8`);
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
    } catch (error) {
      Alert.alert('ERRO');
      console.log(error);
    }
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

  // const isTodayAppointment = appointment.filter((item) => isToday(parseISO(item.date)));

  if (loading) return <Load />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.purple} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            {(user.name).split(' ')[0]}
            {' '}
            {(user.name).split(' ')[1] ? (user.name).split(' ')[1] : ''}
          </Text>
        </View>
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

      <FlatList
        data={appointment}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={(
          <Text style={styles.bodyTitle}>
            Agendamentos
          </Text>
        )}
        renderItem={({ item }) => (
          <>
            {user.scopes[0] === 'USER'
              ? (
                <View>
                  <Text>ok</Text>
                  <AppointmentCard data={item} />
                </View>
              )
              : <AppointmentCard data={item} />}
          </>
        )}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => handleGetMoreData(distanceFromEnd)}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator color={colors.purple} /> : <></>
        }
        ListEmptyComponent={(
          <Text
            style={{ paddingHorizontal: 25, paddingVertical: 10 }}
          >
            Você não possui serviço agendado
          </Text>
        )}
        refreshing
      />
    </View>

  );
}
