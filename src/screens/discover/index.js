
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  PixelRatio,
  Dimensions,
  Image
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Styles from './style';
import Sidebar from '../component/sidebar/Basic'

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
function App(props) {
  // useEffect(() => {
  var flag = props.navigation.getParam('screenflag');
  console.log("discover component------------>", flag)
  // }, [])
  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <Sidebar navigation={props.navigation} screen={props.navigation.getParam('screenflag')} />
      </View>
    </ScrollView>
  );
};

export default App;
