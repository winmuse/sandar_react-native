import {Dimensions, StyleSheet, Platform, PixelRatio} from 'react-native';
import '../../config/global';

global.windowWidth = Dimensions.get('window').width;
global.windowHeight = Dimensions.get('window').height;
const scaleW = global.windowWidth / 320;
const scaleH = global.windowHeight / 480;
function actuatedNormalizeW(size) {
  if (global.windowHeight < 700) global.windowHeight = global.windowHeight - 24;
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
    width: actuatedNormalizeW(global.windowWidth),
    height: global.windowHeight,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: global.windowWidth,
    height: global.windowHeight - 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1D26',
  },
  btnDiv: {
    width: '100%',
    alignItems: 'center',
  },
  btnSignin: {
    backgroundColor: '#fff',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: '#ff0000',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Roboto',
    fontSize: 17,
    padding: 10,
    fontWeight: 'bold',
  },
  logo: {
    borderRadius: 80,
    width: 100,
    height: 100,
  },
});

export default styles;
