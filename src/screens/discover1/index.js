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
import Footer from '../footer';

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
const most = ['Quice Holland', 'Fletch Skinner', 'Bailey Wonger'];
const hit = ['Quice Holland', 'Fletch Skinner'];
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
          <View style={Styles.titleDiv}>
            <Text style={Styles.txt16}>Hot Recommended</Text>
          </View>
          <View style={{width: '90%', height: 200, backgroundColor: 'fff'}}>
            <View style={{width: '100%', height: '100%'}}></View>
          </View>

          <View style={Styles.titleDiv}>
            <Text style={Styles.txt16}>Most Listened</Text>
            <Text style={Styles.txtview}>View All</Text>
          </View>
          <View style={Styles.catagoryDiv}>
            {most.map((val, index) => {
              return (
                <View
                  style={{width: '30%', marginTop: actuatedNormalizeH(30)}}
                  key={index}>
                  <View style={Styles.circleDiv} key={index + 1}></View>
                  <View style={Styles.txt12Div} key={index + 2}>
                    <Text style={Styles.txt12} key={index + 3}>
                      {val}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={Styles.titleDiv}>
            <Text style={Styles.txt16}>Hit Singles</Text>
            <Text style={Styles.txtview}>View All</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 200,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: actuatedNormalizeW(15),
            }}>
            {hit.map((val, index) => {
              return (
                <View
                  style={{width: '45%', marginTop: actuatedNormalizeH(30)}}
                  key={index}>
                  <View style={Styles.rectangleDiv} key={index + 1}></View>
                  <View style={Styles.txt12Div} key={index + 2}>
                    <Text style={Styles.txt12} key={index + 3}>
                      {val}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Footer flag={'discover'} navigation={props.navigation} />
    </View>
  );
};

export default App;
