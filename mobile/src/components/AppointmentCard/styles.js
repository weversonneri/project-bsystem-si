import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 3,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.shape,
    marginVertical: 5,
    elevation: 3,

  },
  appointmentDetail: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  customerImg: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  date: {
    color: colors.textNormal,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  statusActive: {
    elevation: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  statusActiveText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusCanceled: {
    elevation: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.red,
  },
  statusCanceledText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonRemove: {
    width: 100,
    height: 130,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 40,
    top: 0,
    paddingLeft: 15,
  },
  serviceName: {
    color: colors.textNormal,
    fontFamily: fonts.regular,
    fontSize: 15,
    marginTop: 5,
  },

});
