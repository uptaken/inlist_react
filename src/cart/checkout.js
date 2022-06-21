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

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';
import CheckoutListItem from './checkout_list_item';

export default function Checkout({ route, navigation }){
  var base = new Base()
  const [user, set_user] = useState({})
  const [arr, set_arr] = useState([])
  const [return_date, set_return_date] = useState(moment().add(14, 'd'))

  useEffect(() => {
    async function get_arr_cart(){
      var arr_cart = await AsyncStorage.getItem('arr_cart')
      arr_cart = arr_cart == null ? [] : JSON.parse(arr_cart)

      set_arr(arr_cart)
    }
    get_user_data()
    get_arr_cart()
  }, [])

  async function get_user_data(){
    var response = await base.request(base.url_api + '/auth/profile')

    if(response.status === 'success'){
      set_user(response.data)
    }
    else
      base.show_error(response.message)
  }

  async function submit(){
    var response = await base.request(base.url_api + '/loan', 'post', {
      arr_detail: arr,
    })

    if(response.status === 'success'){
      await AsyncStorage.removeItem('arr_cart')

      response.data.due_date = moment(response.data.due_date, 'YYYY-MM-DD HH:mm:ss')
      navigation.navigate('CartSuccess', {
        data: response.data
      })
    }
    else
      base.show_error(response.message)

  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: base.color.grey4 }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
          title={base.i18n.t("checkout")}
          text_color={base.color.white}
          navigation={navigation}/>

        <ScrollView style={{ flex: 1, }}>
          <View style={{ flex: 1, }}>
            <View style={{ backgroundColor: base.color.white, padding: base.size.size_5, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{ color: base.color.grey6, fontSize: base.size.size_5 }}>{base.i18n.t("borrower_info")}</Text>
                <Text style={{ color: base.color.primary }}>{base.i18n.t("edit")}</Text>
              </View>

              <View style={{ marginTop: base.size.size_3 }}>
                <Text>{base.i18n.t("borrower_name")} {user.Fullname}</Text>
                <Text>{base.i18n.t("borrower_address")} {user.EmailAddress}</Text>
              </View>
            </View>

            <View style={{ backgroundColor: base.color.white, marginTop: base.size.size_1, padding: base.size.size_5, }}>
              <Text style={{ color: base.color.grey6, fontSize: base.size.size_6 }}>{base.i18n.t("book_list")}</Text>

              <View style={{ marginTop: base.size.size_1 }}>
                {
                  arr.map((data, index) => <CheckoutListItem key={index} data={data}/>)
                }
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: base.size.size_1, }}>
                <Text>{base.i18n.t("total_borrowed_book")}</Text>
                <Text>{arr.length + ' ' + base.i18n.t("num_book")}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: base.size.size_1, }}>
                <Text style={{ color: base.color.grey7, fontSize: base.size.size_2 }}>{base.i18n.t("return_date")}</Text>
                <Text style={{ color: base.color.grey7, fontSize: base.size.size_2 }}>{return_date.format('DD MMMM YYYY')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ padding: base.size.size_5 }}>
          <CustomButton title={base.i18n.t("submit")}
            style={{ marginTop: base.size.size_3 }}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => submit()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
