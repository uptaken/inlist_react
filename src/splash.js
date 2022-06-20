import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Base from './utils/base';

export default function Splash({ route, navigation }){
  var base = new Base()

  useEffect(() => {
    async function get_token(){
      var token = await AsyncStorage.getItem('token')
      if(token == null)
        navigation.navigate('Login')
      else
        navigation.navigate('Home')
    }
    setTimeout(() => {
      get_token()
    }, 2000)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: base.color.primary }}>

    </View>
  );
}
