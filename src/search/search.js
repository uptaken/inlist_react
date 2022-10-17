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
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import SearchHeader from './header';
import CategoryListItem from './category_list_item';
import SearchList from './search_list';

export default function Search({ route, navigation }){
  var base = new Base()
  const [sort, set_sort] = useState({})
  const [search, set_search] = useState('')
  const [arr_category, set_arr_category] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      setup_backhandler()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    get_category_data()
    return unsubscribe;
  }, [])

  function setup_backhandler(){
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('HomeTab')
      return true
    })
  }

  async function get_category_data(){
    var response = await base.request(base.url_api + '/product/category?subject=g')

    if(response.status === 'success'){
      var arr = []
      for(let x in response.data.data)
        arr.push({
          id: x,
          name: response.data.data[x].subject
        })
      set_arr_category(arr)
    }
    else
      base.show_error(response.message)
  }

  function on_clicked(index){
    navigation.navigate('SearchListPage', {data: arr_category[index]})
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

        <View style={{ flex: 1, backgroundColor: base.color.white, }}>
          <SearchHeader
            on_search={value => set_search(value)}
            search={search}/>

          <View style={{ flex: 1, }}>
            {
              search === '' ?
              <View>
                <Text style={{ color: base.color.grey2, fontSize: base.size.size_5, marginTop: base.size.size_5, marginHorizontal: base.size.size_5 }}>{base.i18n.t("search_by_category")}</Text>

                <FlatList
                  style={{ marginTop: base.size.size_1 }}
                  data={arr_category}
                  renderItem={({ item, index }) => <CategoryListItem data={item} key={index} on_press={() => on_clicked(index)}/>}
                  keyExtractor={item => item.id}/>
              </View>
              :
              <SearchList
                navigation={navigation}
                sort={sort}
                search={search}/>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
