import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth';

import { Button } from '../../components/Button';
import { styles } from './styles';
import { Input } from '../../components/Input';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor, insira um email válido')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Tamanho mínimo de senha de ${min} caracteres`)
    .required('Password is required'),
});

export function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  async function handleSignIn({ email, password }) {
    await signIn({ email, password });
    console.log('VALORES DE', email, password);
  }

  function handleSigUp() {
    navigation.navigate('SignUp');
  }

  // function handleInputBlur() {
  //   setIsFocused(false);
  //   setIsFilled(!!email);
  // }

  // function handleInpuFocus() {
  //   setIsFocused(true);
  // }

  // function handleInpuChange(value) {
  //   setIsFilled(!!value);
  //   setEmail(value);
  // }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>

            {/* <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite seu email"
                onBlur={handleInputBlur}
                onFocus={handleInpuFocus}
                onChangeText={handleInpuChange}
                keyboardType="email-address"
              />

              <View style={styles.buttonContainer}>
                <Button
                  title="Entrar"
                />
              </View> */}

            <View style={styles.form}>
              <Text style={styles.text}>
                Realizar login
              </Text>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values) => handleSignIn(values)}
              >
                {({ handleSubmit, isValid }) => (
                  <>
                    <Field
                      component={Input}
                      name="email"
                      placeholder="Digite seu email"
                      keyboardType="email-address"
                    />
                    <Field
                      component={Input}
                      name="Digite a sua senha"
                      placeholder="Password"
                      secureTextEntry
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        onPress={handleSubmit}
                        title="Entrar"
                        disabled={!isValid}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <TouchableOpacity
              style={{
                width: '100%', height: 30, justifyContent: 'center', alignItems: 'center',
              }}
              onPress={handleSigUp}
            >
              <Text>
                sdfsd
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
