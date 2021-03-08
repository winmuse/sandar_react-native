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
import Footer from '../footer';
import ApiConfig from '../../config/apiconfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Slider } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
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

const App = (props) => {
  const [buckets, setBuckets] = React.useState([]);

  useEffect(() => {
    getArtists();
  }, []);

  const getArtists = () => {
    props.updateSearchState(false);
    setBuckets(global.buckets);
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
    //     setBuckets(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  // const getSongs = (data) => {
  //   setArticle(data);
  //   var object_list = [];
  //   var axios = require('axios');
  //   var config = {
  //     method: 'get',
  //     url: ApiConfig.url + `api/s3/objects?bucket= + ${data}`,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       response.data.data.map((val, index) => {
  //         var n = val.b_url.lastIndexOf('.mp3');
  //         if (n > 0) {
  //           object_list.push(val);
  //         }
  //       });
  //       setObjects(object_list);
  //       // setObjects(songsss);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <View style={Styles.container}>
      <View style={Styles.articleDiv}>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: actuatedNormalizeW(20),
            }}>
            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
              {buckets.map((val, index) => {
                if(index >0 && val.name.lastIndexOf(props.searchText)>-1){

                  return (
                    <View style={{ width: '47%' }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.updateSearchState(false);
                          props.navigation.navigate("ArtistDetail", { artistName: val.name })
                        }}>
                        <View style={Styles.artistItem}>
                          <Text style={Styles.artisttitle}>{val.name}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={props.navigation} />
    </View>
  );
};

export default App;
