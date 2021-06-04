import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import colors from '../../styles/colors';
import api from '../../services/api';

// SignUp.js
const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required'),
  // phoneNumber: yup
  //   .string()
  //   .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
  //   .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    // .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    // .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    // .matches(/\d/, 'Password must have a number')
    // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Password must have a special character')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'Passwords do not match')
  //   .required('Confirm password is required'),
});

export function SignUp() {
  const navigation = useNavigation();

  async function handleSignUp(values) {
    try {
      await api.post('/users', values);

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação.',
      );
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro na cadastro',
        err.response.data.message,
      );
    }
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
            <View style={styles.form}>
              <Text style={styles.text}>
                Cadastrar
              </Text>

              <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{
                  name: '',
                  email: '',
                  // phoneNumber: '',
                  password: '',
                  // confirmPassword: '',
                }}
                onSubmit={(values) => handleSignUp(values)}
              >
                {({ handleSubmit, isValid }) => (
                  <>
                    <Field
                      component={Input}
                      name="name"
                      placeholder="Full Name"
                    />
                    <Field
                      component={Input}
                      name="email"
                      placeholder="Email Address"
                      keyboardType="email-address"
                    />
                    {/* <Field
                      component={Input}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      keyboardType="numeric"
                    /> */}
                    <Field
                      component={Input}
                      name="password"
                      placeholder="Password"
                      secureTextEntry
                    />

                    <Button
                      onPress={handleSubmit}
                      title="Cadastrar"
                      disabled={!isValid}
                    />
                  </>
                )}
              </Formik>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
