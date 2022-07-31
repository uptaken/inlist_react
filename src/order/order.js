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
  RefreshControl,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Snackbar from '@prince8verma/react-native-snackbar'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import OrderHeader from './header';
import OrderListItem from './list_item';

export default function Order({ route, navigation }){
  var base = new Base()
  const [arr, set_arr] = useState([])
  const [is_loading, set_is_loading] = useState(false)
  const [arr_layout, set_arr_layout] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      setup_backhandler()
      set_is_loading(true)
      get_data()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    var arr_temp = []
    for(let x = 0; x < 3; x++)
      arr_temp.push({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: base.size.size_5, 
        paddingVertical: base.size.size_3,
        children: [
          {
            flexDirection: 'row',
            children: [
              { key: 'image', width: base.size.title, height: base.size.title, },
              {
                children: [
                  { key: 'id', width: base.size.custom_image2, height: base.size.size_3, },
                  { key: 'date', width: base.size.custom_image2, height: base.size.size_4, marginTop: base.size.size_1 },
                ],
                marginLeft: base.size.size_1,
              },
            ]
          },
          { key: 'status', width: base.size.custom_image2, height: base.size.size_7, marginTop: base.size.size_1 },
        ]
      })
    set_arr_layout(arr_temp)
    return unsubscribe;
  }, [])

  function setup_backhandler(){
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('HomeTab')
      return true
    })
  }

  function onRefresh(){
    set_is_loading(true)
    get_data()
  }

  async function get_data(){
    var response = await base.request(base.url_api + '/loan', 'get')

    set_is_loading(false)
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
        data.status = data.collection_loan_item[0].LoanStatus
        data.CoverURL = cover_url
        data.create_date = moment(data.create_date, 'YYYY-MM-DD HH:mm:ss')
        // data.status = due_date.diff(moment(), 'days') + " Hari sebelum Pengembalian"
        // console.log(data.status)
      }
      
      set_arr(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    navigation.navigate('OrderDetail', {data: arr[index]})
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

        <View style={{ flex: 1, backgroundColor: base.color.white, }}>
          <OrderHeader/>

          <SkeletonContent
            containerStyle={{ }}
            isLoading={is_loading}
            layout={arr_layout}>
            <FlatList
              style={{ marginTop: base.size.size_1 }}
              data={arr}
              refreshControl={
                <RefreshControl
                  refreshing={is_loading}
                  onRefresh={onRefresh}/>
              }
              renderItem={({ item, index }) => <OrderListItem data={item} on_press={() => on_clicked(index)}/>}
              keyExtractor={item => item.ID.toString()}/>
          </SkeletonContent>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
