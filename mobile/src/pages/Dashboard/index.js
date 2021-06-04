import React from 'react';
import {
  View,
  Button,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useAuth } from '../../contexts/auth';
import { styles } from './styles';

const Dashboard = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Button title="SignOut" onPress={signOut} />
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default Dashboard;
