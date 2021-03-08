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
    height: windowHeight ,
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
    width: '100%',
    height: '70%',
    borderRadius: 100,
  },
  rectangleDiv: {
    backgroundColor: '#D8D8D8',
    width: '100%',
    height: '70%',
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
    // height: 190,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    paddingHorizontal: actuatedNormalizeW(20),
    marginBottom: actuatedNormalizeH(25),
  },
  artistItem: {
    // width: actuatedNormalize(110),
    width: '100%',
    height: 110,
    backgroundColor: '#66676c', //a1a3a7
    margin: actuatedNormalizeW(7),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalizeW(10),
  },
  artistDiv: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    paddingHorizontal: actuatedNormalizeW(20),
  },
  artistsubDiv: {
    width: '100%',
    height: '48%',
  },
  artisttitle: {
    color: '#C6C6CA',
    fontSize: actuatedNormalizeW(12),
  },
  playingDivactive: {
    width: '100%',
    paddingHorizontal: actuatedNormalizeW(15),
    position: 'absolute',
    top: windowHeight - 130,
    backgroundColor: '#1D1F30',
  },
  playingDivinactive: {
    display: 'none',
  },
  playingsubDiv: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
  },
  playingIcon: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: actuatedNormalizeW(50),
    height: actuatedNormalizeW(50),
  },
  playingrightDiv: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playingleftDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '55%',
  },
});

export default styles;
