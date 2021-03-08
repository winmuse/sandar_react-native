import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  PixelRatio,
  Dimensions,
  Image,
} from 'react-native';
import Styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-paper';
import Footer from '../footer';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const App = (props) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        <ScrollView style={Styles.scroll}>
        <View style={{ alignItems: 'center' ,backgroundColor:'#E4234B',    paddingBottom: actuatedNormalizeH(40)}}>
            <Image style={Styles.avatar} source={{ uri }} />
            <Text style={[Styles.txtcss, { marginTop: actuatedNormalizeH(10) }]}>
              Niles Peppertrout
            </Text>
          </View>
          <View style={Styles.menuDiv}>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Profile');
              }}>
              <View style={Styles.item}>
                <Text style={Styles.txtcss}>Edit Profile</Text>
                <Icon name={'chevron-right'} color="#fff" size={20} />
              </View>
            </TouchableOpacity>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Your Email</Text>
              <Icon name={'chevron-right'} color="#fff" size={20} />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ResetPass');
              }}>
              <View style={Styles.item}>
                <Text style={Styles.txtcss}>Reset Password</Text>
                <Icon name={'chevron-right'} color="#fff" size={20} />
              </View>
            </TouchableOpacity>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Notifications</Text>
              <Switch style={{color:'#E4234B'}}value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Location</Text>
              <Icon name={'chevron-right'} color="#fff" size={20} />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Subscriptions</Text>
              <Icon name={'chevron-right'} color="#fff" size={20} />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Support Terms and Conditions</Text>
              <Icon name={'chevron-right'} color="#fff" size={20} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={props.navigation} />
    </View>
  );
};

export default App;
