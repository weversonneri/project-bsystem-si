import React from 'react';
import { View, Text, FlatList } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export function Staff() {
  return (
    <View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={(
          <Text>
            Agendamentos
          </Text>
        )}
        renderItem={({ item }) => (
          <Text>ok</Text>
        )}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={(
          <Text
            style={{ paddingHorizontal: 25, paddingVertical: 10 }}
          >
            Você não possui serviço agendado
          </Text>
        )}
      />
    </View>
  );
}
