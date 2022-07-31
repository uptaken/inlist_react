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
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';
import CartListItem from './cart_list_item';

export default function Cart({ route, navigation }){
  var base = new Base()
  const [arr, set_arr] = useState([])
  let arr_ref: Array<any> = [];
  let openedRow

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
    });
    get_arr_cart()

    return unsubscribe;
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('arr_cart', JSON.stringify(arr))
  }, [arr])

  async function get_arr_cart(){
    var arr_cart = await AsyncStorage.getItem('arr_cart')
    arr_cart = arr_cart == null ? [] : JSON.parse(arr_cart)

    set_arr(arr_cart)
  }

  async function on_remove(index){
    if(openedRow && openedRow !== arr_ref[index])
      openedRow.close()
    base.remove_array(arr, set_arr, index)
  }

  function on_swiped(index){
    if(openedRow && openedRow !== arr_ref[index])
      openedRow.close()
    openedRow = arr_ref[index]
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <View style={{ flex: 1, }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
          title={base.i18n.t("cart")}
          text_color={base.color.white}
          navigation={navigation}/>

        <View style={{ flex: 1, marginTop: base.size.size_1, justifyContent: 'center', alignItems: 'center', }}>
          {
            arr.length > 0 ?
            <FlatList
              style={{ flex: 1, }}
              data={arr}
              renderItem={({ item, index }) =>
                <CartListItem
                  key={index}
                  data={item}
                  index={index}
                  on_remove={() => on_remove(index)}
                  on_set_ref={(ref) => (arr_ref[index] = ref)}
                  on_swiped={() => on_swiped(index)}/>
              }
              keyExtractor={item => item.id.toString()}/>
            :
            <Text style={{ fontWeight: 'bold', fontSize: base.size.size_5,  }}>{base.i18n.t("no_data_found")}</Text>
          }

        </View>

        <View style={{ padding: base.size.size_5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: base.size.size_4 }}>{base.i18n.t("total_borrowed_book")}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: base.size.size_4 }}>{arr.length + ' ' + base.i18n.t("num_book")}</Text>
          </View>

          {
            arr.length > 0 &&
            <CustomButton title={base.i18n.t("next")}
              style={{ marginTop: base.size.size_3 }}
              color={base.color.primary}
              textColor={base.color.white}
              on_press={() => navigation.navigate('Checkout')} />
          }
        </View>
      </View>
    </View>
  );
}
