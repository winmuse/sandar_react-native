import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Dimensions,
  Linking
} from 'react-native';
import Styles from './style';
import ApiConfig from '../../config/apiconfig';
import '../../config/global';
import { getRemember } from '../component/localstorage';

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
  const getArtists = () => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: ApiConfig.url + 'api/s3/buckets',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        var bucket_list = [];
        getSongs(response.data.data[0].name);
        response.data.data.map((val, index) => {
          bucket_list.push(val);
        });
        global.buckets = bucket_list;
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const getSongs = (data) => {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: ApiConfig.url + `api/s3/objects?bucket= + ${data}`,
    };

    axios(config)
      .then(function (response) {
        var object_list_mp3 = [];
        var object_list_mp4 = [];
        response.data.data.map((val, index) => {
          console.log(val.url)
          var n = val.b_url.lastIndexOf('.mp3');
          if (n > 0) object_list_mp3.push(val);
          n = val.b_url.lastIndexOf('.mp4');
          if (n > 0) object_list_mp4.push(val);
        });
        global.objects_mp3 = object_list_mp3;
        global.objects_mp4 = object_list_mp4;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {

    getArtists();
    getRemember()
      .then((value) => {
        if (value === 'true')
          //props.navigation.navigate('Main', { screenflag: 'What Do You Love?' });
          props.navigation.navigate('Discover', {screenflag: 'Discover'});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTermsopen = () => {
    Linking.canOpenURL(global.termsUrl).then(supported => {
      if (supported) {
        Linking.openURL(global.termsUrl);
      } else {
        console.log("Don't know how to open URI: " + global.termsUrl);
      }
    });
  }

  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.logoDiv}>
          <Image
            source={require('../../assets/120X120.png')}
            style={Styles.logo}
          />
        </View>
        <View style={[Styles.btnDiv, { marginTop: actuatedNormalizeH(30) }]}>
          <View
            style={[Styles.btnDiv, { marginVertical: actuatedNormalizeH(10) }]}>
            <TouchableOpacity
              style={Styles.btnSignin}
              onPress={() => {
                props.navigation.navigate('Signin');
              }}>
              <Text style={[Styles.btnTxt, { color: '#E4234B' }]}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[Styles.btnDiv, { marginVertical: actuatedNormalizeH(20) }]}>
            <TouchableOpacity
              style={Styles.btnSignup}
              onPress={() => {
                props.navigation.navigate('Signup');
              }}>
              <Text style={[Styles.btnTxt, { color: '#fff' }]}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[Styles.btnDiv, { marginTop: actuatedNormalizeH(30) }]}>
          <TouchableOpacity
            onPress={handleTermsopen}
          >
            <Text style={{ color: '#E4234B', fontSize: actuatedNormalizeW(11) }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
