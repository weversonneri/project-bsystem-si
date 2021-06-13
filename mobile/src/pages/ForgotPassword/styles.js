import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: colors.white,
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
  contentText: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.textNormal,
  },
  buttonContainer: {
    paddingTop: 40,
  },

  modalView: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  modalIcon: {
    fontSize: 50,
    color: colors.green,
    alignSelf: 'center',

    paddingVertical: 40,
  },
  modalButton: {
    backgroundColor: colors.orange,
    height: 56,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: fonts.regular,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
