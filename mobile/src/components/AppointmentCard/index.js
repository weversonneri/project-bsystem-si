import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { styles } from './styles';

export function AppointmentCard({ data, ...rest }) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {data.user.name}
        {data.id}
      </Text>
    </RectButton>
  );
}
