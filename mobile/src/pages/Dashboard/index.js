import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../contexts/auth';

const Dashboard = () => {
  const { handleSignOut, user } = useAuth();

  console.log(user)

  return (
    <View View >
      <Button title="SignOut" onPress={handleSignOut} />
    </View >
  )
}

export default Dashboard;
