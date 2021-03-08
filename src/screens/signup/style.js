import {Dimensions, StyleSheet, Platform, PixelRatio} from 'react-native';
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
    marginVertical: actuatedNormalizeH(10),
    paddingLeft: actuatedNormalizeW(20),
    color: '#fff',
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
    width: '60%',
    justifyContent: 'space-between',
    marginTop: actuatedNormalizeH(50),
    marginBottom: actuatedNormalizeH(20),
  },
  hidding: {
    display: 'none',
  },
  forgetTxt: {
    color: '#E4234B',
    fontSize: actuatedNormalizeW(12),
    fontFamily: 'Nunito',
  },
  checkbox: {
    margin: 0,
    padding: 0,
    marginTop: actuatedNormalizeH(10),
    backgroundColor: '#1B1D26',
    borderWidth: 0,
  },
  btnDiv: {
    width: '100%',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Roboto',
    fontSize: actuatedNormalizeW(13),
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
});

export default styles;
