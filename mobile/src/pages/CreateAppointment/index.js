import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';
import { Load } from '../../components/Load';
import { ServiceCard } from '../../components/ServiceCard';

import api from '../../services/api';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    duration: '30',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    duration: '30',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    duration: '30',
  },
];

export function CreateAppointment() {
  const [services, setServices] = useState();
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    async function getServices() {
      try {
        const { data } = await api.get('/services');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        if (!data) {
          return setLoading(true);
        }

        // if (page > 1) {
        //   setAppointment((oldValue) => [...oldValue, ...data.appointment]);
        // } else {
        //   setAppointment(data.appointment);
        // }
        setServices(data.services);
        setLoading(false);
        // setLoadingMore(false);
      } catch (error) {
        Alert.alert('ERRO');
        console.log(error);
      }
    }
    getServices();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Agendamento
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileImgComponent}>
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
      <View />

      <FlatList
        data={services}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={(
          <Text style={styles.flatListTitle}>
            Serviços
          </Text>
        )}
        renderItem={({ item }) => (
          <ServiceCard data={item} onPress={() => navigation.navigate('ConfirmAppointment', { item })} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={(
          <Text
            style={{ paddingHorizontal: 25, paddingVertical: 10 }}
          >
            Nenhum serviço cadastrado
          </Text>
        )}
        refreshing
      />
    </View>
  );
}
