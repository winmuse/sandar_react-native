/*Example of React Native Video*/
import React, {Component, useEffect} from 'react';
//Import React
import {Platform, StyleSheet, Text, View} from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

const App = (props) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = React.useState('cover');
  const [videoPlayer, setVideoPlayer] = React.useState(null);

  //   useEffect(() => {
  //   }, []);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => {
    setIsLoading(true);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.seek(0);
  };

  const onFullScreen = () => {
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  const onSeeking = (currentTime) => {
    setCurrentTime(currentTime);
  };
  const setThirdInputRef = (element) => {
    setVideoPlayer(element);
  };

  return (
    // <View style={styles.container}>
    <View style={props.display ? styles.container : styles.disable}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={setThirdInputRef}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{uri: props.src}}
        // source={require('../../../assets/video1.mp4')}
        style={styles.mediaPlayer}
        volume={10}
        controls={true}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
      <TouchableOpacity
        onPress={() => {
          props.handleDisplay();
        }}
        style={{margin: 10, position: 'relative', left: '90%'}}>
        <Icon name={'undo'} color="#ddd" size={25} />
      </TouchableOpacity>
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
  disable: {
    display: 'none',
  },
});
export default App;
