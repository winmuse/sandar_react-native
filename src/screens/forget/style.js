import { Dimensions, StyleSheet, Platform, PixelRatio } from 'react-native';
import '../../config/global';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleW = windowWidth / 320;
const scaleH = windowHeight / 480;
function actuatedNormalizeW(size) {
  const newSize = size * scaleW;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
function actuatedNormalizeH(size) {
  const newSize = size * scaleH;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const styles = StyleSheet.create({
  scroll: {
    height: windowHeight,
    width: windowWidth,
  },
  container: {
    flexDirection: 'column',
    width: windowWidth,
    height: global.windowHeight,
    alignItems: 'center',
    backgroundColor: '#1B1D26',
  },
  inputTxt: {
    borderColor: '#787C85',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: actuatedNormalizeH(15),
    paddingHorizontal: actuatedNormalizeH(15),
    color: '#fff'
  },
  tabTxtactive: {
    fontFamily: 'Nunito',
    fontSize: actuatedNormalizeW(18),
    padding: 10,
    fontWeight: 'bold',
    color: '#787C85',
    borderBottomColor: '#E4234B',
    borderBottomWidth: 3,
  },
  tabTxtdisable: {
    fontFamily: 'Nunito',
    fontSize: actuatedNormalizeW(18),
    padding: 10,
    fontWeight: 'bold',
    color: '#C6C6CA',
  },
  tabDiv: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalizeW(20),
  },
  topDiv: {
    flexDirection: 'row',
    width: '80%',
    marginTop: actuatedNormalizeH(70),
    marginBottom: actuatedNormalizeH(50),
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: actuatedNormalizeW(40),
  },
  hidding: {
    display: 'none',
  },
  forgetTxt: {
    color: '#E4234B',
    fontSize: actuatedNormalizeW(12),
    fontFamily: 'Nunito',
  },
  btnDiv: {
    width: '100%',
    alignItems: 'center',
    marginTop: actuatedNormalizeH(50),
  },
  btnTxt: {
    fontFamily: 'Roboto',
    fontSize: actuatedNormalizeW(11),
    padding: 10,
  },
  btnSignup: {
    backgroundColor: '#E4234B',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
  },
  bottomDiv: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: actuatedNormalizeH(20),
  },
  forgotTxt: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: actuatedNormalizeW(18),
    color: '#C6C6CA',
  },
});

export default styles;
