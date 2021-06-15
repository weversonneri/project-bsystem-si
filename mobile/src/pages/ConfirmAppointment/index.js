import React, { useEffect, useState } from 'react';
import {
  View, Text, Alert, FlatList, Image, TouchableOpacity, Modal, ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';
import { Load } from '../../components/Load';
import { styles } from './styles';
import api from '../../services/api';
import colors from '../../styles/colors';

const monthsName = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
  'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const weekdayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function ConfirmAppointment() {
  const [providers, setProviders] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);

  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  const { user } = useAuth();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    async function getProviders() {
      try {
        const { id } = route.params.item;
        const { data } = await api.get(`/providers?service=${id}`);

        if (!data) {
          return setLoading(true);
        }
        setProviders(data.providers);
        setLoading(false);
      } catch (err) {
        Alert.alert('ERRO');
        console.error(err);
      }
    }
    getProviders();
  }, []);

  useEffect(() => {
    async function getAvailability() {
      try {
        // const { id } = selectedProvider;

        //  const { data } = await api.get(`/providers/${id}/availability`, {
        //   params: {
        //     year: selectedDate.getFullYear(),
        //     month: selectedDate.getMonth() + 1,
        //     day: selectedDate.getDate(),
        //   },
        //  });
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        // if (!data) {
        //   return setLoading(true);
        // }
        // setProviders(data.providers);
        // setLoading(false);
      } catch (err) {
        Alert.alert('ERRO');
        console.error(err);
      }
    }
    getAvailability();
  }, [selectedProvider]);

  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    const days = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const newListDays = [];

    for (let i = 1; i < days; i++) {
      const d = new Date(selectedYear, selectedMonth, i);
      const year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      const selDate = `${year}-${month}-${day}`;

      newListDays.push({
        status: selDate,
        weekday: weekdayName[d.getDay()],
        number: i,
      });
    }

    setListDays(newListDays);
    setSelectedDay(1);
    setListHours([]);
    setSelectedHour(0);
  }, [selectedYear, selectedMonth]);

  function handlePrevious() {
    const mounthDate = new Date(selectedYear, selectedMonth, 1);
    mounthDate.setMonth(mounthDate.getMonth() - 1);
    setSelectedYear(mounthDate.getFullYear());
    setSelectedMonth(mounthDate.getMonth());
    setSelectedDay(1);
  }
  function handleFoward() {
    const mounthDate = new Date(selectedYear, selectedMonth, 1);
    mounthDate.setMonth(mounthDate.getMonth() + 1);
    setSelectedYear(mounthDate.getFullYear());
    setSelectedMonth(mounthDate.getMonth());
    setSelectedDay(1);
  }

  if (loading) return <Load />;

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <RectButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" style={styles.goBackButton} />
          </RectButton>
          <Text style={styles.headerText}>
            Confirmar agendamento
          </Text>
          <Text style={{ paddingHorizontal: 10 }} />
        </View>

        <View style={styles.container}>
          <View style={styles.confirmService}>
            <Text style={styles.confirmServiceText}>
              {route.params.item.title}
            </Text>
          </View>

          <View style={styles.providerContainer}>
            <Text style={styles.providertitle}>
              Cabeleireiro
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <View style={styles.providerDetails}>
                <Image
                  source={
                    // eslint-disable-next-line no-nested-ternary
                    !selectedProvider
                      ? { uri: 'https://ui-avatars.com/api/?name=.' }
                      : (selectedProvider.avatar
                        ? { uri: selectedProvider.url }
                        : { uri: `https://ui-avatars.com/api/?name=${selectedProvider.name}` })
                  }
                  style={styles.providerImg}
                />
                <Text style={styles.providerName}>
                  {!selectedProvider ? 'Selecione o profissional'
                    : (
                      <Text style={styles.providerName}>
                        {selectedProvider.name.length < 21
                          ? `${selectedProvider.name}`
                          : `${selectedProvider.name.substring(0, 20)}...`}
                      </Text>
                    )}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.providerSelectButton}
              >
                <Text style={styles.providerSelectButtonText}>
                  Selecionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.month}>
              <TouchableOpacity
                onPress={handlePrevious}
                style={styles.monthIcon}
              >
                <Icon name="chevron-left" size={20} />
              </TouchableOpacity>

              <Text style={styles.monthText}>
                {monthsName[selectedMonth]}
                {' '}
                de
                {' '}
                {selectedYear}
              </Text>

              <TouchableOpacity
                onPress={handleFoward}
                style={styles.monthIcon}
              >
                <Icon name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              snapToAlignment={selectedDay}
              style={styles.dayContainer}
            >
              {listDays.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedDay(item.number)}
                  style={[
                    styles.day,
                    { backgroundColor: item.number === selectedDay ? colors.orange : colors.white },
                  ]}
                >
                  <Text style={styles.dayName}>
                    {item.weekday}
                  </Text>
                  <Text style={styles.dayNumber}>
                    {item.number}
                  </Text>
                </TouchableOpacity>
              ))}

            </ScrollView>
          </View>

        </View>

      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="x" style={styles.modalIcon} />
            </TouchableOpacity>

            <View>
              <Text style={styles.modalTitle}>
                Selecione um profissional
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <FlatList
                data={providers}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProvider(item);
                      setModalVisible(!modalVisible);
                    }}
                    style={{ flex: 1 }}
                  >
                    <View style={{ alignItems: 'center', marginVertical: 15 }}>
                      <Image
                        source={
                          item.avatar
                            ? { uri: item.url }
                            : { uri: `https://ui-avatars.com/api/?name=${item.name}` }
                        }
                        style={styles.providerImg}
                      />
                      <Text style={{ fontSize: 15 }}>
                        {(item.name).split(' ')[0].length < 12
                          ? `${(item.name).split(' ')[0]}`
                          : `${(item.name).split(' ')[0].substring(0, 10)}...`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
              />
            </View>

          </View>
        </View>
      </Modal>
    </>

  );
}
