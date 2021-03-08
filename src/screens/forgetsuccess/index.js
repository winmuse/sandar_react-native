import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import Styles from './style';

const App = (props) => {
  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.tabDiv}>
          <View style={Styles.success}>
            <Image source={require('../../assets/successIcon.png')} />
          </View>
          <View>
            <Text style={Styles.forgotTxt}>
              Please check your email for password reset instructions
            </Text>
          </View>
          <View style={Styles.btnDiv}>
            <TouchableOpacity
              style={Styles.btnSignup}
              onPress={() => {
                props.navigation.navigate('Signin');
              }}>
              <Text style={[Styles.btnTxt, {color: '#fff'}]}>Login Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
