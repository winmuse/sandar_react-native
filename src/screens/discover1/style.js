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
    width: windowWidth,
    height: global.windowHeight,
    alignItems: 'center',
    backgroundColor: '#1B1D26',
    flexDirection: 'column',
    paddingTop: actuatedNormalizeH(80),
  },
  btnDiv: {
    width: '100%',
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: '#E4234B',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
    height: actuatedNormalizeH(40),
    justifyContent: 'center',
  },
  txt16: {
    fontSize: actuatedNormalizeW(12),
    color: '#C6C6CA',
  },
  titleDiv: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: actuatedNormalizeW(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtview: {
    color: '#E4234B',
    fontSize: actuatedNormalizeW(12),
  },
  txt12: {
    fontSize: actuatedNormalizeW(12),
    color: '#787C85',
  },
  circleDiv: {
    backgroundColor: '#D8D8D8',
    width: '90%',
    height: '60%',
    borderRadius: 100,
  },
  rectangleDiv: {
    backgroundColor: '#D8D8D8',
    width: '90%',
    height: '60%',
    borderRadius: 7,
  },
  txt12Div: {
    width: '100%',
    alignItems: 'center',
    marginTop: actuatedNormalizeH(20),
  },
  articleDiv: {
    width: '100%',
    height: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff'
  },
  catagoryDiv: {
    // backgroundColor: '#ff0000',
    width: '100%',
    height: 190,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: actuatedNormalizeW(15),
    marginBottom: actuatedNormalizeH(25),
  },
});

export default styles;
