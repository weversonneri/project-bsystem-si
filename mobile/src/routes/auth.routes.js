import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ForgotPassword } from '../pages/ForgotPassword';

import colors from '../styles/colors';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
