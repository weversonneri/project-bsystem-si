import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import colors from '../styles/colors';
import TabRoutes from './tab.routes';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >

    <AppStack.Screen
      name="Dashboard"
      component={TabRoutes}
    />

    <AppStack.Screen
      name="CreateAppointment"
      component={TabRoutes}
    />

    <AppStack.Screen
      name="Profile"
      component={Profile}
    />

  </AppStack.Navigator>
);

export default AppRoutes;
