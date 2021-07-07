import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.purple,
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 25,

    backgroundColor: colors.purple,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImgComponent: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: colors.orange,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  title: {
    color: colors.orange,
    fontFamily: fonts.regular,
    fontWeight: '700',
    fontSize: 23,
  },
  flatList: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
  },

});
