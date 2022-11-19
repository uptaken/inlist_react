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
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Snackbar from '@prince8verma/react-native-snackbar'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {ExpandableListView} from 'react-native-expandable-listview';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import OrderHeader from './header';
import CustomBadge from '../layout/custom_badge';
// import OrderListItem from './list_item';
import OrderListItem from './list_item1';
import OrderDetailListItem from './list_order_detail';

export default function Order({ route, navigation }){
  var base = new Base()
  const [arr, set_arr] = useState([])
  const [arr_expandable, set_arr_expandable] = useState([])
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

  useEffect(() => {
    if(arr_expandable.length > 0)
      console.log(arr_expandable[0].subCategory)
  }, [arr_expandable])

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
      var arr_expandable_temp = JSON.parse(JSON.stringify(arr_expandable))
      
      for(let data of response.data.data){
        var cover_url = ''
        var due_date = null

        data.status = data.collection_loan_item[0].LoanStatus
        data.CoverURL = cover_url
        data.create_date = moment(data.create_date, 'YYYY-MM-DD HH:mm:ss')

        var expandable_temp = {
          id: data.ID,
          categoryName: data.ID,
          customItem: <OrderListItem data={data}/>,
          is_expanded: false,
          subCategory: [],
        }
        for(let item of data.collection_loan_item){
          var file_name = item.collection.product.CoverURL
          item.collection.product.CoverURL = item.collection.product.CoverURL == null ? base.no_book_image : {uri: base.url_image + item.collection.product.worksheet.Name + '/' + file_name + "?rnd=" + moment().format('X')}
          cover_url = item.collection.product.CoverURL
          item.due_date = moment(item.due_date, 'YYYY-MM-DD HH:mm:ss')
          due_date = moment(item.due_date, 'YYYY-MM-DD HH:mm:ss')

          expandable_temp.subCategory.push(
            {
              customInnerItem: <OrderDetailListItem data={item}/>,
              id: item.ID,
              name: '',
            },
          )
        }
        
        // data.status = due_date.diff(moment(), 'days') + " Hari sebelum Pengembalian"
        // console.log(data.status)

        arr_expandable_temp.push(expandable_temp)
      }
      
      
      set_arr(response.data.data)
      set_arr_expandable(arr_expandable_temp)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    navigation.navigate('OrderDetail', {data: arr[index]})
  }
  
  function innerItemOnclick(index) {
    navigation.navigate('OrderDetail', {data: arr[index]})
  }

  function itemOnclick(index) {
    var arr_temp = JSON.parse(JSON.stringify(arr_expandable))
    arr_temp[index].is_expanded = !arr_temp[index].is_expanded
    set_arr_expandable(arr_temp)
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

        <View style={{ flex: 1, backgroundColor: base.color.white, }}>
          <OrderHeader/>

          <SkeletonContent
            containerStyle={{ flex: 1, }}
            isLoading={is_loading}
            layout={arr_layout}>
            {/* <FlatList
              style={{ marginTop: base.size.size_1, flex: 1, }}
              data={arr}
              refreshControl={
                <RefreshControl
                  refreshing={is_loading}
                  onRefresh={onRefresh}/>
              }
              renderItem={({ item, index }) => <OrderListItem data={item} on_press={() => on_clicked(index)}/>}
              keyExtractor={item => item.ID.toString()}/> */}

            <ScrollView 
              style={{ flex: 1, }}
              refreshControl={
                <RefreshControl
                  refreshing={is_loading}
                  onRefresh={onRefresh}/>
              }>
              {
                arr.map((value, index) => (
                  <OrderListItem 
                    data={value} 
                    on_order_click={() => itemOnclick(index)}
                    on_detail_click={() => innerItemOnclick(index)}/>
                ))
              }
            </ScrollView>
              
          </SkeletonContent>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
