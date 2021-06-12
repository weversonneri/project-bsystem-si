import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  scrollListContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBackButton: {
    fontSize: 25,
    color: colors.textTitle,
  },
  headerText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 32,
    color: colors.textTitle,
  },
  profileImgContainer: {
    marginTop: 10,
  },
  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fonts.regular,

    alignSelf: 'flex-start',

    paddingTop: 15,
    paddingBottom: 3,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
});
