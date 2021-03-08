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
import Sidebar from '../component/sidebar/Basic';

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
  const [ghazals, setGhazals] = React.useState(false);
  const [party, setParty] = React.useState(false);
  const [qataghani, setQataghani] = React.useState(false);
  const [classic, setClassic] = React.useState(false);
  const [hip, setHip] = React.useState(false);
  const [attan, setAttan] = React.useState(false);
  const [pashto, setPashto] = React.useState(false);
  const [all, setAll] = React.useState(false);

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        <ScrollView style={{width: '100%', height: '100%'}}>
          <View style={Styles.row}>
            <TouchableOpacity
              onPress={() => {
                setGhazals(!ghazals);
              }}>
              <View
                style={
                  ghazals
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {ghazals ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Ghazals</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setParty(!party);
              }}>
              <View
                style={
                  party
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {party ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Party</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setQataghani(!qataghani);
              }}>
              <View
                style={
                  qataghani
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {qataghani ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Qataghani</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.row}>
            <TouchableOpacity
              onPress={() => {
                setClassic(!classic);
              }}>
              <View
                style={
                  classic
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {classic ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Classic</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPashto(!pashto);
              }}>
              <View
                style={
                  pashto
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {pashto ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Pashto</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setHip(!hip);
              }}>
              <View
                style={
                  hip
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {hip ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Hip-Hop</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.row}>
            <TouchableOpacity
              onPress={() => {
                setAttan(!attan);
              }}>
              <View
                style={
                  attan
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {attan ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>Attan</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAll(!all);
              }}>
              <View
                style={
                  all
                    ? [Styles.circle, {backgroundColor: '#4A4C55'}]
                    : Styles.circle
                }>
                {all ? (
                  <Image source={require('../../assets/checkIcon.png')} />
                ) : (
                  <Text style={Styles.txtcss}>All-Type</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={Styles.btnDiv}>
        <TouchableOpacity
          style={Styles.btnSignup}
          onPress={() => {
            props.navigation.navigate('Discover', {screenflag: 'Discover'});
          }}>
          <Text style={[Styles.btnTxt, {color: '#fff'}]}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.btnDiv, {marginVertical: actuatedNormalizeH(10)}]}>
        <TouchableOpacity
          style={[Styles.btnSignup, {backgroundColor: '#fff'}]}
          onPress={() => {
            props.navigation.navigate('Discover', {screenflag: 'Discover'});
          }}>
          <Text style={[Styles.btnTxt, {color: '#E4234B'}]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
