import React from 'react';
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
import {WToast} from 'react-native-smart-tip';
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
  const [rpass, setRpass] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handlechangeemail = (text) => {
    setEmail(text);
  };

  const handlechangeusername = (text) => {
    setUsername(text);
  };

  const handlechangepass = (text) => {
    setPass(text);
  };

  const handlechangerpass = (text) => {
    setRpass(text);
  };

  const signin = () => {
    if (pass !== rpass) {
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
      firebaseAction.pushSignup({name: username, email: email, pass: pass});
      const toastOpts = {
        data: 'success signup',
        textColor: '#ffffff',
        backgroundColor: '#26ce4f',
        width: '100%',
        duration: WToast.duration.LONG,
        position: WToast.position.TOP,
      };
      WToast.show(toastOpts);
      props.navigation.navigate('Signin');
      setUsername('');
      setEmail('');
      setPass('');
      setRpass('');
    }
  };
  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.topDiv}>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signin');
              }}>
              <Text style={Styles.tabTxtdisable}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={Styles.tabTxtactive}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.tabDiv}>
          <View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="User Name"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              style={Styles.inputTxt}
              value={username}
              onChangeText={handlechangeusername}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="E-mail"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              style={Styles.inputTxt}
              value={email}
              onChangeText={handlechangeemail}
            />
            <TextInput
              style={Styles.inputTxt}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              secureTextEntry={true}
              value={pass}
              onChangeText={handlechangepass}
            />
            <TextInput
              style={Styles.inputTxt}
              underlineColorAndroid="transparent"
              placeholder="Confirm Password"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              secureTextEntry={true}
              value={rpass}
              onChangeText={handlechangerpass}
            />
          </View>
          <View
            style={[Styles.btnDiv, {marginVertical: actuatedNormalizeH(20)}]}>
            <TouchableOpacity style={Styles.btnSignup} onPress={signin}>
              <Text style={[Styles.btnTxt, {color: '#fff'}]}>Sign up!</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.btnDiv}>
            <Text style={{color: '#787C85', fontSize: actuatedNormalizeW(11)}}>
              -------------------- <Text style={{color: '#C6C6CA'}}>OR</Text>{' '}
              --------------------
            </Text>
          </View>
          <View style={Styles.bottomDiv}>
            <Image
              source={require('../../assets/facebookIcon.png')}
              alt="facebook"
            />
            <Image
              source={require('../../assets/googleIcon.png')}
              alt="google"
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signinmobile');
              }}>
              <Image
                source={require('../../assets/mobileIcon.png')}
                alt="mobile"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
