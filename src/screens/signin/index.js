import React, {useEffect} from 'react';
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
import firebaseAction from '../../firebaseAction';
import {CheckBox} from 'react-native-elements';
import Styles from './style';
import {saveRemember, saveCategory, getCategory} from '../component/localstorage';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// import { GoogleSignin } from '@react-native-community/google-signin';
// import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId: '34234234234234324',
// });
async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
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
  const [password, setPassword] = React.useState('');
  const [signinflag, setSigninflag] = React.useState(true);
  const [rememberflag, setRememberflag] = React.useState(false);

  const handleChangeemail = (text) => {
    setEmail(text);
  };

  const handleChangepass = (text) => {
    setPassword(text);
  };

  useEffect(() => {
    if (email !== '' && password !== '') setSigninflag(false);
    else setSigninflag(true);
  }, [email, password]);

  const signin = () => {
    let flag = false;
    firebaseAction.getUsers((res) => {
      res.forEach((element) => {
        let item = element.val();
        if (item.email === email && item.pass === password) flag = true;
      });
    });
    if (flag) {
      if (rememberflag) saveRemember(rememberflag);
      
      getCategory()
      .then((value) => {
        if (value === 'true')
        {
          props.navigation.navigate('Discover', {screenflag: 'Discover'});
        }
        else if(value === 'false')
        {
          props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
          saveCategory(true);
        }
      })
      .catch((err) => {
        props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
        saveCategory(true);
      });
      props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
      saveCategory(true);
      setEmail('');
      setPassword('');
      setRememberflag(false);
    } else {
      const toastOpts = {
        data: 'The email and password you entered are not correct.',
        textColor: '#ffffff',
        backgroundColor: '#ff0000',
        width: '100%',
        duration: WToast.duration.LONG,
        position: WToast.position.TOP,
      };
      WToast.show(toastOpts);
    }
  };
  const signinFacebook = () => {
    console.log("facebook");
    LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then((result) => {

        if (result.isCancelled) {
          saveRemember(true);
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {

                    const accessToken = data.accessToken.toString();
                    GetInformationFromToken(accessToken);

                }
            )
        }
    })
    .catch(error => {

        console.log("QQQQQQQ");

    })
  }
  const GetInformationFromToken = (accessToken) => {

    const parameters = {
        fields: {
            string: 'id, name, first_name, email, picture.type(large), quotes',
        },
    };
    const myProfileRequest = new GraphRequest(
        '/me',
        { accessToken, parameters: parameters },
        (error, myProfileInfoResult) => {
            if (error) {

                console.log('login info has error: ' + error);

            } else {

                alert(JSON.stringify(myProfileInfoResult));
                saveRemember(true);
                getCategory()
                .then((value) => {
                  if (value === 'true')
                  {
                    props.navigation.navigate('Discover', {screenflag: 'Discover'});
                  }
                  else if(value === 'false')
                  {
                    props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
                    saveCategory(true);
                  }
                })
                .catch((err) => {
                  saveCategory(true);
                });
                props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
                saveCategory(true);

                setEmail('');
                setPassword('');
                setRememberflag(false);
                // let fbAdd = new Object();
                // fbAdd.account_name = myProfileInfoResult.name; //
                // fbAdd.active = true;
                // fbAdd.avatar = "";
                // fbAdd.checkbox = true;
                // fbAdd.id = 111;
                // fbAdd.name = myProfileInfoResult.first_name; //
                // fbAdd.type = "facebook";

                // let vals = [];
                // snsRes.map((val, index) => {
                //     vals.push(val)
                // })
                // vals.push(fbAdd);

                // setSnsRes(vals);
            }
        },
    );
    new GraphRequestManager().addRequest(myProfileRequest).start();
};
  const signinGoogle = () => {
    console.log("google");
    
    onGoogleButtonPress()
    .then(() => 
    {
      console.log('Signed in with Google!');
      getCategory()
      .then((value) => {
        
        if (value === 'true')
        {
          props.navigation.navigate('Discover', {screenflag: 'Discover'});
        }
        else if(value === 'false')
        {
          props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
          saveCategory(true);
        }
      })
      .catch((err) => {
        saveCategory(true);
      });
      props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
      saveCategory(true);
      setEmail('');
      setPassword('');
      setRememberflag(false);
    
    })
    .catch((error) => {
      console.log('Signed in with Google!');
      getCategory()
      .then((value) => {
        
        if (value === 'true')
        {
          props.navigation.navigate('Discover', {screenflag: 'Discover'});
        }
        else if(value === 'false')
        {
          props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
          saveCategory(true);
        }
      })
      .catch((err) => {
        saveCategory(true);
      });
      props.navigation.navigate('Main', {screenflag: 'What Do You Love?'});
      saveCategory(true);
      setEmail('');
      setPassword('');
      setRememberflag(false);
    });
  }
    
  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.topDiv}>
          <View>
            <TouchableOpacity>
              <Text style={Styles.tabTxtactive}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <Text style={Styles.tabTxtdisable}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.tabDiv}>
          <View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="E-mail"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              style={Styles.inputTxt}
              value={email}
              onChangeText={handleChangeemail}
            />
            <TextInput
              style={Styles.inputTxt}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={handleChangepass}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Forget');
              }}>
              <Text style={Styles.forgetTxt}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              checked={rememberflag}
              containerStyle={Styles.checkbox}
              title="Remember Me"
              onPress={() => {
                setRememberflag(!rememberflag);
              }}
            />
          </View>
          <View
            style={[Styles.btnDiv, {marginVertical: actuatedNormalizeH(20)}]}>
            <TouchableOpacity
              style={Styles.btnSignup}
              onPress={() => {
                signin();
              }}
              disabled={signinflag}>
              <Text style={[Styles.btnTxt, {color: '#fff'}]}>Sign In!</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.btnDiv}>
            <Text style={{color: '#787C85', fontSize: actuatedNormalizeW(11)}}>
              -------------------- <Text style={{color: '#C6C6CA'}}>OR</Text>{' '}
              --------------------
            </Text>
          </View>
          <View style={Styles.bottomDiv}>
          <TouchableOpacity
              onPress={() => {
                signinFacebook();
              }}>
            <Image
              source={require('../../assets/facebookIcon.png')}
              alt="facebook"
            />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                signinGoogle();
              }}>
            <Image
              source={require('../../assets/googleIcon.png')}
              alt="google"
            />
          </TouchableOpacity>
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
