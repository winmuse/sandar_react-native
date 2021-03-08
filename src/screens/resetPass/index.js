import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';

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
  const [itemVal, setItemValue] = React.useState("woman")
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        <ScrollView style={Styles.scroll}>
          <View style={{ alignItems: 'center' }}>
            <Image style={Styles.avatar} source={{ uri }} />
            <Text style={[Styles.txtcss, { marginTop: actuatedNormalizeH(10) }]}>
              Niles Peppertrout
            </Text>
          </View>
          <View style={Styles.menuDiv}>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>E-mail</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                style={Styles.inputTxt}
              // value={email}
              // onChangeText={handleChangeemail}
              />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Current Password</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                style={Styles.inputTxt}
                secureTextEntry
              // value={email}
              // onChangeText={handleChangeemail}
              />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>New Password</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                style={Styles.inputTxt}
                secureTextEntry
              // value={email}
              // onChangeText={handleChangeemail}
              />
            </View>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>Confirm Password</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                style={Styles.inputTxt}
                secureTextEntry
              // value={email}
              // onChangeText={handleChangeemail}
              />
            </View>

            <View
              style={{ marginVertical: actuatedNormalizeH(50), width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={Styles.btnDiv} >
                <Text style={[Styles.btnTxt, { color: '#fff' }]}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default App;
