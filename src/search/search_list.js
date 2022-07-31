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
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from '@prince8verma/react-native-snackbar'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';
import SearchListItem from './search_list_item';

export default function SearchList(props){
  var base = new Base()
  const [arr, set_arr] = useState([])
  const [is_loading, set_is_loading] = useState(false)
  const [sort, set_sort] = useState({})
  const [arr_layout, set_arr_layout] = useState([])
  var timeout = null

  useEffect(() => {
    var arr_temp = []
    for(let x = 0; x < 3; x++)
      arr_temp.push({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: base.size.size_5, 
        marginVertical: base.size.size_3,
        children: [
          {
            flexDirection: 'row',
            children: [
              { key: 'image', width: base.size.toolbar, height: base.size.medium_image, },
              {
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginLeft: base.size.size_3, 
                children: [
                  {
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginLeft: base.size.size_3, 
                    flexShrink: 1,
                    children: [
                      { key: 'title', width: base.size.custom_image2, height: base.size.size_4, },
                      { key: 'author', width: base.size.custom_image2, height: base.size.size_3, marginTop: base.size.size_1 },
                      { key: 'publisher', width: base.size.custom_image2, height: base.size.size_3, marginTop: base.size.size_1 },
                    ],
                  },
                  { key: 'status', width: base.size.custom_image2, height: base.size.size_7, marginTop: base.size.size_1 },
                ],
              },
            ]
          },
          
        ]
      })
    set_arr_layout(arr_temp)
  }, [])

  useEffect(() => {
    set_is_loading(true)
    if(timeout != null)
      clearTimeout(timeout)
    timeout = setTimeout(() => {
      get_data()
    }, base.search_wait_time)
  }, [props.search, props.subject])

  function onRefresh(){
    set_is_loading(true)
    get_data()
  }

  async function get_data(){
    var response = await base.request(base.url_api + '/product', 'get', {
      search: props.search != null ? props.search : '',
      subject: props.subject != null ? props.subject : '',
    })

    set_is_loading(false)
    if(response.status === 'success'){
      for(let data of response.data.data)
        data.CoverURL = require('../../assets/no_image_book.png')

      set_arr(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    props.navigation.navigate('ProductDetail', {data: arr[index]})
  }

  return (
    <View>
      <Snackbar id="root_app"/>
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

      <SkeletonContent
        containerStyle={{ }}
        isLoading={is_loading}
        layout={arr_layout}>
        <FlatList
          style={{  }}
          data={arr}
          refreshControl={
            <RefreshControl
              refreshing={is_loading}
              onRefresh={onRefresh}/>
          }
          renderItem={({ item, index }) => <SearchListItem data={item} key={index} on_press={() => on_clicked(index)}/>}
          keyExtractor={item => item.ID.toString()}/>
      </SkeletonContent>
    </View>
  );
}
