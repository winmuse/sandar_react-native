import React, {useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  Animated,
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
import ApiConfig from '../../config/apiconfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Slider} from 'react-native-elements';
import '../../config/global';

let interval = null;

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var whoosh = new Sound('../../assets/mp3/railroad_bell.mp3', Sound.MAIN_BUNDLE);
var timeout;

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
  const [objects, setObjects] = React.useState(props.objects);
  const [songtitle, setSongtitle] = React.useState(
    props.objects[props.index].name,
  );
  const [pauseflag, setpauseFlag] = React.useState(true);
  const [refreshing, setrefreshing] = React.useState(false);
  
  const [maximumvalue, setmaximumValue] = React.useState(global.max_time);
  const [maximumtime, setmaximumTime] = React.useState('');
  const [seconds, setSeconds] = React.useState(global.current_time);
  var secondsL = global.current_time;
  const [currentIndex, setCurrentIndex] = React.useState(props.index);
  const [playflag, setPlayflag] = React.useState(false);
  const [timing, setTiming] = React.useState('');

  const _onRefresh = () => {
    setrefreshing(true);
    // fetchData().then(() => {
    //   setrefreshing(false);
    // });
    console.log("_onRefresh");
  }

  useEffect(() => {
    whoosh = props.whoosh;
    whoosh.play();
    secondsL = global.current_time;
    console.log('------', secondsL);
    var sec = secondsL;
    setmaximumValue(whoosh.getDuration());
    let whooshtime = whoosh.getDuration();
    let maxtime = '';
    if (whooshtime < 60) {
      if (whooshtime < 10) maxtime = `00:0${whooshtime}`;
      else maxtime = `00:${whooshtime}`;
    } else {
      let mm = Math.floor(whooshtime / 60);
      let ss = Math.round(whooshtime - Math.floor(whooshtime / 60) * 60);
      if (ss < 10) maxtime = `0${mm}:0${ss}`;
      else maxtime = `0${mm}:${ss}`;
    }
    setmaximumTime(maxtime);
    interval = setInterval(() => {
      sec = sec + 1;
      setSeconds(sec);
      let time;
      if (sec < 60) {
        if (sec < 10) time = `00:0${sec}`;
        else time = `00:${sec}`;
      } else {
        let mm = Math.floor(sec / 60);
        let ss = sec - Math.floor(sec / 60) * 60;
        if (ss < 10) time = `0${mm}:0${ss}`;
        else time = `0${mm}:${ss}`;
      }
      setTiming(time);
      secondsL = sec;
      if (whoosh.getDuration() < sec) {
        nextPlay();
      }
    }, 2000);
  }, []);
  const handlePlay = (val, index) => {
    setCurrentIndex(index);
    setSongtitle(val.name);
    stop();
    whoosh = new Sound(val.b_url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      play();
    });
  };

  const play = () => {
    var sec = secondsL;
    setPlayflag(true);
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
        if (currentIndex >= objects.length)
          handlePlay(objects[objects.length], objects.length);
        else handlePlay(objects[currentIndex + 1], currentIndex + 1);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    setmaximumValue(whoosh.getDuration());
    let whooshtime = whoosh.getDuration();
    let maxtime = '';
    if (whooshtime < 60) {
      if (whooshtime < 10) maxtime = `00:0${whooshtime}`;
      else maxtime = `00:${whooshtime}`;
    } else {
      let mm = Math.floor(whooshtime / 60);
      let ss = Math.round(whooshtime - Math.floor(whooshtime / 60) * 60);
      if (ss < 10) maxtime = `0${mm}:0${ss}`;
      else maxtime = `0${mm}:${ss}`;
    }
    setmaximumTime(maxtime);
    interval = setInterval(() => {
      sec = sec + 1;
      setSeconds(sec);
      let time;
      if (sec < 60) {
        if (sec < 10) time = `00:0${sec}`;
        else time = `00:${sec}`;
      } else {
        let mm = Math.floor(sec / 60);
        let ss = sec - Math.floor(sec / 60) * 60;
        if (ss < 10) time = `0${mm}:0${ss}`;
        else time = `0${mm}:${ss}`;
      }
      setTiming(time);
      secondsL = sec;
      if (whoosh.getDuration() < sec) {
        nextPlay();
      }
    }, 2000);
  };

  const stop = () => {
    whoosh.release();
    setSeconds(0);
    setTiming('00:00');
    secondsL = 0;
    clearInterval(interval);
    setpauseFlag(true);
  };

  const pause = () => {
    var sec = seconds;
    if (pauseflag) {
      whoosh.pause();
      clearInterval(interval);
    } else {
      whoosh.play();
      interval = setInterval(() => {
        sec = sec + 1;
        setSeconds(sec);
        let time;
        if (sec < 60) {
          if (sec < 10) time = `00:0${sec}`;
          else time = `00:${sec}`;
        } else {
          let mm = Math.floor(sec / 60);
          let ss = sec - Math.floor(sec / 60) * 60;
          if (ss < 10) time = `0${mm}:0${ss}`;
          else time = `0${mm}:${ss}`;
        }
        setTiming(time);
        secondsL = sec;
        if (whoosh.getDuration() < sec) {
          nextPlay();
        }
      }, 2000);
    }
    setpauseFlag(!pauseflag);
  };

  const nextPlay = () => {
    stop();
    if (currentIndex >= objects.length - 1)
      handlePlay(objects[objects.length - 1], objects.length - 1);
    else handlePlay(objects[currentIndex + 1], currentIndex + 1);
  };

  const previewPlay = () => {
    stop();
    if (currentIndex <= 0) handlePlay(objects[0], 0);
    else handlePlay(objects[currentIndex - 1], currentIndex - 1);
  };

  const setCurrentSeek = (value) => {
    whoosh.setCurrentTime(value);
    secondsL = value;
    setSeconds(value);
    let time;
    if (value < 60) {
      if (value < 10) time = `00:0${value}`;
      else time = `00:${value}`;
    } else {
      let mm = Math.floor(value / 60);
      let ss = value - Math.floor(value / 60) * 60;
      if (ss < 10) time = `0${mm}:0${ss}`;
      else time = `0${mm}:${ss}`;
    }
    setTiming(time);
    if (pauseflag) pause();
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
      {/* <Animated.View style={[Styles.draggable]}> */}
        <ScrollView style={{width: '100%', height: '100%'}}>
            {/* <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh()}
            /> */}
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={Styles.articleImg}></View>
            <Text style={Styles.articleTxt}>{songtitle}</Text>
            <Text style={Styles.songTxt}>{props.artistTitle}</Text>
            <View style={Styles.playingDivactive}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent:'space-between',
                  marginTop: actuatedNormalizeH(30),
                }}>
                <Text
                  style={{
                    color: '#C6C6CA',
                    fontSize: actuatedNormalizeW(12),
                  }}>
                  {timing}
                </Text>
                <Text
                  style={{
                    color: '#C6C6CA',
                    fontSize: actuatedNormalizeW(12),
                  }}>
                  {maximumtime}
                </Text>
              </View>
              <Slider
                style={Styles.slider}
                step={1}
                maximumValue={maximumvalue}
                onSlidingComplete={setCurrentSeek}
                value={seconds}
                minimumTrackTintColor="#E4234B"
                maximumTrackTintColor="#787C85"
                thumbTintColor="#C6C6CA"
              />
              
              <View style={Styles.playingsubDiv}>
                <View style={Styles.playingrightDiv}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Main', {screenflag: 'Song'});
                      stop();
                    }}>
                    <Icon
                      name={'undo'}
                      color="#fff"
                      size={20}
                      style={{marginBottom: 7}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={previewPlay}>
                    <Image
                      source={require('../../assets/preview.png')}
                      style={{width: 15, height: 15}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pause}>
                    {pauseflag ? (
                      <Image
                        style={{width: 50, height: 50}}
                        source={require('../../assets/stopNow.png')}
                      />
                    ) : (
                      <Image 
                        style={{width: 50, height: 50}}
                        source={require('../../assets/playNow.png')} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextPlay}>
                    <Image
                      source={require('../../assets/next.png')}
                      style={{width: 15, height: 15}}
                    />
                  </TouchableOpacity>
                  <Icon
                    name={'random'}
                    color="#fff"
                    size={20}
                    style={{marginBottom: 7}}
                  />
                  {/* <Text
                    style={{
                      color: '#C6C6CA',
                      fontSize: actuatedNormalizeW(12),
                    }}>
                    {timing} {maximumtime}
                  </Text> */}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* </Animated.View> */}
      </View>
    </View>
  );
};

export default App;
