import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,

  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  cardDescription: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceInfo: {
    flexShrink: 1,
    marginHorizontal: 5,
  },
  buttonSubmit: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 10,

    backgroundColor: colors.green,

    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonSubmitText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.white,
  },
  buttonSubmitIcon: {
    fontSize: 12,
    paddingRight: 5,
    color: colors.white,
  },

});
