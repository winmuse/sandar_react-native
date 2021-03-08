import { Dimensions, StyleSheet, Platform, PixelRatio } from 'react-native';
import '../../config/global'

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
    height: '100%',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    width: windowWidth,
    height: global.windowHeight,
    alignItems: 'center',
    backgroundColor: '#1B1D26',
  },
  articleDiv: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: actuatedNormalizeW(100),
    height: actuatedNormalizeW(100),
    borderRadius: 100,
    marginTop: actuatedNormalizeH(30),
  },
  txtcss: {
    color: '#F7F8FF',
    fontSize: actuatedNormalizeW(12),
  },
  item: {
    width: '100%',
    marginTop: actuatedNormalizeH(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: '#ff0000',
    // borderBottomWidth: 1
  },
  menuDiv: {
    width: '100%',
    paddingHorizontal: actuatedNormalizeW(30),
    marginTop: actuatedNormalizeH(40),
  },
  inputTxt: {
    borderColor: '#787C85',
    borderWidth: 1,
    borderRadius: 7,
    color: '#fff',
    width: '58%',
    paddingLeft: 10
  },
  btnDiv: {
    backgroundColor: '#E4234B',
    width: '60%',
    borderRadius: 30,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  },
});

export default styles;
