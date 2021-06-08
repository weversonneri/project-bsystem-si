import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Field, Formik } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import * as yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
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
        'Erro ao realizar cadastro',
        err.response.data.message,
      );
    }
  }

  function handleSigUp() {
    navigation.navigate('SignIn');
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.title}>
        <TouchableOpacity onPress={handleSigUp}>
          <Icon name="chevron-left" style={styles.titleIcon} />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          Cadastrar
        </Text>
        <Text style={{ paddingHorizontal: 10 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 5 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.form}>
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
                      icon="user"
                      placeholder="Digite seu nome"
                    />
                    <Field
                      component={Input}
                      name="email"
                      icon="mail"
                      placeholder="Digite seu email "
                      keyboardType="email-address"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
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
                      icon="lock"
                      placeholder="Digite a sua senha"
                      secureTextEntry
                    />

                    <View style={styles.buttonContainer}>
                      <Button
                        onPress={handleSubmit}
                        title="Enviar"
                        disabled={!isValid}
                      />
                    </View>
                  </>
                )}
              </Formik>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
