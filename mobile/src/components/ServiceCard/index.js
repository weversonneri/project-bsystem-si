import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

export function ServiceCard({ data, ...rest }) {
  // const formatHour = format(parseISO(data.date), 'HH:mm');
  // const formatDay = format(parseISO(data.date), 'PP', { locale: ptBR });

  // const formatedName = `${(data.user.name).split(' ')[0]} ${(data.user.name).split(' ')[1] ? (data.user.name).split(' ')[1] : ''}`;

  // morning();
  // {isToday(parseISO(data.date)) && <Text style={{ color: '#000' }}>Hoje</Text>}
  // const nextTime = formatDistance(
  //   new Date(parseISO(data.date)).getTime(),
  //   new Date().getTime, { locale: ptBR },
  // );

  // setnextAppointment(`Proximo atendimento em ${nextTime}`);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>

        <View style={styles.cardDescription}>
          {/* <Image
            source={
              data.avatar
                ? { uri: data.url }
                : { uri: `https://ui-avatars.com/api/?name=${data.title}` }
            }
            style={styles.serviceImg}
          /> */}

          <View style={styles.serviceInfo}>
            <Text style={{
              color: colors.textTitle, fontFamily: fonts.semiBold, fontSize: 14,
            }}
            >
              {data.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 10 }}>
                  a partir de
                </Text>
                <Text style={{ fontSize: 14 }}>
                  R$ 1000,00
                  {' '}
                </Text>
              </View>
              <Text style={{ fontSize: 10 }}>
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
