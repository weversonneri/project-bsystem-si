import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignIn, signed } = useAuth();

  console.log(signed);

  async function handleSubmit() {
    await handleSignIn({ email, password });

    console.log('DADOS: ');
  }
  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </View >
      <View>
        <Button title="SignIn" onPress={handleSubmit} ></Button>
      </View >
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});


export default SignIn;
