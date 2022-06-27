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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import HomeListItem from './list_item';

export default function HomeList(props){
  var base = new Base()
  const [arr, set_arr] = useState([])

  useEffect(() => {
    if(props.type === 'related')
      get_related_data()
    else
      get_data()
  }, [])

  async function get_data(){
    var response = await base.request(base.url_api + '/product', 'get', {
      type: props.type,
    })

    if(response.status === 'success'){
      for(let data of response.data.data)
        data.CoverURL = require('../../assets/no_image_book.png')
      set_arr(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  async function get_related_data(){
    var response = await base.request(base.url_api + '/product', 'get', {
      subject: props.subject,
      arr_not_id: JSON.stringify([props.not_id,])
    })

    if(response.status === 'success'){
      for(let data of response.data.data)
        data.CoverURL = require('../../assets/no_image_book.png')
      set_arr(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    props.on_detail_clicked(arr[index])
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <TouchableWithoutFeedback style={{  }} onPress={() => Keyboard.dismiss()}>
        <View style={{ }}>
          <Text style={{ fontSize: base.size.size_5 }}>{props.title}</Text>

          <FlatList
            style={{ marginTop: base.size.size_1 }}
            data={arr}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <HomeListItem data={item} on_press={() => on_clicked(index)}/>}
            keyExtractor={item => item.ID.toString()}/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
