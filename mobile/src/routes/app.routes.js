import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import colors from '../styles/colors';

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
      component={Dashboard}
    />

    <AppStack.Screen
      name="Profile"
      component={Profile}
    />

  </AppStack.Navigator>
);

export default AppRoutes;
