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

export function AppointmentCard({ data, handleRemove, ...rest }) {
  const formatHour = format(parseISO(data.date), 'HH:mm');
  const formatDay = format(parseISO(data.date), 'PP', { locale: ptBR });

  const formatedName = `${(data.user.name).split(' ')[0]} ${(data.user.name).split(' ')[1] ? (data.user.name).split(' ')[1] : ''}`;

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
          { }
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
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

            <Text style={{ color: colors.purple }}>
              {data.status === 'A'
                ? (
                  <View style={styles.statusActive}>
                    <Text style={styles.statusActiveText}>Ativo</Text>
                  </View>
                )
                : (
                  <View style={styles.statusCanceled}>
                    <Text style={styles.statusCanceledText}>Cancelado</Text>
                  </View>
                )}
            </Text>
          </View>

          <View style={styles.appointmentDetail}>
            <Image
              source={
                data.user.avatar
                  ? { uri: data.user.url }
                  : { uri: `https://ui-avatars.com/api/?name=${data.user.name}` }
              }
              style={styles.customerImg}
            />

            <View style={styles.appointmentInfo}>
              <Text style={{
                color: colors.textTitle, fontFamily: fonts.regular, fontWeight: '700', fontSize: 18,
              }}
              >
                {formatedName}
              </Text>
              <Text>
                {data.service.title}
              </Text>
            </View>
          </View>
        </RectButton>
      </View>
    </Swipeable>

  );
}
