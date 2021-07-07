import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import { Platform } from 'react-native';
import { CreateAppointment } from '../pages/CreateAppointment';
import { Dashboard } from '../pages/Dashboard';
import { Staff } from '../pages/Staff';
import { Customer } from '../pages/Customer';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const TabRoutes = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.purple,
      inactiveTintColor: colors.textNormal,
      labelPosition: 'below-icon',
      style: {
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        height: 65,
      },
    }}
  >
    <AppTab.Screen
      name="Agendamentos"
      component={Dashboard}
      options={{
        tabBarIcon: (({ size, color }) => (
          <Feather
            name="calendar"
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
    <AppTab.Screen
      name="Staff"
      component={Staff}
      options={{
        tabBarIcon: (({ size, color }) => (
          <Feather
            name="users"
            size={size}
            color={color}
          />
        )),
      }}
    />
    <AppTab.Screen
      name="Customer"
      component={Customer}
      options={{
        tabBarIcon: (({ size, color }) => (
          <Feather
            name="users"
            size={size}
            color={color}
          />
        )),
      }}
    />

  </AppTab.Navigator>
);

export default TabRoutes;
