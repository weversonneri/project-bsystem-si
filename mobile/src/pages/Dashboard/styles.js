import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   width: '100%',
  // },
  // content: {
  //   flex: 1,
  //   width: '100%',
  //   justifyContent: 'center',
  // },

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
  greeting: {
    color: colors.white,
    fontSize: 20,
  },
  username: {
    color: colors.orange,
    fontFamily: fonts.regular,
    fontWeight: '700',
    fontSize: 23,
  },
  bodyTitle: {
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    fontSize: 23,
    color: colors.textTitle,

    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  spotlight: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },

});
