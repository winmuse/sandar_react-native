import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Styles from './style';
import {saveRemember} from '../localstorage';
import '../../../config/global';
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
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
const image = require('../../../assets/close.png');
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: windowWidth.width,
    height: windowWidth.height,
    backgroundColor: '#1B1D26',
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: actuatedNormalizeH(180),
    backgroundColor: '#E4234B',
  },
  avatarContainerColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: actuatedNormalizeH(180),
    backgroundColor: '#E4234B',
    paddingRight: actuatedNormalizeW(25),
  },
  avatar: {
    marginTop: actuatedNormalizeH(20),
    width: actuatedNormalizeW(60),
    height: actuatedNormalizeW(60),
    borderRadius: actuatedNormalizeH(100),
  },
  name: {
    // position: 'absolute',
    color: '#F7F8FF',
    fontSize: actuatedNormalizeW(12),
    marginTop: actuatedNormalizeH(5),
  },
  menuContainer: {
    backgroundColor: '#1B1D26',
    marginTop: 45,
    paddingLeft: 20,
  },
  item: {
    fontFamily: 'normal',
    fontSize: actuatedNormalizeW(12),
    paddingTop: actuatedNormalizeH(8),
    paddingBottom: actuatedNormalizeH(8),
    color: '#C6C6CA',
    borderBottomWidth: 1,
    borderBottomColor: '#212227',
  },
});
export default function Menu({onItemSelected, navigation, setIsopen}) {
  const signout = () => {
    saveRemember(false);
    navigation.navigate('Signin');
  };

  const handleopenFAQS = () => {
    Linking.canOpenURL(global.FAQurl).then((supported) => {
      if (supported) {
        Linking.openURL(global.FAQurl);
      } else {
        console.log("Don't know how to open URI: " + global.FAQurl);
      }
    });
  };

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          style={{
            marginTop: actuatedNormalizeH(40),
            paddingLeft: actuatedNormalizeW(15),
          }}
          onPress={() => {
            setIsopen(false);
          }}>
          <Image
            source={image}
            style={{
              width: actuatedNormalizeW(15),
              height: actuatedNormalizeW(15),
            }}
          />
        </TouchableOpacity>
        <View style={styles.avatarContainerColumn}>
          <Image style={styles.avatar} source={{uri}} />

          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={styles.name}>Niles Peppertrout</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Text
          onPress={() => {
            navigation.navigate('Setting');
            setIsopen(false);
          }}
          style={styles.item}>
          Profile
        </Text>

        <Text onPress={() => onItemSelected('Songs')} style={styles.item}>
          Songs
        </Text>
        <Text onPress={() => onItemSelected('Artists')} style={styles.item}>
          Artists
        </Text>
        <Text onPress={() => onItemSelected('Videos')} style={styles.item}>
          Videos
        </Text>
        <Text onPress={() => onItemSelected('Radio')} style={styles.item}>
          Radio
        </Text>
        <Text onPress={() => onItemSelected('Downloads')} style={styles.item}>
          Downloads
        </Text>
        <Text onPress={() => onItemSelected('News')} style={styles.item}>
          News
        </Text>
        <TouchableOpacity onPress={handleopenFAQS}>
          <Text style={styles.item}>FAQ</Text>
        </TouchableOpacity>
        <View style={[Styles.btnDiv, {marginTop: actuatedNormalizeW(30)}]}>
          <TouchableOpacity style={Styles.btnSignup} onPress={signout}>
            <Text style={Styles.btnTxt}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
