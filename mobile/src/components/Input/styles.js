import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  input: {
    fontFamily: fonts.regular,
    color: colors.textNormal,
    fontSize: 15,
    padding: 10,
    textAlign: 'left',
    width: '100%',
    marginEnd: 2,
  },
  icon: {
    color: colors.darkgray,
    marginHorizontal: 2,
    fontSize: 15,
  },
  inputIsFocused: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  iconIsFocused: {
    color: colors.purple,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.red,
    alignSelf: 'flex-start',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  errorIcon: {
    color: colors.red,
  },
  succsessIcon: {
    color: colors.purple,
  },
});
