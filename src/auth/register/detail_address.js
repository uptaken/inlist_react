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
import CheckBox from '@react-native-community/checkbox';

import Base from '../../utils/base';
import PleaseWaitModal from "../../layout/modal/please_wait_modal"
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import CustomInput from '../../layout/custom_input';
import Step from './step';

export default function DetailAddress({ route, navigation }){
  var base = new Base()
  const [home_phone, set_home_phone] = useState("")
  const [phone, set_phone] = useState("")
  const [name_institute, set_name_institute] = useState("")
  const [address_institute, set_address_institute] = useState("")
  const [phone_institute, set_phone_institute] = useState("")
  const [toggle_condition, set_toggle_condition] = useState(false)
  const [is_please_wait, set_is_please_wait] = useState(false)

  async function submit(){
    if(!toggle_condition)
      base.show_error(base.i18n.t("please_check_condition"))
    else if(home_phone === '')
      base.show_error(base.i18n.t("home_phone_empty"))
    else if(phone === '')
      base.show_error(base.i18n.t("phone_empty"))
    else if(name_institute === '')
      base.show_error(base.i18n.t("name_institute_empty"))
    else if(address_institute === '')
      base.show_error(base.i18n.t("address_institute_empty"))
    else if(phone_institute === '')
      base.show_error(base.i18n.t("phone_institute_empty"))
    else{
      var data = await AsyncStorage.getItem('register_data')
      data = JSON.parse(data)

      data.home_phone = home_phone
      data.phone = phone
      data.name_institute = name_institute
      data.address_institute = address_institute
      data.phone_institute = phone_institute

      set_is_please_wait(true)
      var response = await base.request(base.url_api + '/auth/register', 'post', data)

      set_is_please_wait(false)
      setTimeout(async () => {
        if(response.status === 'success'){
          await AsyncStorage.removeItem('register_data')
          navigation.navigate('RegisterSuccess')
        }
        else
          base.show_error(response.message)
      }, 100)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <PleaseWaitModal is_show={is_please_wait}/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, marginTop: base.size.size_5, }}>
          <CustomNavigation
            style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5 }}
            title={base.i18n.t("register")}
            navigation={navigation}
            padding={base.size.size_5}/>

          <ScrollView>
            <View style={{ paddingHorizontal: base.size.size_5 }}>
              <Step style={{ marginTop: base.size.size_5 }} num={route.params != null ? route.params.num_step : '4'} title={base.i18n.t("detail_address")}/>

              <CustomInput
                type="phone"
                name={base.i18n.t("home_phone")}
                on_change_text={value => set_home_phone(value)}
                value={home_phone}/>

              <CustomInput
                type="phone"
                name={base.i18n.t("phone")}
                on_change_text={value => set_phone(value)}
                value={phone}/>

              <CustomInput
                name={base.i18n.t("name_institute")}
                on_change_text={value => set_name_institute(value)}
                value={name_institute}/>

              <CustomInput
                name={base.i18n.t("address_institute")}
                on_change_text={value => set_address_institute(value)}
                value={address_institute}/>

              <CustomInput
                type="phone"
                name={base.i18n.t("phone_institute")}
                on_change_text={value => set_phone_institute(value)}
                value={phone_institute}/>

              <View style={{ marginVertical: base.size.size_5, flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  disabled={false}
                  value={toggle_condition}
                  onValueChange={(newValue) => set_toggle_condition(newValue)}/>

                <Text style={{ fontSize: base.size.size_5 }}>{base.i18n.t("data_correct")}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={{ marginTop: base.size.size_3, marginHorizontal: base.size.size_5, marginBottom: base.size.size_5 }}>
            <CustomButton title={base.i18n.t("next")}
              color={base.color.primary}
              textColor={base.color.white}
              on_press={() => submit()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
