import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54,
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
});
