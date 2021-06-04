import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.purple,
    color: colors.orange,
    fontSize: 18,
    width: '100%',
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    textAlign: 'left',
    color: colors.red,
  },
  errorInput: {
    borderColor: colors.red,
  },
});
