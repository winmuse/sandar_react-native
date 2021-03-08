import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Styles from './style';

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
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Discover'});
        }}>
        <View style={Styles.subDiv}>
          <Image source={require('../../assets/discoverIcon.png')} />
          <Text
            style={props.flag === 'discover' ? Styles.active : Styles.inactive}>
            Discover
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Song'});
        }}>
        <View style={Styles.subDiv}>
          <Image source={require('../../assets/songIcon.png')} />
          <Text style={props.flag === 'song' ? Styles.active : Styles.inactive}>
            Songs
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Video'});
        }}>
        <View style={Styles.subDiv}>
          <Image source={require('../../assets/videoIcon.png')} />
          <Text
            style={props.flag === 'video' ? Styles.active : Styles.inactive}>
            Videos
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Profile');
        }}>
        <View style={Styles.subDiv}>
          <Image source={require('../../assets/UserIcon.png')} />
          <Text
            style={props.flag === 'profile' ? Styles.active : Styles.inactive}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;
