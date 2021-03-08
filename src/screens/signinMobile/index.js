import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import IntlPhoneInput from 'react-native-intl-phone-input';
import Styles from './style';
import {saveRemember, saveCategory, getCategory} from '../component/localstorage';

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
  const [phonenumber, setPhonenumber] = React.useState('');
  const [phonenumberconfirm, setPhonenumberconfirm] = React.useState('');
  const [signinflag, setSigninflag] = React.useState(true);
  const [changeflag, setChangeflag] = React.useState('');

  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState('');

  const onChangePhone = ({dialCode, phoneNumber, isVerified}) => {
    if (isVerified) setPhonenumber(dialCode.split('+')[1] + phoneNumber);
    setChangeflag(phoneNumber);
  };

  const onChangePhoneconfirm = ({dialCode, phoneNumber, isVerified}) => {
    if (isVerified) setPhonenumberconfirm(dialCode.split('+')[1] + phoneNumber);
    setChangeflag(phoneNumber);
  };

  useEffect(() => {
    if (phonenumber !== '' && phonenumberconfirm !== '') setSigninflag(false);
    else setSigninflag(true);
  }, [changeflag]);

  const signin = () => {
    // props.navigation.navigate('Verify');
    console.log(phonenumber);
    
    //const confirmation = auth().signInWithPhoneNumber(phonenumber);
    // setConfirm(confirmation);
    //console.log(confirmation);

    saveRemember(true);
    getCategory()
    .then((value) => {
      if (value === 'true')
      {
        console.log("aaaaa");
        props.navigation.navigate('Discover', {screenflag: 'Discover'});
      }
      else if(value === 'false')
      {
        props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
        saveCategory(true);
        console.log("bbbbbbbbb");
      }
      
    })
    .catch((err) => {
      console.log("aaaaa");
      props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
      saveCategory(true);
    });
    props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
    saveCategory(true);
    setEmail('');
    setPassword('');
    setRememberflag(false);
  };

  function confirmCode() {
    try {
      confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.topDiv}>
          <View>
            <TouchableOpacity>
              <Text style={Styles.tabTxtactive}>Mobile Number</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.tabDiv}>
          <View>
            <IntlPhoneInput
              onChangeText={onChangePhone}
              defaultCountry="AF"
              phoneInputStyle={Styles.phonetext}
              placeholder="212-731-9863"
              placeholderTextColor="#787C85"
              value={phonenumber}
              dialCodeTextStyle={Styles.phoneprefix}
              containerStyle={Styles.containerStyle}
            />
            <IntlPhoneInput
              onChangeText={onChangePhoneconfirm}
              defaultCountry="AF"
              phoneInputStyle={Styles.phonetext}
              placeholder="212-731-9863"
              placeholderTextColor="#787C85"
              value={phonenumberconfirm}
              dialCodeTextStyle={Styles.phoneprefix}
              containerStyle={Styles.containerStyle}
            />
          </View>
          <View
            style={[Styles.btnDiv, {marginVertical: actuatedNormalizeH(50)}]}>
            <TouchableOpacity
              disabled={signinflag}
              style={Styles.btnSignup}
              onPress={signin}>
              <Text style={[Styles.btnTxt, {color: '#fff'}]}>Sign Up!</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.btnDiv}>
            <Text style={{color: '#787C85', fontSize: actuatedNormalizeW(11)}}>
              <Text>
                You will receive OTP which you need to enter in order to confirm
                your account.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
