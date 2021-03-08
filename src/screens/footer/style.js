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
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: actuatedNormalizeW(30),
        marginTop: actuatedNormalizeH(10)
    },
    subDiv: {
        alignItems: 'center'
    },
    inactive: {
        color: '#fff',
        marginTop: 5
    },
    active: {
        color: '#E4234B',
        marginTop: 5
    }
});

export default styles;