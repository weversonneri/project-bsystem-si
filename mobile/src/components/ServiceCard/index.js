import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { styles } from './styles';

export function ServiceCard({ data, ...rest }) {
  return (
    <View style={styles.container}>
      <View style={{
        borderBottomWidth: 1,
        borderColor: colors.shape,
        width: '90%',
        alignSelf: 'center',
      }}
      />
      <View style={styles.cardContainer}>

        <View style={styles.cardDescription}>

          <View style={styles.serviceInfo}>
            <Text style={{
              color: colors.textNormal, fontFamily: fonts.semiBold, fontSize: 16,
            }}
            >
              {data.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
              <View>
                <Text style={{ fontSize: 10, color: colors.textNormal }}>
                  a partir de
                </Text>
                <Text style={{ fontSize: 14, color: colors.textNormal }}>
                  {data.description}
                  {' '}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: colors.textNormal }}>
                (
                {' '}
                +/-
                {' '}
                {data.duration}
                min)
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonSubmit}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        >
          <Icon name="calendar" style={styles.buttonSubmitIcon} />
          <Text style={styles.buttonSubmitText}>
            Agendar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
