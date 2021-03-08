import {
    Dimensions,
    StyleSheet,
    Platform,
    PixelRatio
} from 'react-native';
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
    header: {
        position: 'absolute',
        top: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center'
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    headertitle: {
        color: '#fff',
        fontSize: actuatedNormalizeW(18)
    },
    btnDiv: {
        width: '100%',
        alignItems: 'center',
    },
    btnSignup: {
        backgroundColor: '#E4234B',
        width: '80%',
        borderRadius: 12,
        alignItems: 'flex-start',
        paddingLeft:20,
        height: actuatedNormalizeH(25),
        justifyContent: 'center',
    },
    btnTxt: {
        color: '#F7F8FF',
        fontSize: actuatedNormalizeW(12)
    },
    inputTxt: {
      color: '#fff',
      width: actuatedNormalizeW(120),
      height: actuatedNormalizeH(25),
      paddingLeft: 10,
    },
    playingIcon: {
      backgroundColor: '#fff',
      borderRadius: 100,
      width: actuatedNormalizeW(35),
      height: actuatedNormalizeW(35),
    },
});

export default styles;