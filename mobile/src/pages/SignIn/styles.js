import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.purple,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 25,
  },
  form: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.purple,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  buttonForgotPassword: {
    marginTop: 15,
  },
  createAccountTContainer: {
    paddingVertical: 10,
    backgroundColor: colors.white,
    width: '100%',
  },
  createAccountTButton: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: colors.textNormal,
  },
  innerCreateAccountText: {
    color: colors.purple,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
