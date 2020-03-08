import {StyleSheet} from 'react-native';
import iPhoneSize from '../../utils/display';
import colors from '../../styles/colors';
import {Directions} from 'react-native-gesture-handler';

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
    marginTop: 20,
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
    paddingTop: 10,
    flex: 1,
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  colmenaLogo: {
    resizeMode: 'stretch',
    marginRight: 10,
  },
  brandText: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '300',
    fontSize: headingTextSize,
    color: colors.colmenaGrey,
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
    marginTop: 0,
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
  forgot: {
    color: colors.colmenaGreen,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#212121',
  },
  btnRegistrarse: {
    width: '65%',
    backgroundColor: '#757575',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  RegistrarseText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontWeight: '800',
  },
  btnFacebook: {
    padding: 30,
    alignItems: 'center',
  },
});

export default styles;
