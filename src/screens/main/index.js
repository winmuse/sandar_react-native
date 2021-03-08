import React from 'react';
import {ScrollView, View, Platform, PixelRatio, Dimensions} from 'react-native';
import Styles from './style';
import Sidebar from '../component/sidebar/Basic';

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
const App = (props) => {
  var objects = props.navigation.getParam('seconds');
  console.log('main component------------>', objects); 

  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <Sidebar
          navigation={props.navigation}
          screen={props.navigation.getParam('screenflag')}
          objects={props.navigation.getParam('objects')}
          index={props.navigation.getParam('index')}
          artistTitle={props.navigation.getParam('artistTitle')}
          whoosh={props.navigation.getParam('whoosh')}
          seconds={props.navigation.getParam('seconds')}
        />
      </View>
    </ScrollView>
  );
};

export default App;
