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
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import OrderHeader from './header';
import OrderListItem from './list_item';

export default function Order({ route, navigation }){
  var base = new Base()
  const [arr, set_arr] = useState([
    {
      id: '1',
      url_image: require("../../assets/book_1.png"),
      date: moment(),
      status: '7 Hari sebelum Pengembalian',
      return_date: moment(),
      borrowed_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      return_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      detail: [
        {
          id: '1',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
        {
          id: '2',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
      ],
    },
    {
      id: '2',
      url_image: require("../../assets/book_1.png"),
      date: moment().add(1, 'd'),
      return_date: moment().add(1, 'd'),
      borrowed_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      return_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      status: '7 Hari sebelum Pengembalian',
      detail: [
        {
          id: '1',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
        {
          id: '2',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
      ],
    },
    {
      id: '3',
      url_image: require("../../assets/book_1.png"),
      date: moment().add(2, 'd'),
      return_date: moment().add(2, 'd'),
      borrowed_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      return_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      status: '7 Hari sebelum Pengembalian',
      detail: [
        {
          id: '1',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
        {
          id: '2',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
      ],
    },
    {
      id: '4',
      url_image: require("../../assets/book_1.png"),
      date: moment().add(3, 'd'),
      return_date: moment().add(3, 'd'),
      borrowed_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      return_location: 'Perpustakaan Surabaya Kota\nJl. Iman Bonjol No. 1\n(031) 123 5678',
      status: '7 Hari sebelum Pengembalian',
      detail: [
        {
          id: '1',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
        {
          id: '2',
          url_image: require("../../assets/book_1.png"),
          title: 'Bicara Itu Ada Seninya',
          publisher: 'Oh Su Hyang',
        },
      ],
    },
  ])

  function on_clicked(index){
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
          keyExtractor={item => item.id}/>
      </View>
    </TouchableWithoutFeedback>
  );
}
