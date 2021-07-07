import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBackButton: {
    fontSize: 20,
    color: colors.textTitle,

    padding: 10,
    borderRadius: 15,
  },
  headerText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 32,
    color: colors.textTitle,
  },
  confirmService: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: colors.shape,

    borderRadius: 15,
  },
  confirmServiceText: {
    color: colors.textNormal,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  providerContainer: {
    borderRadius: 15,

    marginTop: 20,
  },
  providertitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textNormal,
  },
  providerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.gray,
  },
  providerName: {
    fontFamily: fonts.regular,
    color: colors.textNormal,
    fontSize: 15,

    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  providerSelectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

    backgroundColor: colors.purple,
    padding: 8,
  },
  providerSelectIcon: {
    fontSize: 15,
    color: colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 30,
  },
  modalView: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 50,
  },
  modalIcon: {
    fontSize: 18,
    color: colors.darkgray,
  },
  modalTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 20,

  },
  dateContainer: {
    backgroundColor: colors.shape,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
  },
  month: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textTitle,

  },
  monthIcon: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  dayContainer: {
    paddingVertical: 3,
  },
  day: {
    width: 43,
    alignItems: 'center',
    justifyContent: 'center',

    margin: 3,
    backgroundColor: colors.white,

    paddingVertical: 6,
    borderRadius: 7,
  },
  dayName: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  dayNumber: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
  },

  hourContainer: {
    backgroundColor: colors.shape,
    padding: 10,
    borderRadius: 15,
    marginTop: 30,
  },
  hourList: {
    paddingVertical: 3,
  },
  hour: {
    width: 70,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',

    margin: 3,
    backgroundColor: colors.white,

    paddingVertical: 6,
    borderRadius: 7,
  },
  hourNumber: {
    fontFamily: fonts.semiBold,
    color: colors.textTitle,
  },
  emptyData: {
    fontFamily: fonts.regular,
    color: colors.textNormal,
    paddingVertical: 30,
    alignSelf: 'center',
  },
});
