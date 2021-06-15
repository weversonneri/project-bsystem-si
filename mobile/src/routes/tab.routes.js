import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import { Platform } from 'react-native';
import { CreateAppointment } from '../pages/CreateAppointment';
import { Dashboard } from '../pages/Dashboard';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const TabRoutes = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.purple,
      inactiveTintColor: colors.textNormal,
      labelPosition: 'beside-icon',
      style: {
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        height: 70,
      },
    }}
  >
    <AppTab.Screen
      name="Agendamentos"
      component={Dashboard}
      options={{
        tabBarIcon: (({ size, color }) => (
          <Feather
            name="list"
            size={size}
            color={color}
          />
        )),
      }}
    />

    <AppTab.Screen
      name="Novo agendamento"
      component={CreateAppointment}
      options={{
        tabBarIcon: (({ size, color }) => (
          <Feather
            name="plus-circle"
            size={size}
            color={color}
          />
        )),
      }}
    />

  </AppTab.Navigator>
);

export default TabRoutes;
