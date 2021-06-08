import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.purple,
  },
  title: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleIcon: {
    fontSize: 20,
    color: colors.white,
    padding: 5,
    backgroundColor: '#717DAD',
    borderRadius: 10,
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.white,
  },
  form: {
    borderTopLeftRadius: 30,
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
});
