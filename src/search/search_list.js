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
import CustomNavigation from '../layout/custom_navigation';
import SearchListItem from './search_list_item';

export default function SearchList(props){
  var base = new Base()
  const [arr, set_arr] = useState([
    {
      id: '1',
      status: 'available',
      url_image: require("../../assets/book_1.png"),
      publisher: 'Oh Su Hyang',
      title: 'Bicara Itu Ada Seninya',
    },
    {
      id: '2',
      status: 'available',
      url_image: require("../../assets/book_2.png"),
      publisher: 'Mark Manson',
      title: 'Sebuah Seni Untuk Bersikap Bodo Amat',
    },
    {
      id: '3',
      status: 'available',
      url_image: require("../../assets/book_1.png"),
      publisher: 'Andrea Hirata',
      title: 'Laskar Pelangi',
    },
    {
      id: '4',
      status: 'available',
      url_image: require("../../assets/book_2.png"),
      publisher: 'Oh Su Hyang',
      title: 'Bicara Itu Ada Seninya',
    },
  ])
  const [sort, set_sort] = useState({})

  function on_clicked(index){
    props.navigation.navigate('ProductDetail', {data: arr[index]})
  }

  return (
    <View>
      <View style={{ paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <Text style={{ color: base.color.grey2, }}>{arr.length + ' ' + base.i18n.t("num_book")}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View>
            <Text>{props.sort.name}</Text>
          </View>
          <View style={{ marginLeft: base.size.size_1 }}>
            <Icon name="sort" size={base.size.icon} color={base.color.black}/>
          </View>
        </View>
      </View>

      <FlatList
        style={{  }}
        data={arr}
        renderItem={({ item, index }) => <SearchListItem data={item} on_press={() => on_clicked(index)}/>}
        keyExtractor={item => item.id}/>
    </View>
  );
}
