import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import { Image, Platform } from 'react-native';
import { CreateAppointment } from '../pages/CreateAppointment';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';

import colors from '../styles/colors';
import { useAuth } from '../contexts/auth';

const AppTab = createBottomTabNavigator();

const TabRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      {user.scopes[0] === 'USER'
        ? (
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
        )
        : (
          <AppTab.Navigator
            tabBarOptions={{
              activeTintColor: colors.purple,
              inactiveTintColor: colors.textNormal,
              labelPosition: 'below-icon',
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
            <AppTab.Screen
              name="Perfil"
              component={Profile}
              options={{
                tabBarIcon: (({ size, color }) => (
                  <Image
                    source={
                      user.avatar
                        ? { uri: user.url }
                        : { uri: `https://ui-avatars.com/api/?name=${user.name}` }
                    }
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                    }}
                  />
                )),
              }}
            />

          </AppTab.Navigator>
        )}
    </>
  );
};

export default TabRoutes;
