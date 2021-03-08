import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity,TextInput} from 'react-native';
import SideMenu from 'react-native-side-menu-over';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import Menu from './Menu';
import Love from '../../love';
import Forget from '../../forget';
import Discover from '../../discover1';
import Song from '../../song';
import NowPlay from '../../nowPlay';
import Video from '../../video';
import Artists from '../../artists';

const image = require('../../../assets/menu.png');

const Basic = (props) => {
  const [isOpen, setIsopen] = React.useState(false);
  const [isOpenSearch, setIsopensearch] = React.useState(false);
  const [isPlayfg, setIsplayfg] = React.useState(true);
  const [selectedItem, setSelecteItem] = React.useState('');
  const [propsscreen, setPropsscreen] = React.useState('');
  const [propssearchtext, setPropssearchtext] = React.useState('');

  useEffect(() => {
    console.log('basic component-------->', props.screen);
    setPropsscreen(props.screen);
    setSelecteItem('');
    setIsopensearch(false);
    setIsplayfg(false);
  }, [props.screen]);

  const toggle = () => {
    setIsopen(!isOpen);
  };
  const toggleSearch = () => {
    setIsopensearch(!isOpenSearch);
    setPropssearchtext('');
  };
  const updateSearchState = (isOpenSearch) => {
    setIsopensearch(isOpenSearch);
    setPropssearchtext('');
  };
  const searchChangeText = (value) => {
    setPropssearchtext(value);
  };
  
  const updateMenuState = (isOpen) => {
    setIsopen(isOpen);
  };

  const onMenuItemSelected = (item) => {
    setIsopen(false);
    setSelecteItem(item);
    setPropsscreen('');
  };

  const menu = (
    <Menu
      onItemSelected={onMenuItemSelected}
      navigation={props.navigation}
      setIsopen={setIsopen}
    />
  );

  return (
    <SideMenu
      menu={menu}
      isOpen={isOpen}
      bounceBackOnOverdraw={true}
      onChange={(isOpen) => updateMenuState(isOpen)}>
      <View style={styles.container}>
        {propsscreen === 'What Do You Love?' ? (
          <Love navigation={props.navigation} />
        ) : propsscreen === 'Discover' ? (
          <Discover navigation={props.navigation} />
        ) : propsscreen === 'Song' ? (
          <Song 
            navigation={props.navigation}
            setIsopensearch={isOpenSearch}            
            updateSearchState = {updateSearchState}
            searchText = {propssearchtext}
            playfg={isPlayfg}
          />
        ) : propsscreen === 'now playing' ? (
          <NowPlay
            navigation={props.navigation}
            objects={props.objects}
            index={props.index}
            artistTitle={props.artistTitle}
            whoosh={props.whoosh}
          />
        ) : propsscreen === 'Video' ? (
          <Video
            navigation={props.navigation}
            objects={props.objects}
            index={props.index}
            artistTitle={props.artistTitle}
            whoosh={props.whoosh}
            setIsopensearch={isOpenSearch}            
            updateSearchState = {updateSearchState}
            searchText = {propssearchtext}
            playfg={isPlayfg}
          />
        ) : (
          <View></View>
        )}
        {selectedItem === 'Songs' ? (
          <Song 
          navigation={props.navigation}
          setIsopensearch={isOpenSearch}
          updateSearchState = {updateSearchState}
          searchText = {propssearchtext}
          playfg={isPlayfg}
          />
        ) : selectedItem === 'Videos' ? (
          <Video navigation={props.navigation} 
          setIsopensearch={isOpenSearch}
          updateSearchState = {updateSearchState}
          searchText = {propssearchtext}
          playfg={isPlayfg}
          />
        ) : selectedItem === 'Artists' ? (
          <Artists navigation={props.navigation} 
          setIsopensearch={isOpenSearch}
          updateSearchState = {updateSearchState}
          searchText = {propssearchtext}
          playfg={isPlayfg}
          />
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={toggle}>
            <Image source={image} style={{width: 32, height: 32}} />
          </TouchableOpacity>
        </View>
        {
          isOpenSearch === true && (propsscreen === 'Song' || selectedItem === 'Songs' || propsscreen === 'Video' || selectedItem === 'Videos' || selectedItem === 'Artists')?
          <View style={{width:'80%',flexDirection: 'row'}}>
            <View style={{flexDirection: 'row',backgroundColor:'#2F3141', borderRadius: 15,width:'70%',height:30, marginTop:5, marginRight:30}}>
              <TouchableOpacity onPress={toggleSearch}>
                <Icon name={'search'} color="#777777" size={23} style={{marginTop:4,marginLeft:20}}/>
              </TouchableOpacity>
              <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#777777"
                  placeholder="Search album,song…"
                  // autoCapitalize="none"
                  style={styles.inputTxt}
                  // value={email}
                  onChangeText={searchChangeText}
                />
            
            </View>
            <View >
              <Image source={{uri:'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'}} style={styles.playingIcon}></Image>
            </View>
          </View>
          :
          <View style={{flexDirection: 'row',justifyContent: "space-between",width:'60%'}}>
            <Text style={styles.headertitle}>
              {propsscreen !== 'now playing' ? propsscreen : ''}
              {selectedItem}
            </Text>
            <TouchableOpacity onPress={toggleSearch}>
              <Icon name={'search'} color="#fff" size={25} />
            </TouchableOpacity>
          </View>
        }
        
      </View>
    </SideMenu>
  );
};

export default Basic;
