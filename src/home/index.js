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
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import HomeHeader from './header';
import HomeList from './list';

export default function Home({ route, navigation }){
  var base = new Base()

  useEffect(() => {
    async function get_token(){
      var token = await AsyncStorage.getItem('token')
      if(token == null)
        navigation.navigate('Login')
    }
    get_token()
  }, [])

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, }}>
        <HomeHeader/>

        <ScrollView>
          <View style={{ padding: base.size.size_5 }}>
            <View>
              <HomeList
                title={base.i18n.t("most_borrowed_collection")}
                navigation={navigation}/>
            </View>

            <View style={{ marginTop: base.size.size_3 }}>
              <HomeList
                title={base.i18n.t("new_collection")}
                navigation={navigation}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
