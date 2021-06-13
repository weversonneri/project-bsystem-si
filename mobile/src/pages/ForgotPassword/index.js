import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather as Icon } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';
import colors from '../../styles/colors';
import { styles } from './styles';

const forgotPassValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Precisamos de um email válido')
    .required('Preencha com seu email'),
});

export function ForgotPassword() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  async function handleForgotPassword(values) {
    try {
      await api.post('/forgot-password', values);

      setModalVisible(!modalVisible);
    } catch (err) {
      Alert.alert(
        'Erro ao tentar recuperar senha',
        'Verifique se digitou seu email corretamente',
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
        <StatusBar backgroundColor={colors.gray} />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.container}>

            <View style={styles.header}>
              <RectButton onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" style={styles.goBackButton} />
              </RectButton>
              <Text style={styles.headerText}>
                Recuperar senha
              </Text>
              <Text style={{ paddingHorizontal: 20 }} />
            </View>

            <View style={{ flex: 1, paddingTop: 40 }}>

              <Text style={styles.contentText}>
                Informe seu email cadastrado e receba as instruções para recuperar sua senha
              </Text>

              <Formik
                validationSchema={forgotPassValidationSchema}
                initialValues={{
                  email: '',
                }}
                onSubmit={(values) => handleForgotPassword(values)}
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        presentationStyle="fullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Icon name="check-circle" style={styles.modalIcon} />
          <Text style={styles.modalText}>
            Um email foi enviado para seu email cadastrado
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setTimeout(() => {
                navigation.goBack();
              }, 100);
            }}
          >
            <Text style={styles.buttonText}>Ok, continuar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </>
  );
}
