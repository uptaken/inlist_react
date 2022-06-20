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
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import OrderHeader from './header';
import OrderListItem from './list_item';

export default function Order({ route, navigation }){
  var base = new Base()
  const [arr, set_arr] = useState([])

  useEffect(() => {

    get_data()
  }, [])

  async function get_data(){
    var response = await base.request(base.url_api + '/loan', 'get')

    if(response.status === 'success'){
      for(let data of response.data.data){
        var cover_url = ''
        var due_date = null
        for(let item of data.collection_loan_item){
          item.collection.product.CoverURL = require('../../assets/no_image_book.png')
          cover_url = item.collection.product.CoverURL
          item.due_date = moment(item.due_date, 'YYYY-MM-DD HH:mm:ss')
          due_date = moment(item.due_date, 'YYYY-MM-DD HH:mm:ss')
        }
        data.CoverURL = cover_url
        data.create_date = moment(data.create_date, 'YYYY-MM-DD HH:mm:ss')
        data.status = due_date.diff(moment(), 'days') + " Hari sebelum Pengembalian"
      }
      set_arr(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.goBack()
    })
    navigation.navigate('OrderDetail', {data: arr[index]})
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, }}>
        <OrderHeader/>

        <FlatList
          style={{ marginTop: base.size.size_1 }}
          data={arr}
          renderItem={({ item, index }) => <OrderListItem data={item} on_press={() => on_clicked(index)}/>}
          keyExtractor={item => item.ID.toString()}/>
      </View>
    </TouchableWithoutFeedback>
  );
}
