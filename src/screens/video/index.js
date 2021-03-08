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
  StyleSheet,
} from 'react-native';
import '../../config/global';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-simple-toast';
import Styles from './style';
import Footer from '../footer';
import ApiConfig from '../../config/apiconfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Slider} from 'react-native-elements';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import VideoComponent from '../component/video';
import '../../config/global';

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
const songsss = [
  {
    id: 1,
    name: 'AAA',
    size: 4419072,
    b_url: '../../assets/mp3/railroad_bell.mp3',
  },
  {
    id: 1,
    name: 'AAA',
    size: 4419072,
    b_url: '../../assets/mp3/salamisound_bell.mp3',
  },
  {
    id: 1,
    name: 'AAA',
    size: 4419072,
    b_url: '../../assets/mp3/siren_bell.mp3',
  },
];
const App = (props) => {
  const [buckets, setBuckets] = React.useState([]);
  const [objects, setObjects] = React.useState([]);
  const [article, setArticle] = React.useState('');
  const [songtitle, setSongtitle] = React.useState('');
  const [displayFlag, setDisplayFlag] = React.useState(false);
  const [videosrc, setVideosrc] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    handleToggle();
    setTimeout(function () {
      getArtists();
    }, 1);
  }, []);

  const getArtists = () => {
    props.updateSearchState(false);
    setBuckets(global.buckets);
    setObjects(global.objects_mp4);
    setArticle(global.buckets[0].name);
    handleClose();
    // var axios = require('axios');

    // var config = {
    //   method: 'get',
    //   url: ApiConfig.url + 'api/s3/buckets',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     getSongs(response.data.data[0].name);
    //     setBuckets(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const getSongs = (data) => {
    props.updateSearchState(false);
    setArticle(data);
    handleToggle();
    var object_list = [];
    var axios = require('axios');
    var config = {
      method: 'get',
      url: ApiConfig.url + `api/s3/objects?bucket= + ${data}`,
    };

    axios(config)
      .then(function (response) {
        response.data.data.map((val, index) => {
          var n = val.b_url.lastIndexOf('.mp4');
          if (n > 0) {
            object_list.push(val);
          }
        });
        setObjects(object_list);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const play = (param) => {
    handleDisplay();
    setVideosrc(param);
  };

  const handleDisplay = () => {
    setDisplayFlag(!displayFlag);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        {/* <Progress.Circle size={30} indeterminate={open} /> */}
        
          <View style={Styles.titleDiv}>
            <Text style={Styles.txt16}>Artists</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'fff',
              paddingHorizontal: actuatedNormalizeW(20),
            }}>
            <View style={{width: '100%', height: '50%'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {buckets.map((val, index) => {
                  if (index % 2 === 0 && index<6) {
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            getSongs(val.name);
                          }}>
                          <View style={Styles.artistItem}>
                            <Text style={Styles.artisttitle}>{val.name}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
            <View style={{width: '100%', height: '50%'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {buckets.map((val, index) => {
                  if (index % 2 === 1 && index<6) {
                    return (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            getSongs(val.name);
                          }}>
                          <View style={Styles.artistItem}>
                            <Text style={Styles.artisttitle}>{val.name}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
          
          <View style={[Styles.titleDiv, {marginTop: actuatedNormalizeH(30)}]}>
            <Text style={Styles.txt16}>{article}</Text>
          </View>
          <ScrollView style={!displayFlag ? Styles.active : Styles.disable}>
          <View style={Styles.catagoryDiv}>
            {objects.map((val, index) => {
              if(index>0 && val.name.lastIndexOf(props.searchText)>-1){
                return (
                  <View style={Styles.item}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                      }}
                      onPress={() => {
                        play(val.b_url);
                      }}>
                      <View style={Styles.videoDiv}>
                        <Video
                          onFullScreen={true}
                          // source={require('../../assets/video2.mp4')}
                          source={{uri: val.b_url}}
                          style={Styles.video}
                          autoplay={false}
                          muted={true}
                          resizeMode={'cover'}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#C6C6CA',
                        fontSize: actuatedNormalizeW(12),
                      }}>
                      {/* {val.name} */}
                      {val.name.substr(0, val.name.length - 4)}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
        <VideoComponent
          display={displayFlag}
          // src={'../../assets/video2.mp4'}
          src={videosrc}
          handleDisplay={handleDisplay}
        />
      </View>
      <Footer flag={'video'} navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default App;
