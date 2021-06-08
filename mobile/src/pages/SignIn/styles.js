import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.purple,
  },
  content: {
    flex: 3,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.purple,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  createAccountText: {
    color: colors.normaltext,
  },
  innerCreateAccountText: {
    color: colors.purple,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
