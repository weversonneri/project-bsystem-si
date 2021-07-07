/* eslint-disable no-nested-ternary */
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather as Icon } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useAuth } from '../../contexts/auth';

export function AppointmentCard({ data, handleRemove, ...rest }) {
  const { user } = useAuth();

  const formatHour = format(parseISO(data.date), 'HH:mm');
  const formatDay = format(parseISO(data.date), 'PP', { locale: ptBR });

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Icon name="trash" size={25} color="#fff" />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <View style={styles.container}>

        <RectButton
          style={styles.cardContainer}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        >
          <View style={styles.appointmentDetail}>
            <Image
              source={user.scopes[0] === 'USER'
                ? (data.provider.avatar
                  ? { uri: data.provider.url }
                  : { uri: `https://ui-avatars.com/api/?name=${data.provider.name}` })
                : (data.user.avatar
                  ? { uri: data.user.url }
                  : { uri: `https://ui-avatars.com/api/?name=${data.user.name}` })}
              style={styles.customerImg}
            />

            <View style={styles.appointmentInfo}>
              <Text style={{
                color: colors.textNormal, fontFamily: fonts.regular, fontWeight: '700', fontSize: 18,
              }}
              >
                {user.scopes[0] === 'USER' ? (data.provider.name.length < 17
                  ? `${data.provider.name}`
                  : `${data.provider.name.substring(0, 15)}...`)
                  : (data.user.name.length < 17
                    ? `${data.user.name}`
                    : `${data.user.name.substring(0, 15)}...`)}
              </Text>
              <Text style={styles.serviceName}>
                {data.service.title}
              </Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'column',
            paddingBottom: 5,
            paddingTop: 15,
          }}
          >
            <Text style={{
              fontSize: 10, paddingBottom: 3, color: colors.darkgray, fontWeight: '500',
            }}
            >
              Data do Agendamento
            </Text>
            {/* <Icon name="clock" size={10} /> */}
            <Text style={styles.date}>
              {formatDay}
              {' - '}
              {formatHour}
              {' '}
              hs
            </Text>
          </View>

        </RectButton>
      </View>
    </Swipeable>

  );
}
