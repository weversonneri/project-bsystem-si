import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, formatDistance, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

import colors from '../../styles/colors';
import api from '../../services/api';
import { AppointmentCard } from '../../components/AppointmentCard';
import { Load } from '../../components/Load';

export function Dashboard() {
  const [appointment, setAppointment] = useState();
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { user, signOut } = useAuth();

  const navigation = useNavigation();

  function handleProfile() {
    navigation.navigate('Profile');
  }

  async function handleRemove(item) {
    Alert.alert('Cancelar agendamento',
      `Tem certeza de que quer cancelar o agendamento do dia ${format(parseISO(item.date), "dd 'as' H'hs'", { locale: ptBR })}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await api.delete(`/appointments/${item.id}`);
              setLoading(true);
              Alert.alert('Agendamento cancelado',
                `O agendamento do dia ${format(parseISO(item.date), "dd 'as' H'hs'", { locale: ptBR })} foi cancelado`);
              setAppointment((oldData) => (
                oldData.filter((element) => element.id !== item.id)
              ));
              await new Promise((resolve) => setTimeout(resolve, 500));
              setLoading(false);
            } catch (err) {
              Alert.alert('Erro', 'Ocorreu algum erro ao tentar cancelar');
              console.error(err);
            }
          },
        },
      ]);
  }

  async function getAppointments() {
    try {
      let mounted = true;
      const { data } = await api.get(`/schedules/?page=${page}&limit=8`);
      if (!data) {
        return setLoading(true);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const nextTime = formatDistance(
      //   new Date(data.appointment[0].date).getTime(),
      //   new Date().getTime(),
      //   { locale: ptBR },
      // );
      // console.log('🚀 ~ file: index.js ~ line 82 ~ getAppointments ~ nextTime', nextTime);

      if (mounted) {
        if (page > 1) {
          setAppointment((oldValue) => [...oldValue, ...data.appointment]);
        } else {
          setAppointment(data.appointment);
        }
      } else {
        throw new Error('Erro!');
      }
      setLoading(false);
      setLoadingMore(false);

      return () => { mounted = false; };
    } catch (err) {
      // Alert.alert('ERRO');
      console.log(err.response.data.message);
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

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.purple} />

      {user.scopes[0] === 'USER' && (
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Olá,
            </Text>
            <Text style={styles.username}>
              {user.name.length < 17
                ? `${user.name}`
                : `${user.name.substring(0, 15)}...`}
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
      )}

      <FlatList
        style={styles.flatList}
        data={appointment}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={(
          <>
            {user.scopes[0] === 'USER'
              ? (
                <Text style={styles.bodyTitle}>
                  Meus Agendamentos
                </Text>
              )
              : (
                <Text style={styles.bodyTitle}>
                  Agendamentos
                </Text>
              )}
          </>
        )}
        renderItem={({ item }) => (
          <>
            {user.scopes[0] === 'USER'
              ? (
                <View>
                  <AppointmentCard
                    data={item}
                    handleRemove={() => handleRemove(item)}
                  />
                </View>
              )
              : (
                <AppointmentCard
                  data={item}
                  onPress={() => console.log('object')}
                  handleRemove={() => handleRemove(item)}
                />
              )}
          </>
        )}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => handleGetMoreData(distanceFromEnd)}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator color={colors.purple} /> : <></>
        }
        ListEmptyComponent={(
          <>
            {user.scopes[0] === 'USER'
              ? (
                <Text
                  style={{ paddingHorizontal: 25, paddingVertical: 10 }}
                >
                  Você não possui serviço agendado
                </Text>
              )
              : (
                <Text
                  style={{ paddingHorizontal: 25, paddingVertical: 10 }}
                >
                  Você não possui cliente agendado
                </Text>
              )}
          </>
        )}
        refreshing={loadingMore}
        onRefresh={getAppointments}
      />
    </View>

  );
}
