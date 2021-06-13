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

    padding: 5,
    borderRadius: 15,
  },
  headerText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 32,
    color: colors.textTitle,
  },
  profileImgContainer: {
    marginTop: 10,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.gray,
    elevation: 3,
  },
  profileImg: {
    width: 110,
    height: 110,
    borderRadius: 90,
  },
  addphotoIcon: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    color: colors.white,
    backgroundColor: colors.orange,
    padding: 6,
    borderRadius: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fonts.regular,

    alignSelf: 'flex-start',

    paddingTop: 15,
    paddingBottom: 3,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',

    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  logoutButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: fonts.regular,
    color: colors.red,
  },
});
