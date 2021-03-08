import {
    Dimensions,
    StyleSheet,
    PixelRatio
} from 'react-native';
import { ceil } from 'react-native-reanimated';
import GlobalFont from 'react-native-global-font'
import '../../config/global'

let fontName = 'Bubble Bobble';
GlobalFont.applyGlobal(fontName);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
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
    container: {
        flexDirection: 'row',
        width: windowWidth,
        height: global.windowHeight,
        flex: 1,
        backgroundColor: '#1B1D26'
    },
    bg_image: {
        width: '100%',
        height: windowHeight + 25,
        backgroundColor: '#D8F4FF',
        alignItems: 'center',
        zIndex: -10,
        position: 'absolute'
    },
    scroll: {
        width: "100%",
        height: windowHeight,
    },
    logo: {
        width: actuatedNormalizeW(170),
        height: actuatedNormalizeH(95),
        marginTop: actuatedNormalizeH(20)
    },
    title: {
        color: '#fff',
        fontSize: actuatedNormalizeW(18),
        marginTop: actuatedNormalizeH(40),
        marginBottom: actuatedNormalizeH(5),
        fontFamily: 'Bubble-Bobble'
    },
    title1: {
        color: '#C6C6CA',
        fontSize: actuatedNormalizeW(12),
        fontFamily: 'Bubble-Bobble',
        textAlign: 'center'
    },
    title2: {
        color: '#999',
        fontSize: actuatedNormalizeW(18),
        fontFamily: 'Bubble-Bobble'
    },
    title3: {
        color: '#ff9900',
        fontSize: actuatedNormalizeW(11),
        marginHorizontal: actuatedNormalizeW(10),
        fontFamily: 'Bubble-Bobble'
    },
    div: {
        width: '100%',
        alignItems: 'center'
    },
    div1: {
        width: '60%',
        textAlign: 'center',
        marginVertical: actuatedNormalizeH(100)
    },
    toptip: {
        color: '#999',
        fontSize: actuatedNormalizeW(22),
        marginVertical: actuatedNormalizeH(4),
        fontFamily: 'Bubble-Bobble'
    },
    smalltxtbg: {
        width: actuatedNormalizeW(90),
        height: actuatedNormalizeH(45),
        position: 'absolute'
    },
    inputdiv: {
        width: '60%',
        alignItems: 'center'
    },
    csstext: {
        fontSize: actuatedNormalizeW(22),
        textAlign: 'center',
        width: actuatedNormalizeW(40),
        color: '#fff',
        fontFamily: 'Bubble-Bobble',
        borderBottomColor: '#ff0000',
        borderBottomWidth: 3
    },
    btnSignup: {
        backgroundColor: '#E4234B',
        width: '60%',
        borderRadius: 30,
        alignItems: 'center',
    },
    btnTxt: {
        fontFamily: 'Roboto',
        fontSize: actuatedNormalizeW(11),
        padding: 10,
    },
    btnDiv: {
        marginTop: actuatedNormalizeH(15),
        alignItems: 'center',
        width: '100%',
        marginTop: actuatedNormalizeH(70)
    }
});

export default styles;