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
        flexDirection: 'column',
        width: windowWidth,
        height: global.windowHeight,
        alignItems: 'center',
        backgroundColor: '#1B1D26',
        justifyContent: 'center'
    },
    tabDiv: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: actuatedNormalizeW(20),
    },
    success: {
        alignItems: 'center',
        marginBottom: actuatedNormalizeH(50)
    },
    btnDiv: {
        width: '100%',
        alignItems: 'center',
        marginTop: actuatedNormalizeH(50)
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
    forgotTxt: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: actuatedNormalizeW(12),
        color: '#C6C6CA',
        textAlign: 'center'
    }
});

export default styles;