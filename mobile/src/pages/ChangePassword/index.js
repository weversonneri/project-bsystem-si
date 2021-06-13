import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import colors from '../../styles/colors';
import api from '../../services/api';

const pass = yup.object().shape({

  oldPassword: yup
    .string()
    .min(6, ({ min }) => `A senha precisa ter no minimo ${min} caracteres`)
    .required('Preencha sua senha'),
  password: yup
    .string()
    .min(6, ({ min }) => `A senha precisa ter no minimo ${min} caracteres`)
    .required('Preencha sua senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme sua senha'),
});

export function ChangePassword() {
  const { signOut, user, updateProfile } = useAuth();

  const navigation = useNavigation();

  async function handleChangePassword(values) {
    try {
      console.log('🚀 ~ file: index.js ~ line 50 ~ handleChangePassword ~ values', values);
      await api.put('/profile', values);

      Alert.alert(
        'Senha alterada com sucesso!',
      );
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro ao tentar alterar senha',
        'Senha antiga incorreta',
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={10}
      enabled
    >
      <StatusBar backgroundColor={colors.gray} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <RectButton onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" style={styles.goBackButton} />
            </RectButton>
            <Text style={styles.headerText}>
              Alterar senha de acesso
            </Text>
            <Text style={{ paddingHorizontal: 10 }} />
          </View>

          <Formik
            validationSchema={pass}
            initialValues={{
              oldPassword: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => handleChangePassword(values)}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={Input}
                  name="oldPassword"
                  icon="lock"
                  placeholder="Digite a sua senha de acesso"
                  secureTextEntry
                />

                <Field
                  component={Input}
                  name="password"
                  icon="lock"
                  placeholder="Digite a nova senha"
                  secureTextEntry
                />

                <Field
                  component={Input}
                  name="confirmPassword"
                  icon="lock"
                  placeholder="Confirme a nova senha"
                  secureTextEntry
                />
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit}
                    title="Confirmar alteração"
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
