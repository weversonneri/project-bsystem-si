import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
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
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

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
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={colors.purple} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontFamily: fonts.semiBold, fontSize: 25 }}>
              MEUSALAO.ONLINE
            </Text>
          </View>

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
              </View>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ paddingBottom: 20, backgroundColor: colors.white, width: '100%' }}>
        <TouchableOpacity
          style={{
            width: '100%', height: 30, justifyContent: 'center', alignItems: 'center',
          }}
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
    </SafeAreaView>
  );
}
