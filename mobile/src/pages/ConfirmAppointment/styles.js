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
    paddingVertical: 10,

    backgroundColor: colors.shape,

    borderRadius: 15,
  },
  confirmServiceText: {
    color: colors.textNormal,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  providerContainer: {
    borderRadius: 15,

    marginTop: 20,
  },
  providertitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textTitle,
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
    borderRadius: 15,

    backgroundColor: colors.green,
    paddingHorizontal: 10,
  },
  providerSelectButtonText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 12,
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
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
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
    color: colors.textNormal,

  },
  dayNumber: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
});
