import React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

export function Profile() {
  const { signOut, user } = useAuth();

  const navigation = useNavigation();

  return (
    <>

      <View style={{ flex: 1 }}>

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Text>
            Profile
          </Text>

          <View style={{ flex: 1 }}>
            <Button title="SignOut" onPress={signOut} />
          </View>

        </ScrollView>
      </View>
    </>

  );
}
