import React, { useEffect } from 'react';
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
import StylesNow from './styleNow';
import Footer from '../footer';
import ApiConfig from '../../config/apiconfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Slider } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
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
  const [followers, setFollowers] = React.useState(0);
  const [objects, setObjects] = React.useState([]);
  const [article, setArticle] = React.useState('');
  const [songtitle, setSongtitle] = React.useState('');
  const [pauseflag, setpauseFlag] = React.useState(true);
  const [maximumvalue, setmaximumValue] = React.useState(0);
  const [maximumtime, setmaximumTime] = React.useState('');
  const [seconds, setSeconds] = React.useState(0);
  let secondsL = 0;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [playflag, setPlayflag] = React.useState(false);
  const [playminimize, setPlayminimize] = React.useState(true);
  const [playminimizeActive, setPlayminimizeActive] = React.useState(false);
  const [timing, setTiming] = React.useState('');

  const [artistImg, setArtistImg] = React.useState('');
  
  useEffect(() => {
    getSongs(props.navigation.getParam('artistName'));
  }, []);

  const getSongs = (data) => {
    setArticle(data);
    var object_list = [];
    var axios = require('axios');
    var config = {
      method: 'get',
      url: ApiConfig.url + `api/s3/objects?bucket= + ${data}`,
    };

    axios(config)
      .then(function (response) {
        setFollowers(response.data.data.length);
        response.data.data.map((val, index) => {
          if(val.b_url.lastIndexOf('200.jpg')>0)
            setArtistImg(val.b_url);
          var n = val.b_url.lastIndexOf('.mp3');
          if (n > 0) {
            object_list.push(val);
          }
        });
        setObjects(object_list);
        // setObjects(songsss);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePlay = (val, index) => {
    setCurrentIndex(index);
    setSongtitle(val.name.substr(0, val.name.length - 4));
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
      console.log('play_setInterval -------', secondsL);
      sec = sec + 1;
      let time;
      setSeconds(sec);
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
    }, 1000);
  };

  const stop = () => {
    if (whoosh !== null) whoosh.release();
    setSeconds(0);
    setTiming('00:00');
    secondsL = 0;
    clearInterval(interval);
    setpauseFlag(true);
  };

  const pause = () => {
    // Pause the sound
    var sec = seconds;
    if (pauseflag) {
      whoosh.pause();
      clearInterval(interval);
    }
    else {
      whoosh.play();
      interval = setInterval(() => {
      sec = sec + 2;
      setSeconds(sec);
      secondsL = sec;
      if (whoosh.getDuration()<sec)
      {
        nextPlay()
      }
    }, 2000);
    }
    setpauseFlag(!pauseflag);
  };

  const nextPlay = () => {
    stop();
    if (currentIndex >= objects.length-1)
      handlePlay(objects[objects.length-1], objects.length-1);
    else handlePlay(objects[currentIndex + 1], currentIndex + 1);
  };

  const previewPlay = () => {
    stop();
    if (currentIndex <= 0) handlePlay(objects[0], 0);
    else handlePlay(objects[currentIndex - 1], currentIndex - 1);
  };

  const setCurrentSeek = (value) => {
    whoosh.play();
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
    
    clearInterval(interval);
    var sec = secondsL;
    interval = setInterval(() => {
      console.log('seek_setInterval -------', secondsL);
      sec = sec + 1;
      let time;
      setSeconds(sec);
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
    }, 1000);
  };
  const setCurrentSeekTime = (value) => {
    clearInterval(interval);
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
    //if (pauseflag) pause();
  };
  const download = (url, name) => {
    const date = new Date();
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.DownloadDir + '/music'; // PictureDir--->this is the pictures directory. You can check the available directories in the wiki.
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        path: PictureDir + '/' + name,
        description: 'Downloading image.',
      },
    };
    config(options)
      .fetch('GET', url)
      .then((res) => { });
  };
  return (
    <View style={Styles.container}>
      {playminimizeActive === false ?
      <View style={Styles.articleDiv}>
        <View style={Styles.articleDiv1}>
          <View
            style={{
              width: '100%',
              height: 200,
              alignItems: 'center',
              paddingHorizontal: actuatedNormalizeW(20),
            }}>
            <Image
              source={{uri:artistImg}}
              style={Styles.artistIcon}
            />
            <Text style={[Styles.txt16, { marginVertical: actuatedNormalizeH(10) }]}>{article}</Text>
            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={Styles.txtNum14}>{followers}</Text>
                <Text style={Styles.txttitle14}>Followers</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={Styles.txtNum14}>{objects.length}</Text>
                <Text style={Styles.txttitle14}>Listeners</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={Styles.txtNum14}>141k</Text>
                <Text style={Styles.txttitle14}>Following</Text>
              </View>
            </View>
          </View>
          <View style={[Styles.btnDiv, { marginVertical: actuatedNormalizeH(10) }]}>
            <TouchableOpacity style={Styles.btnSignup}
              // onPress={() => { props.navigation.navigate('Discover', { screenflag: 'Discover' }) }}
              onPress={() => { }}
            >
              <Text style={[Styles.btnTxt, { color: '#fff' }]}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={[Styles.titleDiv, { marginTop: actuatedNormalizeH(1) }]}>
            <Text style={Styles.txt16}>Top Tracks</Text>
            <Text style={Styles.txtview}>View All</Text>
          </View>
          <ScrollView style={{ width: '100%', height: '100%', marginTop: actuatedNormalizeH(10)}} showsVerticalScrollIndicator={false}>
          <View style={Styles.catagoryDiv}>
            {objects.map((val, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: actuatedNormalizeH(30),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      handlePlay(val, index);
                    }}>
                  <Image source={require('../../assets/PlayIcon.png')} />
                  </TouchableOpacity>
                  <Text
                    style={{color: '#fff', width: '35%'}}
                    onPress={() => {
                      handlePlay(val, index);
                    }}>
                    {val.name.substr(0, val.name.length - 4)}
                  </Text>
                  
                  {/* <Text style={{ color: '#fff' }}>2:45</Text> */}
                  <Image source={require('../../assets/Group.png')} />
                  <TouchableOpacity>
                    <Image source={require('../../assets/readmore.png')} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        </View>
        <Footer navigation={props.navigation} />
      </View>
      :
      <View></View>
      }
      {
        playminimize ?
        <View
          style={playflag ? Styles.playingDivactive : Styles.playingDivinactive}>
          <Slider
              style={{width: '100%', height: 10}}
              step={1}
              maximumValue={maximumvalue}
              // onSlidingComplete={setCurrentSeek}
              value={seconds}
              minimumTrackTintColor="#E4234B"
              maximumTrackTintColor="#1D1F30"
              thumbTintColor="#1D1F30"
            />
          <View style={Styles.playingsubDiv}>
            <View style={Styles.playingleftDiv}>
              <Image
                source={{uri:artistImg}}
                style={Styles.playingIcon}
              />
              <TouchableOpacity
                onPress={() => {
                  setPlayminimize(false);
                  setPlayminimizeActive(true);
                  // pause()
                  // global.current_time = seconds;
                  // global.max_time = maximumvalue;
                  // props.navigation.navigate('Main', {
                  //   screenflag: 'now playing',
                  //   objects: objects,
                  //   index: currentIndex,
                  //   artistTitle: article,
                  //   whoosh: whoosh,
                  //   seconds:seconds,
                  // });
                }}>
                <View style={{ paddingHorizontal: actuatedNormalizeW(10) }}>
                  <Text
                    style={{ color: '#C6C6CA', fontSize: actuatedNormalizeW(12) }}>
                    {article}
                  </Text>
                  <Text
                    style={{ color: '#C6C6CA', fontSize: actuatedNormalizeW(12) }}>
                    {songtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '25%', alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  setPlayflag(false);
                  stop();
                }}>
                <Icon
                  name={'close'}
                  color="#fff"
                  size={25}
                  style={{ marginBottom: 7 }}
                />
              </TouchableOpacity>
              <View style={Styles.playingrightDiv}>
                <TouchableOpacity onPress={previewPlay}>
                  <Image source={require('../../assets/preview.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pause}>
                  {
                    pauseflag ? <Image style={{ width: 25, height: 25 }} source={require('../../assets/stop.png')} /> : <Image source={require('../../assets/play.png')} />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPlay}>
                  <Image source={require('../../assets/next.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      :
      <View style={playflag ? StylesNow.articleDiv: Styles.playingDivinactive}>
        {/* <Animated.View style={[Styles.draggable]}> */}
          <ScrollView style={{width: '100%', height: '100%'}}>
              {/* <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh()}
              /> */}
            <TouchableOpacity
              onPress={() => {
                setPlayminimize(true);
                setPlayminimizeActive(false);
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
            
              <Image
                source={{uri:artistImg}}
                style={StylesNow.articleImg}
              />
              <Text style={StylesNow.articleTxt}>{songtitle}</Text>
              <Text style={StylesNow.songTxt}>{props.artistTitle}</Text>
            
              <View style={StylesNow.playingDivactive}>
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
                  style={StylesNow.slider}
                  step={1}
                  maximumValue={maximumvalue}
                  onSlidingComplete={setCurrentSeek}
                  onValueChange={setCurrentSeekTime}
                  value={seconds}
                  minimumTrackTintColor="#E4234B"
                  maximumTrackTintColor="#787C85"
                  thumbTintColor="#C6C6CA"
                />
                
                <View style={StylesNow.playingsubDiv}>
                  <View style={StylesNow.playingrightDiv}>
                    <TouchableOpacity
                      onPress={() => {
                        setPlayminimize(true);
                        setPlayminimizeActive(false);
                      }}>
                      <Icon
                        name={'undo'}
                        color="#fff"
                        size={25}
                        style={{}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={previewPlay}>
                      <Image
                        source={require('../../assets/preview.png')}
                        style={{width: 20, height: 20}}
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
                        style={{width: 20, height: 20}}
                      />
                    </TouchableOpacity>
                    <Icon
                      name={'random'}
                      color="#fff"
                      size={25}
                      style={{}}
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
            </TouchableOpacity>
          </ScrollView>
          {/* </Animated.View> */}
        </View>
      }
    </View>
  );
};

export default App;
