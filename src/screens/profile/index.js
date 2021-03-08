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
  TouchableOpacity,
} from 'react-native';
import Styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Switch} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';

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
  const [itemVal, setItemValue] = React.useState('man');
  const [photo, setPhoto] = React.useState(null);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response.uri);
        console.log(response.uri)
      }
    });
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        <ScrollView style={Styles.scroll}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#E4234B',
              paddingBottom: actuatedNormalizeH(20),
            }}>
            {/* <Image style={Styles.avatar} source={{ uri }} /> */}
            {photo === null ? (
              <Image source={{uri}} style={Styles.avatar} />
            ) : (
              <Image source={{uri: photo}} style={Styles.avatar} />
            )}
            <Text style={[Styles.txtcss, {marginTop: actuatedNormalizeH(10)}]}>
              Niles Peppertrout
            </Text>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Text
                style={[Styles.txtcss, {marginTop: actuatedNormalizeH(10)}]}>
                Change your profile photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.menuDiv}>
            <View style={Styles.item}>
              <Text style={Styles.txtcss}>User Name</Text>
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
              <Text style={Styles.txtcss}>Your Email</Text>
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
              <Text style={Styles.txtcss}>Location</Text>
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
              <Text style={Styles.txtcss}>Gender</Text>
              <Picker
                mode="dropdown"
                backgroundColor="#fff"
                itemStyle={{color: '#fff'}}
                style={{width: '58%', color: '#fff'}}
                selectedValue={itemVal}
                onValueChange={(value, index) => {
                  setItemValue(value);
                }}>
                <Picker.Item value="man" label="Man" />
                <Picker.Item value="woman" label="Woman" />
              </Picker>
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
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <View
              style={{
                marginVertical: actuatedNormalizeH(40),
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={Styles.btnDiv}>
                <Text style={[Styles.btnTxt, {color: '#fff'}]}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default App;
