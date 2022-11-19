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
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import ArticleListItem from './article_list_item';

export default function ArticleList(props){
  var base = new Base()
  const [arr, set_arr] = useState([])
  const [arr_layout, set_arr_layout] = useState([])
  const [is_loading, set_is_loading] = useState(false)

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      set_is_loading(true)
      get_data()
    });

    var arr_temp = []
    var arr_children = []
    for(let x = 0; x < 3; x++)
      arr_children.push({
        paddingHorizontal: base.size.size_3, 
        alignItems: 'center', 
        width: base.size.custom_image1,
        children: [
          { key: 'image', width: base.size.custom_image2, height: base.size.custom_image3, marginTop: base.size.size_1 },
          { key: 'publisher', width: base.size.custom_image2, height: base.size.size_3, marginTop: base.size.size_1 },
          { key: 'title', width: base.size.custom_image2, height: base.size.size_4, marginTop: base.size.size_1 },
        ]
      })
    arr_temp.push({flexDirection: 'row', children: arr_children})
    set_arr_layout(arr_temp)

    return unsubscribe;
  }, [])

  useEffect(() => {
    if(props.rnd != null){
      set_is_loading(true)
      get_data()
    }
  }, [props.rnd])

  async function get_data(){
    var response = await base.request(base.url_api + '/article', 'get', {
      type: props.type,
      arr_not_id: JSON.stringify([props.not_id,])
    })

    set_is_loading(false)
    if(response.status === 'success'){
      for(let data of response.data.data){
        var category_str = ""
        for(let x in data.category){
          if(x > 0)
            category_str += ", "
          category_str += data.category[x].category.category
        }
        data.category_str = category_str
        data.created_at = moment(data.createdate.replace('T', ' ').replace('Z', ''), 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')
      }
      
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
          <Text style={{ fontSize: base.size.size_5 }}>{props.title != null ? props.title : base.i18n.t("article")}</Text>

          <SkeletonContent
            containerStyle={{  }}
            isLoading={is_loading}
            layout={arr_layout}>
            {
              arr.map((value, index) => (
                <ArticleListItem key={'article'+index} data={value} on_press={() => on_clicked(index)}/>
              ))
            }
            {/* <FlatList
              style={{ marginTop: base.size.size_1 }}
              data={arr}
              horizontal={props.is_horizontal == null || (props.is_horizontal != null && props.is_horizontal)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <ArticleListItem data={item} on_press={() => on_clicked(index)}/>}
              keyExtractor={item => item.ID.toString()}/> */}
          </SkeletonContent>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
