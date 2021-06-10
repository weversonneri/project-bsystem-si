import React from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

import loadAnimation from '../../../assets/loadAnimation.json';
import { styles } from './styles';

export function Load() {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}
