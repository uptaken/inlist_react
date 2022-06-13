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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import HomeListItem from './list_item';

export default function HomeList(props){
  var base = new Base()
  const [arr, set_arr] = useState([
    {
      id: '1',
      url_image: require("../../assets/book_1.png"),
      publisher: 'Oh Su Hyang',
      title: 'Bicara Itu Ada Seninya',
    },
    {
      id: '2',
      url_image: require("../../assets/book_2.png"),
      publisher: 'Mark Manson',
      title: 'Sebuah Seni Untuk Bersikap Bodo Amat',
    },
    {
      id: '3',
      url_image: require("../../assets/book_1.png"),
      publisher: 'Andrea Hirata',
      title: 'Laskar Pelangi',
    },
    {
      id: '4',
      url_image: require("../../assets/book_2.png"),
      publisher: 'Oh Su Hyang',
      title: 'Bicara Itu Ada Seninya',
    },
  ])

  function on_clicked(index){
    props.navigation.navigate('ProductDetail', {data: arr[index]})
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ }}>
        <Text style={{ fontSize: base.size.size_5 }}>{props.title}</Text>

        <FlatList
          style={{ marginTop: base.size.size_1 }}
          data={arr}
          horizontal
          renderItem={({ item, index }) => <HomeListItem data={item} on_press={() => on_clicked(index)}/>}
          keyExtractor={item => item.id}/>
      </View>
    </TouchableWithoutFeedback>
  );
}
