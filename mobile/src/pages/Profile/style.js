import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleIcon: {
    fontSize: 25,
    color: colors.textTitle,
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 32,
    color: colors.textTitle,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
});
