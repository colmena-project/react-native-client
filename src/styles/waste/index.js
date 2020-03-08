import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import iPhoneSize from '../../utils/display';

let headingTextSize = 30;
if (iPhoneSize() === 'small') {
  headingTextSize = 26;
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.colmenaBackground,
  },
  scrollViewWrapper: {
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    height: 50,
  },
  brandText: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '300',
    fontSize: headingTextSize,
    color: colors.colmenaGrey,
  },
  colmenaLogo: {
    resizeMode: 'stretch',
    marginRight: 10,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnSubmit: {
    width: '100%',
    backgroundColor: colors.colmenaGreen,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btnSubmitDisabled: {
    width: '100%',
    backgroundColor: colors.colmenaGreenDisabled,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  wrapperCenter: {
    alignContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '900',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#212121',
  },
  box: {
    borderRadius: 5,
    backgroundColor: colors.gray07,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 20,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  boxImage: {
    resizeMode: 'contain',
    padding: 10,
    width: 80,
    height: 80,
  },
  amount: {
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  amountText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: '#212121',
  },
  checkText: {
    fontFamily: 'Montserrat-Medium',
  },
});

export default styles;
