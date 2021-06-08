import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

export function Button({ title, ...rest }) {
  return (
    <TouchableOpacity
      style={styles.container}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
