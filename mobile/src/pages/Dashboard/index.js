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
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Button title="SignOut" onPress={signOut} />
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>

  );
};

export default Dashboard;
