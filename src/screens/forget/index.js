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
  Image,
} from 'react-native';
import { WToast } from 'react-native-smart-tip';
import Styles from './style';
import firebaseAction from '../../firebaseAction';

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
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passconfirm, setPassconfirm] = React.useState('');
  const [btnflag, setBtnflag] = React.useState(true);

  useEffect(() => {
    if (email !== '' && pass !== '' && passconfirm !== '') setBtnflag(false);
    else setBtnflag(true);
  }, [email, pass, passconfirm]);

  const handleChangepass = () => {
    if (pass !== passconfirm) {
      const toastOpts = {
        data: 'The email and password you entered are not correct.',
        textColor: '#ffffff',
        backgroundColor: '#ff0000',
        width: '100%',
        duration: WToast.duration.LONG,
        position: WToast.position.TOP,
      };
      WToast.show(toastOpts);
    } else {
      let flag = false;
      let key = '';
      firebaseAction.getUsers((res) => {
        res.forEach((element) => {
          let item = element.val();
          if (item.email === email) {
            key = element.key;
            flag = true;
          }
        });
      });
      if (flag) {
        firebaseAction.updatePassword(key, pass);
        props.navigation.navigate('Forgetsuccess');
      } else {
        const toastOpts = {
          data: 'The email you entered is not a registered user.',
          textColor: '#ffffff',
          backgroundColor: '#ff0000',
          width: '100%',
          duration: WToast.duration.LONG,
          position: WToast.position.TOP,
        };
        WToast.show(toastOpts);
      }
      // console.log(key);
    }
  };

  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.topDiv}>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <Image
                source={require('../../assets/leftIcon.png')}
                style={Styles.leftIcon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={Styles.forgotTxt}>Forgot Password?</Text>
          </View>
        </View>
        <View style={Styles.tabDiv}>
          <View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Your Email Adress"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              style={Styles.inputTxt}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={Styles.inputTxt}
              underlineColorAndroid="transparent"
              placeholder="Your New Password"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => {
                setPass(text);
              }}
            />
            <TextInput
              style={Styles.inputTxt}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              secureTextEntry={true}
              value={passconfirm}
              onChangeText={(text) => {
                setPassconfirm(text);
              }}
            />
          </View>

          <View style={Styles.btnDiv}>
            <TouchableOpacity
              style={Styles.btnSignup}
              onPress={() => {
                handleChangepass();
              }}
              disabled={btnflag}>
              <Text style={[Styles.btnTxt, { color: '#fff' }]}>
                Reset My Password!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
