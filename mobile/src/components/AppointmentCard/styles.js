import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: colors.white,
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
  },
  appointmentDetail: {
    flexDirection: 'row',
    paddingVertical: 15,
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
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15,
  },

});
