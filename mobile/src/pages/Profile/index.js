import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon, MaterialCommunityIcons } from '@expo/vector-icons';
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
    .required('Digite seu nome'),
  email: yup
    .string()
    .email('Precisamos de um email válido')
    .required('Preencha com seu email'),
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

  async function handleUpdateAvatar() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Conceda acesso a galeria de fotos');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    const { uri: image } = result;

    const data = new FormData();

    data.append('avatar', {
      type: 'image/jpg',
      name: `avatar_${user.id}.jpg`,
      uri: image,
    });

    try {
      const response = await api.patch('/users/upload-avatar', data);

      updateProfile(response.data.user);

      Alert.alert(
        'Foto do perfil atualizado com sucesso!',
      );
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro ao atualizar a foto perfil',
        err.response.data.message,
      );
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollListContainer}
          >

            <View style={styles.container}>
              <View style={styles.header}>
                <RectButton onPress={() => navigation.goBack()}>
                  <Icon name="arrow-left" style={styles.goBackButton} />
                </RectButton>
                <Text style={styles.headerText}>
                  Meu Perfil
                </Text>
                <Text style={{ paddingHorizontal: 10 }} />
              </View>

              <TouchableOpacity
                onPress={handleUpdateAvatar}
                style={styles.profileImgContainer}
              >
                <Image
                  source={
                    user.avatar
                      ? { uri: user.url }
                      : { uri: `https://ui-avatars.com/api/?name=${user.name}` }
                  }
                  style={styles.profileImg}
                />
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={18}
                  style={styles.addphotoIcon}
                />
              </TouchableOpacity>

              <Text style={styles.formTitle}>
                Dados
              </Text>

              <Formik
                validationSchema={profileValidationSchema}
                initialValues={{
                  name: user.name,
                  email: user.email,
                  // phoneNumber: '',
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
                    <Field
                      component={Input}
                      name="email"
                      icon="mail"
                      placeholder="Digite seu email "
                      keyboardType="email-address"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />

                    <View
                      style={styles.input}
                    >
                      <Icon name="lock" size={15} color={colors.darkgray} />
                      <Text style={{ color: colors.darkgray }}>
                        ********************
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ChangePassword')}
                        title="ChangePassword Modal"
                      >
                        <Text style={{ color: colors.red }}>
                          Alterar
                        </Text>
                      </TouchableOpacity>
                    </View>

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
            <TouchableOpacity style={styles.logoutButton} title="Sair" onPress={signOut}>
              <Text style={styles.logoutButtonText}>
                Sair do aplicativo
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </>
  );
}
