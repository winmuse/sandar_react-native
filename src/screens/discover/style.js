import {
    Dimensions,
    StyleSheet,
    Platform,
    PixelRatio
} from 'react-native';
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
        width: windowWidth
    },
    container: {
        width: windowWidth,
        height: global.windowHeight,
        alignItems: 'center',
        backgroundColor: '#1B1D26',
        flexDirection: 'column',
        paddingTop: actuatedNormalizeH(80),
    },
    txtcss: {
        color: '#C6C6CA',
        fontSize: actuatedNormalizeW(12),
    },
    circle: {
        width: actuatedNormalizeW(90),
        height: actuatedNormalizeW(90),
        backgroundColor: '#979797',
        borderRadius: 100,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: actuatedNormalizeW(30),
        marginBottom: actuatedNormalizeH(10)
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
        justifyContent: 'center'
    },
    articleDiv: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff'
    }
});

export default styles;