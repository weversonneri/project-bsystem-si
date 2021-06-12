import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './style';
import colors from '../../styles/colors';
import api from '../../services/api';

const profileValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required'),
  // email: yup
  //   .string()
  //   .email('Please enter valid email')
  //   .required('Email is required'),
  // password: yup
  //   .string()
  //   .min(6, ({ min }) => `Password must be at least ${min} characters`)
  //   .required('Password is required'),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password')], 'Passwords do not match')
  //   .required('Confirm password is required'),
});

export function Profile() {
  const { signOut, user, updateProfile } = useAuth();

  const navigation = useNavigation();

  async function handleUpdateProfile(values) {
    try {
      const response = await api.put('/profile', values);

      updateProfile(response.data.user);

      Alert.alert(
        'Perfil atualizado com sucesso!',
      );
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro ao atualizar perfil',
        err.response.data.message,
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <RectButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" style={styles.titleIcon} />
        </RectButton>
        <Text style={styles.titleText}>
          Meu Perfil
        </Text>
        <Text style={{ paddingHorizontal: 10 }} />
      </View>

      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Image
          source={
            user.avatar
              ? { uri: user.url }
              : { uri: `https://ui-avatars.com/api/?name=${user.name}` }
          }
          style={styles.profileImg}
        />

        <View style={{ flex: 1 }}>
          <RectButton style={{ width: 50, height: 25, backgroundColor: colors.green }} title="SignOut" onPress={signOut} />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Formik
              validationSchema={profileValidationSchema}
              initialValues={{
                name: '',
                // email: '',
                // phoneNumber: '',
                // password: '',
                // confirmPassword: '',
              }}
              onSubmit={(values) => handleUpdateProfile(values)}
            >
              {({ handleSubmit, isValid }) => (
                <>
                  <Field
                    component={Input}
                    name="name"
                    icon="user"
                    placeholder="Digite seu nome"
                  />
                  {/* <Field
                    component={Input}
                    name="email"
                    icon="mail"
                    placeholder="Digite seu email "
                    keyboardType="email-address"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  /> */}

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

      </ScrollView>
    </View>
  );
}
