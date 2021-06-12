import React from 'react';
import {
  FlatList,
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

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
  const { user } = useAuth();

  const navigation = useNavigation();

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
        data={DATA}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={(
          <Text style={styles.bodyTitle}>
            Serviços
          </Text>
        )}
        renderItem={({ item }) => (
          <>
            <View>
              <Text>{item.title}</Text>
              <Text>{item.duration}</Text>
            </View>

          </>
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
