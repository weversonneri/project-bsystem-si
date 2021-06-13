import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../contexts/auth';

import { Button } from '../../components/Button';
import { styles } from './styles';
import { Input } from '../../components/Input';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Precisamos de um email válido')
    .required('Preencha com seu email'),
  password: yup
    .string()
    .min(6, ({ min }) => `A senha precisa ter no minimo ${min} caracteres`)
    .required('Preencha sua senha'),
});

export function SignIn() {
  const { signIn } = useAuth();

  const navigation = useNavigation();

  async function handleSignIn({ email, password }) {
    try {
      await signIn({ email, password });
    } catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer login, verifique suas credenciais e tente novamente.',
      );
    }
  }

  function handleSigUp() {
    navigation.navigate('SignUp');
  }

  return (
    <>
      <StatusBar backgroundColor={colors.purple} />

      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              MEUSALAO.ONLINE
            </Text>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

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
                      icon="mail"
                      placeholder="Digite seu email "
                      keyboardType="email-address"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
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
                        title="Entrar"
                        disabled={!isValid}
                      />
                    </View>
                  </>
                )}
              </Formik>
              <TouchableOpacity style={styles.buttonForgotPassword}>
                <Text style={{ color: colors.purple }}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.createAccountTContainer}>
        <TouchableOpacity
          style={styles.createAccountTButton}
          onPress={handleSigUp}
        >
          <Text style={styles.createAccountText}>
            Novo por aqui?
            {' '}
            <Text style={styles.innerCreateAccountText}>
              Cadastre-se
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
