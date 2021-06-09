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
    padding: 30,

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
  headerTitle: {
    color: colors.white,
  },
});
